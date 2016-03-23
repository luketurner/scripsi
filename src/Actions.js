// import PersistentStorage from './PersistentStorage'
import uuid from 'node-uuid'
import _ from 'lodash'

export function updateApp (store) {
  // PersistentStorage.saveAppTo(store.persistenceType, store)
  //  .then(() => store.dispatch('LAST_SAVED', Date.now()))
}

export function setDisplayNode (store, id) {
  store.dispatch('SET_DISPLAY_NODE', id)
}

export function setConfigNode (store, id) {
  store.dispatch('SET_CONFIG_NODE', id)
}

export function setRootNode (store, id) {
  store.dispatch('SET_ROOT_NODE', id)
}

export function openConfigNode (store) {
  store.dispatch('SET_DISPLAY_NODE', store.state.configNodeId)
}

export function openRootNode (store) {
  store.dispatch('SET_DISPLAY_NODE', store.state.rootNodeId)
}

export function toggleActiveSidebar (store, component) {
  store.dispatch('SET_ACTIVE_SIDEBAR', store.state.activeSidebarComponent === component ? null : component)
}

export function createNode (store, params) {
  if (params.id) {
    throw new Error("createNode params include an 'id', but that's forbidden")
  }

  let defaults = {
    type: 'Text',
    content: '',
    children: [],
    params: {}
  }

  let node = {
    id: uuid.v4(),
    type: params.type || defaults.type,
    content: params.content || defaults.content,
    params: params.params || defaults.params,
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
