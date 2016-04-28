import {StoreAction, StateTree} from './index'

export default (state: StateTree, action: Action): StateTree => {
  let [actionType, actionSubtype]: string[] = action.type.split('.')
  if (actionType !== 'Store') { return state }
  
  let actionEnumValue: StoreAction = StoreAction[actionSubtype]
  switch (actionEnumValue) {
    case StoreAction.SetState:
      return action['state']
    default:
      return state
  }
}