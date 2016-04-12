import {set, update} from 'lodash/fp'
import {filter, clone} from 'lodash'
import {v4 as uuidv4} from 'node-uuid'
import {
  NodeActionType,
  NodeStateTree,
  SNode,
  SNodeOptions,
  NodeType,
  NodeDisplayStatus
} from './types'



const handlers = {
  [NodeActionType[NodeActionType.AddChild]] (state: NodeStateTree, action: Action<NodeActionType>): NodeStateTree {
    // 1. Create new child
    let node = constructNode(action['node'])
    let newState = <NodeStateTree>set(state, node.id, node)
    // 2. Add to parent
    newState = <NodeStateTree>update(newState, [node.parent, 'children'], (c) => c.push(node))
    return newState
  },
  [NodeActionType[NodeActionType.AddOrphan]] (state: NodeStateTree, action: Action<NodeActionType>): NodeStateTree {
    let node = constructNode(action['node'])
    return <NodeStateTree>set(state, node.id, node)
  },
  [NodeActionType[NodeActionType.AddSibling]] (state: NodeStateTree, action: Action<NodeActionType>): NodeStateTree {
    // 1. Create new sibling 
    let newSibling = constructNode(action['newSibling'])
    let newState = <NodeStateTree>set(state, newSibling.id, newSibling)
    // 2. Add to parent.children after oldSibling
    let oldSibling = state[action['oldSibling']]
    newSibling.parent = oldSibling.parent
    newState = <NodeStateTree>update(newState, [oldSibling.parent, 'children'], (children) => {
      let siblingIndex = children.indexOf(oldSibling.id)
      return clone(children).splice(siblingIndex + 1, 0, newSibling.id)
    })
    return newState
  },
  [NodeActionType[NodeActionType.Delete]] (state: NodeStateTree, action: Action<NodeActionType>): NodeStateTree {
    let nodeId = action['node'].id
    let node = state[nodeId]
    if (!node) { return }
    let newState = <NodeStateTree>set(state, nodeId, undefined) 
    if (node.parent) {
      newState = <NodeStateTree>update(newState, [node.parent, 'children'], (children) => {
        return _.filter(children, (child) => child != nodeId)
      })
    }
    return newState
  },
  [NodeActionType[NodeActionType.Update]] (state: NodeStateTree, action: Action<NodeActionType>): NodeStateTree {
    let node = action['node']
    return <NodeStateTree>set(state, node.id, node)
  }
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
    children: options.children || []
  }
}


/**
 * Reducer for the Node module.
 * 
 * @param {NodeStateTree} [state={}] Current state tree
 * @param {Action<NodeActionType>} action The action to handle
 * @returns {NodeStateTree} New state tree
 */
export default (state: NodeStateTree = {}, action: Action<NodeActionType>): NodeStateTree => {
  return handlers[action.ActionType](state, action);
}