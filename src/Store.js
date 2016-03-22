import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'

const state = {
  lastSavedChanges: null,
  displayNodeId: null,
  configNodeId: null,
  rootNodeId: null,
  activeSidebarComponent: null,
  nodes: {}
}

const mutations = {
  SET_NODE (state, node) {
    state.nodes[node.id] = node
  },
  DELETE_NODE (state, id) {
    delete state.nodes[id]
  },
  SET_LAST_SAVED (state, timestamp) {
    store.lastSavedChanges = timestamp
  },
  SET_DISPLAY_NODE (state, id) {
    state.displayNodeId = id
  },
  SET_CONFIG_NODE (state, id) {
    state.configNodeId = id
  },
  SET_ROOT_NODE (state, id) {
    state.rootNodeId = id
  },
  SET_ACTIVE_SIDEBAR (state, component) {
    state.activeSidebarComponent = component
  }
}

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  middlewares: [createLogger()]
})

export default store
