import {update} from '../util/update'

import {assign} from 'lodash'

import {PersistenceState, PersistenceActionType, PersistType} from './types'

const defaultState: PersistenceState = {
  persistType: PersistType.Local,
  isSaving: false,
  lastError: null,
  databaseName: 'scripsi'
}

export default (state: PersistenceState = defaultState, action: Action): PersistenceState => {
  let [actionType, actionSubtype]: string[] = action.type.split('.')
  if (actionType !== 'Persistence') { return state }
  
  switch (PersistenceActionType[actionSubtype]) {
    case PersistenceActionType.SetPersistType:
      let persistType = PersistType[action['persistType']]
      return update<PersistenceState,PersistenceState>(state, { persistType: { $set: persistType } })
    case PersistenceActionType.SetDatabaseName:
      let databaseName = PersistType[action['databaseName']]
      return update<PersistenceState,PersistenceState>(state, { databaseName: { $set: databaseName } })
    case PersistenceActionType.LoadStarted:
      return state
    case PersistenceActionType.LoadCompleted:
      return state
    case PersistenceActionType.LoadFailed:
      return update<PersistenceState,PersistenceState>(state, { 
        lastError: { $set: action['error'] }
      })
    case PersistenceActionType.SaveStarted:
      return update<PersistenceState,PersistenceState>(state, { isSaving: { $set: true } })
    case PersistenceActionType.SaveCompleted:
      return update<PersistenceState,PersistenceState>(state, { isSaving: { $set: false } })
    case PersistenceActionType.SaveFailed:
      return update<PersistenceState,PersistenceState>(state, { 
        isSaving: { $set: false },
        lastError: { $set: action['error'] }
      })
    default:
      return state
  }
}