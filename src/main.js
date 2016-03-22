import 'babel-polyfill'

// If this was an OAuth redirect, extract the
// access token and so forth from query params
// dropboxAuthorizer.getToken()
// .then((t) => console.log('Got token', t))

import Vue from 'vue'
import App from './App'
import {loadAppFrom, saveAppTo} from './Storage'
import {createNode} from './Node'

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

let state = {
  rootNode: null,
  unsavedChanges: false
}

loadAppFrom('local').then(function (data) {
  state = data
}, function (error) {
  console.log('Error loading initial data: ' + error)
  state.rootNode = createNode(defaultNodes).id
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  data: {
    state: state
  },
  methods: {
    handleChange: function () {
      this.state.unsavedChanges = true
      saveAppTo('local', this.state).then(_ => {
        this.state.unsavedChanges = false
      })
    }
  }
})
