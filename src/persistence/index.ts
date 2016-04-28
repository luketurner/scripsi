import {PersistType} from './types'

import Local from './Local'

let persistenceTypes = {
  [PersistType.Local]: Local
}

export function loadState () {
  return (dispatch, getState) => {
    let persistence = getState().persistence
    dispatch({
      type: 'Persistence.LoadStarted'
    })
    return persistenceTypes[persistence.persistType]
      .loadState(persistence.databaseName)
      .then((val) => dispatch({
          type: 'Store.SetState',
          state: val
        }))
      .then(() => dispatch({
          type: 'Persistence.LoadCompleted'
        }),
        (err) => dispatch({
          type: 'Persistence.LoadFailed',
          error: err
        }))
  }
}

export function saveState () {
  return (dispatch, getState) => {
    let state = getState()
    dispatch({
      type: 'Persistence.SaveStarted'
    })
    return persistenceTypes[state.persistence.persistType]
      .saveState(state.persistence.databaseName, state)
      .then((val) => dispatch({
          type: 'Persistence.SaveCompleted'
        }), (err) => dispatch({
          type: 'Persistence.SaveFailed',
          error: err
        }))
  }
}

export const persistenceMiddleware = (store) => (next) => (action: Action) => {
  let result = next(action)
  let state = store.getState()
  let actionType = action.type.split('.')[0];
  if (actionType !== 'Persistence') {
    store.dispatch(saveState())
  }
  return result
}