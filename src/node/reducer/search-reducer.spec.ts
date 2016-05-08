import reducer from './search-reducer'
import * as at from '../../action-types'
import * as _ from 'lodash'

describe('Reducer: node/search', () => {
  let node, testState
  
  beforeEach(() => {
    node = {
      id: 'othernode',
      content: 'node1',
      collapsed: false,
      children: []
    }

    testState = {
      db: {
        othernode: node
      },
      search: {
        query: '',
        results: []
      }
    }
  })
  
  describe(at.NODE_SEARCH, () => {
    
    it('should update the search object', () => {
      let newState = reducer(testState, {
        type: at.NODE_SEARCH,
        payload: 'aquery'
      })
      expect(newState).to.eql({
        query: 'aquery',
        results: []
      })
    })
    
    it('should include matching nodes in results', () => {
      let newState = reducer(testState, {
        type: at.NODE_SEARCH,
        payload: 'node'
      })
      expect(newState).to.eql({
        query: 'node',
        results: [node]
      })
    })
    
  })
})