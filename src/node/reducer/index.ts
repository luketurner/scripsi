import * as _ from 'lodash'
import { compose } from 'redux'

import { NodeState } from '../types'

import insertReducer from './insert-reducer'
import searchReducer from './search-reducer'
import updateReducer from './update-reducer'

const defaultState: NodeState = {
  db: {},
  search: {
    query: '',
    results: []
  }
}

/**
 * Reducer for the Node module. Mostly just passes through to sub-reducers. We use
 * a custom function instead of combineReducers() in order to support some sideways
 * state access.
 * 
 * @param {NodeState} Current state tree
 * @param {Action} action The action to handle
 * @returns {NodeState} New state tree
 */
export default (state: NodeState = defaultState, action: Action): NodeState => {
  return {
    db: compose(insertReducer, updateReducer)(state.db, action),
    search: searchReducer(state, action) // Let search reducer access all state props
  }
}