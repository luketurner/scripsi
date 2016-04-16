import {LayoutStateTree, LayoutActionType} from './types'
import {Action} from '../types'
import {assign} from 'lodash'

const defaultState: LayoutStateTree = {
  sidebar: {
    left: null,
    right: null
  },
  displayNodeId: null
}

export default function (state: LayoutStateTree | void, action: Action): LayoutStateTree {
  if (!state) {
    return defaultState;
  }
  switch (LayoutActionType[action.type]) {
    case LayoutActionType.SetDisplayNodeId:
      return <LayoutStateTree>assign({}, state, { displayNodeId: action['nodeId'] })
     default:
      return <LayoutStateTree>state
  }
}