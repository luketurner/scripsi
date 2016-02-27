var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
var Vue = require('vue')

Vue.config.debug = true

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
