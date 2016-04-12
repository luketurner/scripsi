import {includes} from 'lodash'

import Local from './Local'

const notPersistedMutations = [MutationType.SetLastSaved]

let persistenceTypes = {
  local: Local
}

export function loadState (persistenceType) {
  return persistenceTypes[persistenceType]
    .loadState()
    .then((newState) => {
      Store.dispatch(MutationType.SetState, newState)
    })
}

export function saveState (persistenceType, data) {
  return persistenceTypes[persistenceType]
    .saveState(data)
    .then((val) => {
      Store.dispatch(MutationType.SetLastSaved, Date.now())
    }, (err) => console.log('saved err', err)) // TODO handle this error
}

let debouncedSaveState = _.debounce(saveState, 150)

export let persistenceMiddleware = {
  onInit (state, store) {
    store.watch('config.persistenceType', (persistenceType) => loadState(persistenceType))
  },
  onMutation (mutation, state) {
    if (!includes(notPersistedMutations, mutation.type)) {
      return debouncedSaveState(state.config.persistenceType, state)
    }
  }
}
