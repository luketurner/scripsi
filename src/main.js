import 'babel-polyfill'

// If this was an OAuth redirect, extract the
// access token and so forth from query params
// dropboxAuthorizer.getToken()
// .then((t) => console.log('Got token', t))

import Vue from 'vue'
import App from './App'
import {loadFrom, saveTo} from './Storage'

let state = {
  rootNode: {},
  unsavedChanges: false
}

loadFrom('local').then(function (data) {
  state.rootNode = data
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
      saveTo('local', this.state.rootNode).then(_ => {
        this.state.unsavedChanges = false
      })
    }
  }
})
