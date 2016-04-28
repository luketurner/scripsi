import uiReducer from '../ui/reducer'
import nodeReducer from '../node/reducer'
import persistenceReducer from '../persistence/reducer'
import storeReducer from './reducer'
import {persistenceMiddleware} from '../persistence'

import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {get, set} from 'lodash'

import thunkMiddleware from 'redux-thunk'

/**
 * Abstract state tree type.
 * 
 * @interface StateTree
 */
export interface StateTree {
  [key: string]: any // TODO make this type more explicit
}

export enum StoreAction {
  SetState
}

const logger = store => next => action => {
  console.log('[ACTION]', action.type)
  let result = next(action)
  return result
}

let reducer = (state, action) => {
  return combineReducers({
    nodes: nodeReducer,
    ui: uiReducer,
    persistence: persistenceReducer
  })(storeReducer(state, action), action)
}

export const store = createStore(reducer, {}, applyMiddleware(thunkMiddleware, persistenceMiddleware, logger))
