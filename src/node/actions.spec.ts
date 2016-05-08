import * as actions from './actions'
import * as actionTypes from '../action-types'

describe('Actions: node', () => {
  let testNode;
  
  beforeEach(() => {
    testNode = {
      content: 'test'
    }
  })
  
  describe('insertChildNode', () => {
    it('puts node, parentId, and index into payload', () => {
      expect(actions.insertChildNode(testNode, 'parentid', 12)).to.eql({
        type: actionTypes.NODE_INSERT_CHILD,
        payload: {
          node: testNode,
          parentId: 'parentid',
          index: 12
        }
      })
    })
  })
  
  describe('insertSiblingNode', () => {
    it('puts node and siblingId into payload', () => {
      expect(actions.insertSiblingNode(testNode, 'sibling')).to.eql({
        type: actionTypes.NODE_INSERT_SIBLING,
        payload: {
          node: testNode,
          siblingId: 'sibling'
        }
      })
    })
  })
  
  describe('insertNodeBelow', () => {
    it('puts node and existingId into payload', () => {
      expect(actions.insertNodeBelow(testNode, 'asdf')).to.eql({
        type: actionTypes.NODE_INSERT_BELOW,
        payload: {
          node: testNode,
          existingId: 'asdf'
        }
      })
    })
  })
})