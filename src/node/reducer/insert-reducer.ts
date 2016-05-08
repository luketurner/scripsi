import { handleActions } from 'redux-actions'

import { update } from '../../util/update'
import { SNode, SNodeOptions, SNodeDB } from '../types'
import * as actionTypes from '../../action-types'
import createNode from './create-node'

export default handleActions<any>({
  [actionTypes.NODE_INSERT_BELOW]: 
    (state, action) => addNodeBelow(state, action.payload.node, action.payload.existingId),
  [actionTypes.NODE_INSERT_CHILD]: 
    (state, action) => addChildNode(state, action.payload.node, action.payload.parentId, action.payload.index),
  [actionTypes.NODE_INSERT_ORPHAN]: 
    (state, action) => addOrphanNode(state, action.payload),
  [actionTypes.NODE_INSERT_SIBLING]: 
    (state, action) => addSiblingNode(state, action.payload.node, action.payload.siblingId),
})

/**
 * (description)
 * 
 * @export
 * @param {SNodeDB} state (description)
 * @param {(SNode | SNodeOptions)} nopts (description)
 * @returns (description)
 */
function addOrphanNode(state: SNodeDB, nopts: SNode | SNodeOptions) {
  let node = createNode(nopts)
  return update<SNodeDB,SNodeDB>(state, { [node.id]: { $set: node } })
}

/**
 * (description)
 * 
 * @export
 * @param {SNodeDB} state (description)
 * @param {(SNode | SNodeOptions)} nopts (description)
 * @param {string} parentId (description)
 * @param {number} [index] (description)
 * @returns (description)
 */
function addChildNode(state: SNodeDB, nopts: SNode | SNodeOptions, parentId: string, index?: number) {
    // 1. Create new child
    nopts.parent = parentId
    let node = createNode(nopts)
    let newState = addOrphanNode(state, node)
    // 2. Add to parent
    const updateOp = index !== undefined ? { $splice: [ [ index, 0, node.id ] ] } : { $push: [node.id] }
    return update<SNodeDB,SNodeDB>(newState, { [parentId]: { children: updateOp } })
}

/**
 * (description)
 * 
 * @export
 * @param {SNodeDB} state (description)
 * @param {(SNode | SNodeOptions)} nopts (description)
 * @param {string} siblingId (description)
 * @returns (description)
 */
function addSiblingNode(state: SNodeDB, nopts: SNode | SNodeOptions, siblingId: string) {
  let sibling = state[siblingId]
  if (!sibling) {
    throw new Error('addSiblingNode called with invalid siblingId ' + siblingId)
  }
  
  let parent = state[sibling.parent]
  if (!parent) {
    throw new Error('addSiblingNode argument siblingId has no parent')
  }
 
  let oldSiblingIndex = parent.children.indexOf(siblingId)
  return addChildNode(state, nopts, parent.id, oldSiblingIndex + 1)
}

function addNodeBelow(state: SNodeDB, nopts: SNode | SNodeOptions, existingId: string) {
  let existingNode = state[existingId]
  if (!existingNode) {
    throw new Error('addNodeBelow called with invalid existingId ' + existingId)
  }
  
  // Create node as a sibling if it would be visually below the existing node.
  if (existingNode.parent && (existingNode.children.length === 0 || existingNode.collapsed)) {
    return addSiblingNode(state, nopts, existingId)
  } else {
    // Otherwise we need to create the node as a child.
    return addChildNode(state, nopts, existingNode.id)
  }
}