import {UIState, UIAction} from './types'
import {update} from '../util/update'

const defaultState: UIState = {
  displayNodeId: null,
  showLeftSidebar: true
}

export default function (state: UIState = defaultState, action: Action): UIState {
  let [actionEnumType, actionEnumValue] = action.type.split('.')
  if (actionEnumType !== 'UI') { return state }
  
  let actionType = UIAction[actionEnumValue]
  if (!actionType) { return state }
  
  switch (actionType) {
    case UIAction.SetDisplayNodeId:
      return update<UIState,UIState>(state, { displayNodeId: { $set: action['nodeId'] } })
    case UIAction.ToggleLeftSidebar:
      return update<UIState,UIState>(state, { showLeftSidebar: { $apply: (x) => !x } })

     default:
      return state
  }
}