// import PersistentStorage from './PersistentStorage'
import uuid from 'node-uuid'
import _ from 'lodash'

export function updateApp (store) {
  // PersistentStorage.saveAppTo(store.persistenceType, store)
  //  .then(() => store.dispatch('LAST_SAVED', Date.now()))
}

export function setRootNode (store, rootNodeId) {
  store.dispatch('SET_ROOT_NODE', rootNodeId)
}

export function createNode (store, params) {
  if (params.id) {
    throw new Error("createNode params include an 'id', but that's forbidden")
  }

  let defaults = {
    type: 'ListItem',
    content: '',
    children: []
  }

  let node = {
    id: uuid.v4(),
    type: params.type || defaults.type,
    content: params.content || defaults.content,
    children: _.map(params.children || defaults.children,
                   (child) => createNode(store, child).id)
  }

  updateNode(store, node)
  return node
}

export function updateNode (store, node) {
  store.dispatch('SET_NODE', node)
  // PersistentStorage.saveNodeTo(store.persistenceType, node)
  //  .then(() => store.dispatch('LAST_SAVED', Date.now()))
}
