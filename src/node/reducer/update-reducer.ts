import { handleActions } from 'redux-actions'
import * as _ from 'lodash'

import { update } from '../../util/update'
import { SNode, SNodeOptions, SNodeDB } from '../types'
import * as actionTypes from '../../action-types'

export default handleActions<any>({
  [actionTypes.NODE_DELETE]: 
    (state, action) => deleteNode(state, action.payload),
  [actionTypes.NODE_DEMOTE]: 
    (state, action) => demoteNode(state, action.payload),
  [actionTypes.NODE_PROMOTE]:
    (state, action) => promoteNode(state, action.payload),
  [actionTypes.NODE_UPDATE]: 
    (state, action) => updateNode(state, action.payload),
})

/**
 * Deletes a node from the database.
 * 
 * @export
 * @param {SNodeDB} state
 * @param {string} nodeId
 * @returns {SNodeDB} new state
 */
function deleteNode(state: SNodeDB, nodeId: string): SNodeDB {
  let nodeToDelete = state[nodeId]
  
  if (!nodeToDelete) {
    throw new Error('Attempt to delete nonexistent node ' + nodeId)
  }
  
  let query = {
    [nodeId]: { $set: undefined }
  }
  
  if (nodeToDelete.parent) {
    // Eliminiate us from our parent's children
    query[nodeToDelete.parent] = {
      children: { 
        $apply: (children: Array<string>) => {
          return _.filter(children, (child) => child !== nodeId)
        }
      }
    }
  }
  
  return update<SNodeDB,SNodeDB>(state, query)
}

/**
 * Demotes a node ("indents" the node in the node hierarchy). This
 * involves making the node a child of the sibling node that precedes it. If the
 * node has no parent or no preceding sibling, it is not demoted.
 * 
 * @param {SNodeDB} state (description)
 * @param {string} nodeId (description)
 * @returns {SNodeDB} (description)
 */
function demoteNode(state: SNodeDB, nodeId: string): SNodeDB {
  let node: SNode = state[nodeId]
  if (!node) { 
    throw new Error('demote called with invalid nodeId ' + nodeId)
  }
  
  let parent: SNode = state[node.parent]
  if (!parent) { return state } // we can't demote an orphaned node
  
  let nodeIndex = _.indexOf(parent.children, nodeId)
  if (nodeIndex === 0) { return state } // we are already as demoted as possible
  
  let newParentId = parent.children[nodeIndex - 1]
  return setParent(state, nodeId, newParentId)
}

/**
 * Promotes a node ("un-indents" the node in the node hierarchy). This
 * involves making the node a sibling of its former parent. If the node has
 * no parent or no grandparent, it is not promoted.
 * 
 * @param {SNodeDB} state (description)
 * @param {string} nodeId (description)
 * @returns {SNodeDB} (description)
 */
function promoteNode(state: SNodeDB, nodeId: string): SNodeDB {
  let node: SNode = state[nodeId]
  if (!node) {
    throw new Error('promote called with invalid nodeId')
  }
  
  let parent: SNode = state[node.parent]
  if (!parent) { return state } // we can't promote an orphaned node
  
  let grandparent: SNode = state[parent.parent]
  if (!grandparent) { return state } // we are already as promoted as possible
  
  let newParentId = grandparent.id
  return setParent(state, nodeId, newParentId)
}

/**
 * Updates given node to have a new parent. 
 * 
 * @export
 * @param {SNodeDB} state (description)
 * @param {string} nodeId (description)
 * @param {string} newParentId (description)
 * @returns (description)
 */
function setParent(state: SNodeDB, nodeId: string, newParentId: string) {
  let node = state[nodeId]
  let newParent = state[newParentId]
  
  if (!node || !newParent) {
    throw new Error('swapParents could not find nodeId and/or newParentId')
  }
  
  if (node.parent === newParentId) {
    return state
  }
    
  let updateQuery = {
    [node.id]: { parent: { $set: newParentId } }, // update 'parent' ref on child node
    [newParentId]: { children: { $push: [node.id] } } // add child to new parent
  }
  
  if (node.parent && state[node.parent]) { // remove child from old parent
    updateQuery[node.parent] = { children: { $apply: (children) => _.without(children, node.id) } }
  }
  
  return update<SNodeDB,SNodeDB>(state, updateQuery)
}

/**
 * (description)
 * 
 * @param state (description)
 * @param {(SNodeOptions & { id: string })} updateOpts (description)
 * @returns (description)
 */
function updateNode(state, updateOpts: SNodeOptions & { id: string }) {
  let node = state[updateOpts.id]
  if (!node) {
    throw new Error('updateNode called with invalid id ' + updateOpts.id)
  }
    
  let newState = update<SNodeDB,SNodeDB>(state, { 
    [node.id]: { $merge: updateOpts }
  })
  
  if (updateOpts.parent) {
    newState = setParent(state, node.id, updateOpts.parent)
  }
  
  if (updateOpts.children) {
    throw new Error('Unimplemented: Cannot directly set children on a node.')
  }
  
  return newState
}