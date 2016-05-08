import { createAction } from 'redux-actions'

import * as actionTypes from '../action-types'

export const deleteNode = createAction(actionTypes.NODE_DELETE)

export const demoteNode = createAction(actionTypes.NODE_DEMOTE)

export const createOrphanNode = createAction(actionTypes.NODE_INSERT_ORPHAN)

export const insertChildNode = createAction(actionTypes.NODE_INSERT_CHILD,
  (node, parentId, index) => ({ node, parentId, index }))
  
export const insertSiblingNode = createAction(actionTypes.NODE_INSERT_SIBLING,
  (node, siblingId) => ({ node, siblingId }))
  
export const insertNodeBelow = createAction(actionTypes.NODE_INSERT_BELOW,
  (node, existingId) => ({ node, existingId }))
  
export const promoteNode = createAction(actionTypes.NODE_PROMOTE)

export const updateNode = createAction(actionTypes.NODE_UPDATE)