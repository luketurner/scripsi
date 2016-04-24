import searchReducer, {defaultSearchState} from './search/reducer'
import dbReducer, {defaultDbState} from './db/reducer'
import {NodeState} from './index'

const defaultState: NodeState = {
  db: defaultDbState,
  search: defaultSearchState
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
    db: dbReducer(state.db, action),
    search: searchReducer(state, action) // Let search reducer access all state props
  }
}