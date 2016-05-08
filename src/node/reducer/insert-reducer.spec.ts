import reducer from './insert-reducer'
import * as at from '../../action-types'
import createNode from './create-node'
import * as _ from 'lodash'

describe('Reducer: node/insert', () => {
  let otherNode, testState, testOpts, testNode
  
  beforeEach(() => {
    otherNode = {
      id: 'othernode',
      content: 'node1',
      collapsed: false,
      children: []
    }

    testState = {
      othernode: otherNode
    }

    testOpts = {
      content: 'node1'
    }

    testNode = createNode(testOpts)
  })
    
  describe(at.NODE_INSERT_BELOW, () => {
    
    beforeEach(() => {
      testState['node1'] = {
        id: 'node1',
        children: [otherNode.id]
      }
      otherNode.parent = 'node1'
      otherNode.children = ['123']
    })
    
    it('should insert node as a sibling if existing node has no children', () => {
      otherNode.children = [];
      const newState = reducer(testState, {
        type: at.NODE_INSERT_BELOW,
        payload: {
          node: testNode,
          existingId: otherNode.id
        }
      })
      expect(newState['node1'].children).to.eql([otherNode.id, testNode.id])
      expect(newState[testNode.id].parent).to.eql('node1')
    })
    
    it('should insert node as a sibling if existing node is collapsed', () => {
      otherNode.collapsed = true
      const newState = reducer(testState, {
        type: at.NODE_INSERT_BELOW,
        payload: {
          node: testNode,
          existingId: otherNode.id
        }
      })
      expect(newState['node1'].children).to.eql([otherNode.id, testNode.id])
      expect(newState[testNode.id].parent).to.eql('node1')
    })
    
    it('should insert node as a child if existing node has children', () => {
      const newState = reducer(testState, {
        type: at.NODE_INSERT_BELOW,
        payload: {
          node: testNode,
          existingId: otherNode.id
        }
      })
      expect(newState[otherNode.id].children).to.eql(['123', testNode.id])
      expect(newState[testNode.id].parent).to.eql(otherNode.id)
    })
    
  })
  
  describe(at.NODE_INSERT_CHILD, () => {
    
    it('should add node and update parent', () => {
      const newState = reducer(testState, {
        type: at.NODE_INSERT_CHILD,
        payload: {
          node: testNode,
          parentId: otherNode.id
        }
      })
      expect(newState[otherNode.id].children).to.include(testNode.id)
      expect(newState[testNode.id].parent).to.eql(otherNode.id)
    })
    
    it('should insert node at given index', () => {
      otherNode.children = ['1', '2']
      const newState = reducer(testState, {
        type: at.NODE_INSERT_CHILD,
        payload: {
          node: testNode,
          parentId: otherNode.id,
          index: 1
        }
      })
      expect(newState[otherNode.id].children).to.eql(['1', testNode.id, '2'])
      expect(newState[testNode.id].parent).to.eql(otherNode.id)
    })
    
  })
  
  describe(at.NODE_INSERT_ORPHAN, () => {
    
    it('should add node to db', () => {
      const newState = reducer(testState, {
        type: at.NODE_INSERT_ORPHAN,
        payload: testNode
      })
      expect(newState).to.eql({
        othernode: otherNode,
        [testNode.id]: testNode
      })
    })
    
    it('should handle incomplete node options', () => {
      const newState = reducer(testState, {
        type: at.NODE_INSERT_ORPHAN,
        payload: testOpts
      })
      expect(newState[Object.keys(newState)[0]]).to.contain.keys(testOpts)
    })
    
  })
  
  describe(at.NODE_INSERT_SIBLING, () => {
    
    it('should add node to sibling\'s parent', () => {
      testState['node1'] = {
        id: 'node1',
        children: [otherNode.id, '3']
      }
      testState[otherNode.id].parent = 'node1'
      const newState = reducer(testState, {
        type: at.NODE_INSERT_SIBLING,
        payload: {
          node: testNode,
          siblingId: otherNode.id
        }
      })
      expect(newState['node1'].children).to.eql([otherNode.id, testNode.id, '3'])
      expect(newState[testNode.id].parent).to.eql('node1')
    })
    
  })
})