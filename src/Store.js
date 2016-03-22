import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'

const state = {
  lastSavedChanges: null,
  persistenceType: 'local',
  rootNodeId: null,
  nodes: {}
}

const mutations = {
  SET_NODE (state, node) {
    state.nodes[node.id] = node
  },
  DELETE_NODE (state, id) {
    delete state.nodes[id]
  },
  LAST_SAVED (state, timestamp) {
    store.lastSavedChanges = timestamp
  },
  SET_ROOT_NODE (state, id) {
    state.rootNodeId = id
  }
}

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  middlewares: [createLogger()]
})

export default store
