import {update, set, insert, append} from '../util/fp'
import {filter, clone} from 'lodash'
import {v4 as uuidv4} from 'node-uuid'

import {Action} from '../store'
import {
  NodeActionType,
  NodeStateTree,
  SNode,
  SNodeOptions,
  NodeType,
  NodeDisplayStatus
} from './types'

type NodeReducer = { (state: NodeStateTree, action: Action): NodeStateTree }
type NodeReducerSet = Map<NodeActionType, NodeReducer>

type SChildNodeOptions = SNodeOptions & { parent: string }

/**
 * Inserts a node into the node state tree as an orphan.
 * 
 * @param {NodeStateTree} state Old state
 * @param {SNode} node Node to insert
 * @returns {NodeStateTree} New state
 */
const addOrphanNode = (state: NodeStateTree, node: SNode) => {
  return set(state, node.id, node)
}

/**
 * Inserts node into the node state tree and adds it to the children array
 * of the specified parent node (in the node.parent property)
 * 
 * @param {NodeStateTree} state Old state
 * @param {SNode} node Node to insert
 * @returns {NodeStateTree} New state
 */
const addChildNode = (state: NodeStateTree, node: SNode) => {
    // 1. Create new child
    let newState = addOrphanNode(state, node)
    // 2. Add to parent
    newState = update(newState, [node.parent, 'children'], (c: any) => c.push(node))
    return newState
}

/**
 * Creates a new node and adds it as a sibling at the given index. The node's parent
 * is ascertained using the 'parent' property on the node options.
 * 
 * @param {NodeStateTree} state Old state
 * @param {SChildNodeOptions} opts Options for new node
 * @param {number} [index] Index at which to insert node. Pass null to push the child to the end.
 * @returns {NodeStateTree} New state
 */
const addSiblingNode = (state: NodeStateTree, opts: SChildNodeOptions, index?: number) => {
    // 1. Create new sibling 
    let newSibling = constructNode(opts)
    let newState = addOrphanNode(state, newSibling)
    let parentId = newSibling.parent
    // 2. Add to parent's children array
    return update(newState, [parentId, 'children'], (children: string[]) => {
      return index ? insert(children, index, newSibling.id) : append(children, newSibling.id)
    })
}

const reducers: NodeReducerSet = new Map([
  [NodeActionType.AddChild, (state, action) => {
    let opts: SChildNodeOptions = action['node']
    return addChildNode(state, constructNode(opts))
  }],
  [NodeActionType.AddOrphan, (state, action) => {
    let opts: SNodeOptions = action['node']
    return addOrphanNode(state, constructNode(opts))
  }],
  [NodeActionType.AddSibling, (state, action) => {
    let opts: SChildNodeOptions = action['node']
    return addSiblingNode(state, constructNode(opts))
  }],
  [NodeActionType.DeleteNode, <NodeReducer>((state, action) => {
    let nodeId = action['node'].id
    let node = state[nodeId]
    if (!node) { return }
    let newState = set(state, nodeId, undefined) 
    if (node.parent) {
      newState = update(newState, [node.parent, 'children'], (children: Array<string>) => {
        return filter(children, (child) => child !== nodeId)
      })
    }
    return newState
  })],
  [NodeActionType.UpdateNode, <NodeReducer>((state, action) => {
    let node = action['node']
    return set(state, node.id, node)
  })]
])

/**
 * Reducer for the Node module. Skips any non-NodeActionType actions,
 * and passes everything else to sub-reducers based on the action type.
 * 
 * @param {NodeStateTree} [state={}] Current state tree
 * @param {Action<NodeActionType>} action The action to handle
 * @returns {NodeStateTree} New state tree
 */
export default (state: NodeStateTree = {}, action: Action): NodeStateTree => {
  if (!state) { return {} }
  
  let [actionEnumType, actionEnumValue] = action.type
  if (actionEnumType !== 'NodeActionType') { return state }
  if (!<NodeActionType>actionEnumValue) { return state }
  
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