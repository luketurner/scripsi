import Vue from 'vue'
import Vuex from 'vuex'

import State from './State'
import MutationHandlers from './MutationHandlers'

import createLogger from 'vuex/logger'
import {persistenceMiddleware} from '../PersistentStorage'

let middlewares = [persistenceMiddleware]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}

Vue.use(Vuex)
const store = new Vuex.Store({
  state: State,
  mutations: MutationHandlers,
  middlewares: middlewares
})

export default store
