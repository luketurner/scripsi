import {LayoutState, LayoutActionType} from './types'
import {update} from '../util/update'

const defaultState: LayoutState = {
  sidebar: {
    left: null,
    right: null
  },
  displayNodeId: null
}

export default function (state: LayoutState = defaultState, action: Action): LayoutState {
  let [actionEnumType, actionEnumValue] = action.type.split('.')
  if (actionEnumType !== 'Layout') { return state }
  
  let actionType = LayoutActionType[actionEnumValue]
  if (!actionType) { return state }
  
  switch (actionType) {
    case LayoutActionType.SetDisplayNodeId:
      return update<LayoutState,LayoutState>(state, { displayNodeId: { $set: action['nodeId'] } })
     default:
      return state
  }
}