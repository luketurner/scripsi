import reducer from './update-reducer'
import * as at from '../../action-types'
import createNode from './create-node'
import * as _ from 'lodash'

describe('Reducer: node/update', () => {
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
  
  describe(at.NODE_DELETE, () => {
    
    it('should delete given node id', () => {
      testState['node1'] = {
        id: 'node1'
      }
      const newState = reducer(testState, {
        type: at.NODE_DELETE,
        payload: 'node1'
      })
      expect(newState).to.include.keys({node1: undefined})
    })
    
    it('should remove the node from its parent\'s children', () => {
      testState['node1'] = {
        id: 'node1',
        parent: otherNode.id
      }
      testState[otherNode.id].children = ['node1', 'node2']
      const newState = reducer(testState, {
        type: at.NODE_DELETE,
        payload: 'node1'
      })
      expect(newState).to.include.keys({node1: undefined})
      expect(newState[otherNode.id].children).to.eql(['node2'])
    })
    
  })
  
  describe(at.NODE_DEMOTE, () => {
    
    beforeEach(() => {
      otherNode.children = ['node1', 'node2']
      testState['node1'] = {
        id: 'node1',
        parent: otherNode.id,
        children: []
      }
      testState['node2'] = {
        id: 'node2',
        parent: otherNode.id,
        children: [],
      }
    })
    
    it('should make the node a child of it\'s preceding sibling', () => {
      let newState = reducer(testState, {
        type: at.NODE_DEMOTE,
        payload: 'node2'
      })
      expect(newState['node1'].children).to.eql(['node2'])
      expect(newState['node2'].parent).to.eql('node1')
      expect(newState[otherNode.id].children).to.eql(['node1'])
    })
    
    it('should do nothing if node has no preceding sibling', () => {
      let newState = reducer(testState, {
        type: at.NODE_DEMOTE,
        payload: 'node1'
      })
      expect(newState).to.eql(testState)
    })
    
    it('should do nothing if node has no parent', () => {
      let newState = reducer(testState, {
        type: at.NODE_DEMOTE,
        payload: otherNode.id
      })
      expect(newState).to.eql(testState)
    })
    
    it('is undone by NODE_PROMOTE', () => {
      let newState = reducer(
        reducer(testState, {
          type: at.NODE_DEMOTE,
          payload: 'node2'
        }), {
          type: at.NODE_PROMOTE,
          payload: 'node2'
        })
      expect(newState).to.eql(testState)
    })
    
  })
  
  describe(at.NODE_PROMOTE, () => {
    
    beforeEach(() => {
      otherNode.children = ['node1']
      testState['node1'] = {
        id: 'node1',
        parent: otherNode.id,
        children: ['node2']
      }
      testState['node2'] = {
        id: 'node2',
        parent: 'node1',
        children: [],
      }
    })
    
    it('should make the node a sibling of it\'s parent', () => {
      let newState = reducer(testState, {
        type: at.NODE_PROMOTE,
        payload: 'node2'
      })
      expect(newState['node1'].children).to.eql([])
      expect(newState['node2'].parent).to.eql(otherNode.id)
      expect(newState[otherNode.id].children).to.eql(['node1', 'node2'])
    })
    
    it('should do nothing if node has no parent', () => {
      let newState = reducer(testState, {
        type: at.NODE_PROMOTE,
        payload: otherNode.id
      })
      expect(newState).to.eql(testState)
    })
    
    it('should do nothing if node has no grandparent', () => {
      let newState = reducer(testState, {
        type: at.NODE_PROMOTE,
        payload: 'node1'
      })
      expect(newState).to.eql(testState)
    })
    
    it('is undone by NODE_DEMOTE', () => {
      let newState = reducer(
        reducer(testState, {
          type: at.NODE_PROMOTE,
          payload: 'node2'
        }), {
          type: at.NODE_DEMOTE,
          payload: 'node2'
        })
      expect(newState).to.eql(testState)
    })
    
  })
  
  describe(at.NODE_UPDATE, () => {
    
    it('should merge payload into existing node', () => {
      const newState = reducer(testState, {
        type: at.NODE_UPDATE,
        payload: {
          id: otherNode.id,
          content: 'new content'
        }
      })
      expect(newState[otherNode.id]).to.eql({
        id: otherNode.id,
        content: 'new content',
        collapsed: false,
        children: []
      })
    })
    
    it('should update parent nodes if parent prop is changed', () => {
      otherNode.parent = 'oldParent'
      testState['oldParent'] = {
        id: 'oldParent',
        children: [otherNode.id]
      }
      testState['newParent'] = {
        id: 'newParent',
        children: []
      }
      const newState = reducer(testState, {
        type: at.NODE_UPDATE,
        payload: {
          id: otherNode.id,
          parent: 'newParent'
        }
      })
      expect(newState[otherNode.id].parent).to.eql('newParent')
      expect(newState['oldParent'].children).to.eql([])
      expect(newState['newParent'].children).to.eql([otherNode.id])
    })
    
  })
})