import {connect} from 'react-redux'
import {SNode} from '../types'

export interface SearchState {
  query: string
  results: SNode[]
}

export enum SearchAction {
  UpdateQuery = 1
}

const mapStateToProps = (state) => {
  return {
    searchQuery: state.nodes.search.query,
    searchResults: state.nodes.search.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQueryChange: (newQuery) => {
      dispatch({
        type: 'Search.UpdateQuery',
        query: newQuery
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)