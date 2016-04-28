import {filter, values} from 'lodash'

import {SNode} from '../types'
import {SearchState, SearchAction} from './index'
import {NodeState} from '../index'
import {update} from '../../util/update'


interface SearchReducer { (state: NodeState, action: Action): SearchState }

const reducers = new Map<SearchAction, SearchReducer>([
  [SearchAction.UpdateQuery, <SearchReducer>((state, action) => {
    
    let query = action['query']
    let results = getSearchResults(state.db, query)
    
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
  if (actionType !== 'Search') { return state.search }
  
  let actionEnumValue: SearchAction = SearchAction[actionSubtype]
  if (!actionEnumValue) { return state.search }
  
  return reducers.get(actionEnumValue)(state, action)
}

const getSearchResults = (nodes: Dict<SNode>, query: string): SNode[] => {
  return filter(values<SNode>(nodes), (node) => node.content.includes(query))
}