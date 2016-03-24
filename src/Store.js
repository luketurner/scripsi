import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import createLogger from 'vuex/logger'

const state = {
  lastSavedChanges: null,
  displayNodeId: null,
  rootNodeId: null,
  activeSidebarComponent: null,
  bookmarks: [],
  settings: {},
  nodes: {}
}

const mutations = {
  SET_NODE (state, node) {
    Vue.set(state.nodes, node.id, node)
  },
  DELETE_NODE (state, id) {
    _.each(state.nodes, (node) => {
      node.children = _.filter(node.children, (child) => child !== id)
    })
    Vue.delete(state.nodes, id)
  },
  SET_LAST_SAVED (state, timestamp) {
    state.lastSavedChanges = timestamp
  },
  SET_DISPLAY_NODE (state, id) {
    state.displayNodeId = id
  },
  SET_ROOT_NODE (state, id) {
    state.rootNodeId = id
  },
  SET_ACTIVE_SIDEBAR (state, component) {
    state.activeSidebarComponent = component
  },
  ADD_BOOKMARK (state, id) {
    state.bookmarks.push(id)
  }
}

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  middlewares: [createLogger()]
})

export default store
