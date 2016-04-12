import 'babel-polyfill'
import * as Vue from 'vue'
// import App from './Components/App'
import defaultNode from './defaultNode'
import App from './layout/app'

import {createStore, combineReducers} from 'redux'

import nodeReducer from './node/reducer'

createStore(combineReducers({
  node: nodeReducer
}))

// Initial load state -- expect this to look for any saved
// app state in localStorage and use that.
/*loadState(Store.state.config.persistenceType)
  .catch(() => {
    // If we can't find any state in local storage,
    // initialize our default data.
    let rootNodeId = createNode(Store, defaultNode).id
    setRootNode(Store, rootNodeId)
    setDisplayNode(Store, rootNodeId)
  })*/

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
