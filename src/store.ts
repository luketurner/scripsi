import uiReducer from './ui/reducer'
import nodeReducer from './node/reducer'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {get, set} from 'lodash'

/**
 * Abstract state tree type.
 * 
 * @interface StateTree
 */
export interface StateTree {
  [key: string]: any // TODO make this type more explicit
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export const store = createStore(combineReducers({
  nodes: nodeReducer,
  ui: uiReducer
}), {}, applyMiddleware(logger))
