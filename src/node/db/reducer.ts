import {v4 as uuidv4} from 'node-uuid'
import * as _ from 'lodash'

import {update} from '../../util/update'

import {DBState, DBAction} from './index'
import {SNode, SNodeOptions, NodeType, NodeDisplayStatus} from '../types'

export const defaultDbState = <DBState>{}

type DBReducer = { (state: DBState, action: Action): DBState }
type DBReducerSet = Map<DBAction, DBReducer>

type SChildNodeOptions = SNodeOptions & { parent: string }

/**
 * Inserts a node into the node state tree as an orphan.
 * 
 * @param {DBState} state Old state
 * @param {SNode} node Node to insert
 * @returns {DBState} New state
 */
const addOrphanNode = (state: DBState, node: SNode) => {
  return update<DBState,DBState>(state, { [node.id]: { $set: node } })
}

/**
 * Inserts node into the node state tree and adds it to the children array
 * of the specified parent node (in the node.parent property)
 * 
 * @param {DBState} state Old state
 * @param {SNode} node Node to insert
 * @returns {DBState} New state
 */
const addChildNode = (state: DBState, node: SNode) => {
    // 1. Create new child
    let newState = addOrphanNode(state, node)
    // 2. Add to parent
    newState = update<DBState,DBState>(newState, { [node.parent]: { children: { $push: [node.id] } } })
    return newState
}

/**
 * Creates a new node and adds it as a sibling at the given index. The node's parent
 * is ascertained using the 'parent' property on the node options.
 * 
 * @param {DBState} state Old state
 * @param {SChildNodeOptions} opts Options for new node
 * @param {number} [index] Index at which to insert node. Pass null to push the child to the end.
 * @returns {DBState} New state
 */
const addSiblingNode = (state: DBState, node: SNode, index?: number) => {
    // 1. Create new sibling 
    let newState = addOrphanNode(state, node)
    let parentId = node.parent
    // 2. Add to parent's children array
    let updateCmd = index ? { $splice: [ [ index, 0, node.id ] ] } : { $push: [node.id] }
    return update<DBState,DBState>(newState, { [parentId]: { children: updateCmd } })
}

const deleteNode = (state: DBState, node: SNode) => {
    let newState = update<DBState,DBState>(state, { [node.id]: { $set: undefined } }) 
    if (node.parent) {
      newState = update<DBState,DBState>(newState, {
        [node.parent]: { 
          children: { 
            $apply: (children: Array<string>) => {
              return _.filter(children, (child) => child !== node.id)
            }
          }
        }
      })
    }
    return newState
}

const swapParents = (state: DBState, node: SNode, newParentId: string) => {
  let oldParent = state[node.parent]
  let newParent = state[newParentId]
  if (!newParent || _.get(oldParent, 'id') === newParent.id) { return state }
  
  let updateQuery = {
    [node.id]: { parent: { $set: newParentId } }, // update 'parent' ref on child node
    [newParentId]: { children: { $push: [node.id] } } // add child to new parent
  }
  
  if (oldParent) { // remove child from old parent
    updateQuery[oldParent.id] = { children: { $apply: (children) => _.without(children, node.id) } }
  }
  
  return update<DBState,DBState>(state, updateQuery)
}

// const addNodeTree = (state: DBState, nodeTree: SNodeTree) => {
//   let node = <SNode>update<SNode | SNodeTree, Array<SNodeTree | string>>(nodeTree, 'children', (children: Array<SNodeTree>): Array<string> => {
//     return map(children, (child) => {
//       let childNode = addNodeTree(state, child)
//     })
//   })
// }

const reducers: DBReducerSet = new Map([
  [DBAction.AddChild, (state, action) => {
    let opts: SChildNodeOptions = action['node']
    return addChildNode(state, constructNode(opts))
  }],
  [DBAction.AddOrphan, (state, action) => {
    let opts: SNodeOptions = action['node']
    return addOrphanNode(state, constructNode(opts))
  }],
  [DBAction.AddSibling, (state, action) => {
    let opts: SChildNodeOptions = action['node']
    let oldSibling = state[action['oldSiblingId']]
    let parentNode = state[oldSibling.parent]
    opts.parent = parentNode.id
    return addSiblingNode(state, constructNode(opts))
  }],
  [DBAction.AddChild, (state, action) => {
    let opts: SChildNodeOptions = action['node']
    return addChildNode(state, constructNode(opts))
  }],
  [DBAction.AddBelow, <DBReducer>((state, action) => {
    let newNode: SNode = constructNode(action['node'])
    let existingNode: SNode = state[action['existingNodeId']]
    
    // Create a sibling node if it would be visually below the existing node.
    if (existingNode.parent && (existingNode.children.length === 0 || existingNode.collapsed)) {
      newNode.parent = existingNode.parent
      return addSiblingNode(state, newNode)
    }
    
    // Otherwise we need to create a child node.
    newNode.parent = existingNode.id
    return addChildNode(state, newNode)
  })],
  [DBAction.Demote, <DBReducer>((state, action) => {
    let node: SNode = state[action['nodeId']]
    if (!node) { return state } // invalid node id
    
    let parent: SNode = state[node.parent]
    if (!parent) { return state } // we can't demote an orphaned node
    
    let childIndex = _.indexOf(parent.children, node.id)
    if (childIndex === 0) { return state } // we are already as demoted as possible
    
    let newParentId = parent.children[childIndex - 1]
    return swapParents(state, node, newParentId)
  })],
  [DBAction.Promote, <DBReducer>((state, action) => {
    let node: SNode = state[action['nodeId']]
    if (!node) { return state } // invalid node id
    
    let parent: SNode = state[node.parent]
    if (!parent) { return state }
    
    let grandparent: SNode = state[parent.parent]
    if (!grandparent) { return state }
    
    let newParentId = grandparent.id
    return swapParents(state, node, newParentId)
  })],
  [DBAction.ChangeParent, <DBReducer>((state, action) => {
    let node: SNode = state[action['nodeId']]
    if (!node) { return state } // invalid node id
    
    let newParent: SNode = state[action['parentId']]
    if (!newParent) { return state } // invalid parent id
    
    return swapParents(state, node, newParent.id)
  })],
  [DBAction.DeleteNode, <DBReducer>((state, action) => {
    let nodeId = action['node'].id
    let node = state[nodeId]
    if (!node) { return }
    return deleteNode(state, node)
  })],
  [DBAction.UpdateNode, <DBReducer>((state, action) => {
    let node: SNode = action['node']
    return update<DBState,DBState>(state, { [node.id]: { $set: node } })
  })]
])

export default (state: DBState, action): DBState => {
    
  let [actionType, actionSubtype]: string[] = action.type.split('.')
  if (actionType !== 'Node') { return state }

  let actionEnumValue: DBAction = DBAction[actionSubtype]
  if (!actionEnumValue) { return state }
  
  return reducers.get(actionEnumValue)(state, action)
}

/**
 * Constructs a valid node out of a potentially incomplete list of options.
 * 
 * @param {SNodeOptions} options Options define properties on the resulting node
 * @returns {SNode} An SNode ready for insertion into the state tree
 */
function constructNode (options: SNodeOptions): SNode {
  let id = uuidv4()

  return {
    id: id,
    type: options.type || NodeType.Text,
    content: options.content || '',
    props: options.props || {},
    parent: options.parent || '',
    displayStatus: options.displayStatus || NodeDisplayStatus.Expanded,
    children: options.children || [],
    collapsed: options.collapsed || false
  }
}