import 'babel-polyfill'

// If this was an OAuth redirect, extract the
// access token and so forth from query params
// dropboxAuthorizer.getToken()
// .then((t) => console.log('Got token', t))

import Vue from 'vue'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
