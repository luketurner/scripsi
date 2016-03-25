import Vue from 'vue'
import Vuex from 'vuex'

import State from './State'
import MutationHandlers from './MutationHandlers'

import createLogger from 'vuex/logger'
import {persistenceMiddleware} from '../PersistentStorage'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: State,
  mutations: MutationHandlers,
  middlewares: [
    createLogger(),
    persistenceMiddleware
  ]
})

export default store
