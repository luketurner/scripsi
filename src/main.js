import 'babel-polyfill'
import Vue from 'vue'
import Moment from 'moment'
import App from './Components/App'
import Store from './Store/index'
import {createNode, setDisplayNode, setRootNode} from './Store/Actions'
import defaultNode from './defaultNode'
import {loadState} from './PersistentStorage'

// TODO -- this is to be used for a "last saved X seconds ago" timer
Moment.updateLocale('en', {
  relativeTime: {
    s: (num, withoutSuffix) => (num === 1 ? 'one' : num) + ' second' + (withoutSuffix ? '' : 's')
  }
})

// Initial load state -- expect this to look for any saved
// app state in localStorage and use that.
loadState(Store.state.config.persistenceType)
  .catch(() => {
    // If we can't find any state in local storage,
    // initialize our default data.
    let rootNodeId = createNode(Store, defaultNode).id
    setRootNode(Store, rootNodeId)
    setDisplayNode(Store, rootNodeId)
  })

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  store: Store
})
