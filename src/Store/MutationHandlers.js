import Vue from 'vue'
import _ from 'lodash'

import * as m from './Mutations'
export default {
  [m.SET_STATE] (state, newState) {
    _.mergeWith(state, newState, (oldVal, newVal, key, state) => Vue.set(state, key, newVal))
  },
  [m.SET_NODE] (state, node) {
    Vue.set(state.nodes, node.id, node)
  },
  [m.DELETE_NODE] (state, id) {
    _.each(state.nodes, (node) => {
      node.children.$remove(id)
    })
    Vue.delete(state.nodes, id)
  },
  [m.SET_LAST_SAVED] (state, timestamp) {
    state.lastSavedChanges = timestamp
  },
  [m.SET_DISPLAY_NODE] (state, id) {
    state.displayNodeId = id
  },
  [m.SET_ROOT_NODE] (state, id) {
    state.rootNodeId = id
  },
  [m.SET_ACTIVE_SIDEBAR] (state, component) {
    state.activeSidebarComponent = component
  },
  [m.ADD_BOOKMARK] (state, id) {
    state.bookmarks.push(id)
  },
  [m.SET_CONFIG_VALUE] (state, key, val) {
    Vue.set(state.config, key, val)
  }
}
