import { createAction } from 'redux-actions'

import * as actionTypes from '../action-types'

export const loadStart = createAction(actionTypes.PERSIST_LOAD_START)
export const loadComplete = createAction(actionTypes.PERSIST_LOAD_COMPLETE)
export const loadFail = createAction(actionTypes.PERSIST_LOAD_FAIL)
export const saveStart = createAction(actionTypes.PERSIST_SAVE_START)
export const saveComplete = createAction(actionTypes.PERSIST_SAVE_COMPLETE)
export const saveFail = createAction(actionTypes.PERSIST_SAVE_FAIL)
export const setPersistenceEngine = createAction(actionTypes.PERSIST_SET_ENGINE)
export const setDatabaseName = createAction(actionTypes.PERSIST_SET_DB_NAME) 