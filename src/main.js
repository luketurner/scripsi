import 'babel-polyfill'

// If this was an OAuth redirect, extract the
// access token and so forth from query params
// dropboxAuthorizer.getToken()
// .then((t) => console.log('Got token', t))

import Vue from 'vue'
import App from './Components/App'
import Store from './Store'
import {createNode, setRootNode} from './Actions'

const defaultNodes = {
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

let rootNode = createNode(Store, defaultNodes)
setRootNode(Store, rootNode.id)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  store: Store
})
