import 'babel-polyfill'

// If this was an OAuth redirect, extract the
// access token and so forth from query params
// dropboxAuthorizer.getToken()
// .then((t) => console.log('Got token', t))

import Vue from 'vue'
import App from './Components/App'
import Store from './Store'
import {createNode, setDisplayNode, setConfigNode, setRootNode} from './Actions'

const defaultRootNode = {
  content: 'Anode',
  type: 'ListItem',
  children: [
    {
      content: 'Inode',
      type: 'ListItem',
      children: []
    },
    {
      content: 'Inode',
      type: 'ListItem',
      children: []
    }
  ]
}

const defaultConfigNode = {
  type: 'JSON',
  content: {
    favorites: [],
    persistenceType: 'local'
  }
}

let rootNodeId = createNode(Store, defaultRootNode).id
setRootNode(Store, rootNodeId)
setDisplayNode(Store, rootNodeId)

setConfigNode(Store, createNode(Store, defaultConfigNode).id)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  store: Store
})
