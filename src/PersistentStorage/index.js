import _ from 'lodash'

import Local from './Local'

import Store from '../Store/index'

const SET_LAST_SAVED = 'SET_LAST_SAVED'
const SET_STATE = 'SET_STATE'
const notPersistedMutations = [SET_LAST_SAVED]

let persistenceTypes = {
  local: Local
}

export function loadState (persistenceType) {
  return persistenceTypes[persistenceType]
    .loadState()
    .then((newState) => {
      Store.dispatch(SET_STATE, newState)
    })
}

export function saveState (persistenceType, data) {
  return persistenceTypes[persistenceType]
    .saveState(data)
    .then((val) => {
      Store.dispatch(SET_LAST_SAVED, Date.now())
    }, (err) => console.log('saved err', err)) // TODO handle this error
}

let debouncedSaveState = _.debounce(saveState, 150)

export let persistenceMiddleware = {
  onInit (state, store) {
    store.watch('config.persistenceType', (persistenceType) => loadState(persistenceType))
  },
  onMutation (mutation, state) {
    if (!_.includes(notPersistedMutations, mutation.type)) {
      return debouncedSaveState(state.config.persistenceType, state)
    }
  }
}
