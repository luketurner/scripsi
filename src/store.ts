import layoutReducer from './layout/reducer'
import nodeReducer from './node/reducer'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {get, set} from 'lodash'

export interface ActionType extends Array<string | number> {
  0: string
  1: number
}

/**
 * Defines a more explicit interface for Redux actions. 
 * 
 * @interface Action
 * @template T
 */
export interface Action {
  type: ActionType
  [key: string]: any
}

/**
 * Abstract state tree type.
 * 
 * @interface StateTree
 */
export interface StateTree {
  [key: string]: any // TODO make this type more explicit
}

export enum RootActionType {
  LayoutAction,
  NodeAction
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export const store = createStore(combineReducers({
  nodes: nodeReducer,
  layout: layoutReducer
}), {}, applyMiddleware(logger))
