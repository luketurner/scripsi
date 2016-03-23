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
  content: 'Welcome to Scripsi',
  type: 'ListItem',
  children: [
    {
      content: 'About',
      type: 'DefinitionListItem',
      children: [{
        content: 'Scripsi is a document editor with a streamlined tree-based interface. ' +
                 'It makes it possible to do a combination of Workflowy and Notion things.'
      }]
    },
    {
      content: 'Features',
      type: 'DefinitionListItem',
      children: [{
        type: 'ListItem',
        content: 'Tables, images, code, etc. support'
      }, {
        type: 'ListItem',
        content: 'Nest things inside each other'
      }]
    }
  ]
}

const defaultConfigNode = {
  type: 'JsonObject',
  content: {
    bookmarks: [],
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
