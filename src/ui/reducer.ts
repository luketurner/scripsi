import {UIState, UIAction} from './types'
import {update} from '../util/update'

const defaultState: UIState = {
  displayNodeId: null
}

export default function (state: UIState = defaultState, action: Action): UIState {
  let [actionEnumType, actionEnumValue] = action.type.split('.')
  if (actionEnumType !== 'UI') { return state }
  
  let actionType = UIAction[actionEnumValue]
  if (!actionType) { return state }
  
  switch (actionType) {
    case UIAction.SetDisplayNodeId:
      return update<UIState,UIState>(state, { displayNodeId: { $set: action['nodeId'] } })
     default:
      return state
  }
}