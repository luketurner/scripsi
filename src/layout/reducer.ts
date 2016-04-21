import {LayoutStateTree, LayoutActionType} from './types'
import {Action} from '../store'
import {update} from '../util/update'

const defaultState: LayoutStateTree = {
  sidebar: {
    left: null,
    right: null
  },
  displayNodeId: null
}

export default function (state: LayoutStateTree = defaultState, action: Action): LayoutStateTree {
  let [actionEnumType, actionEnumValue] = action.type
  if (actionEnumType !== 'LayoutActionType') { return state }
  if (!<LayoutActionType>actionEnumValue) { return state }
  
  switch (actionEnumValue) {
    case LayoutActionType.SetDisplayNodeId:
      return update<LayoutStateTree,LayoutStateTree>(state, { displayNodeId: { $set: action['nodeId'] } })
     default:
      return state
  }
}