import {v4 as uuidv4} from 'node-uuid'
import {filter} from 'lodash'

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
  [DBAction.DeleteNode, <DBReducer>((state, action) => {
    let nodeId = action['node'].id
    let node = state[nodeId]
    if (!node) { return }
    let newState = update<DBState,DBState>(state, { [nodeId]: { $set: undefined } }) 
    if (node.parent) {
      newState = update<DBState,DBState>(newState, {
        [node.parent]: { 
          children: { 
            $apply: (children: Array<string>) => {
              return filter(children, (child) => child !== nodeId)
            }
          }
        }
      })
    }
    return newState
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