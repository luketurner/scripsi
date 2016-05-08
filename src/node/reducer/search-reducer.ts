import { handleActions } from 'redux-actions'
import * as _ from 'lodash'

import { update } from '../../util/update'
import { SNode, NodeState, SNodeSearch } from '../types'
import * as actionTypes from '../../action-types'

export default handleActions<any>({
  [actionTypes.NODE_SEARCH]:
    (state, action) => searchNodes(state, action.payload)
})

function searchNodes(state: NodeState, query: string): SNodeSearch {
  let results = getSearchResults(state.db, query)
  return update<SNodeSearch, SNodeSearch>(state.search, {
    query: { $set: query },
    results: { $set: results }
  })
}

function getSearchResults (nodes: Dict<SNode>, query: string): SNode[] {
  return _.filter(_.values<SNode>(nodes), (node) => node.content.includes(query))
}