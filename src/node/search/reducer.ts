import {SNode} from '../types'
import {SearchState, SearchAction} from './index'
import {NodeState} from '../index'
import {update} from '../../util/update'


interface SearchReducer { (state: NodeState, action: Action): SearchState }

const reducers = new Map<SearchAction, SearchReducer>([
  [SearchAction.UpdateQuery, <SearchReducer>((state, action) => {
    
    let query = action['query']
    let results = []
    
    return update(state.search, {
      query: { $set: query },
      results: { $set: results }
    })
  })]
])

export const defaultSearchState: SearchState = {
  query: '',
  results: []
}

export default <SearchReducer>(state, action) => {
  let [actionType, actionSubtype]: string[] = action.type.split('.')
  if (actionType !== 'Search') { return state.search; }
  
  let actionEnumValue: SearchAction = SearchAction[actionSubtype]
  if (!actionEnumValue) { return state.search; }
  
  return reducers.get(actionEnumValue)(state, action);
}