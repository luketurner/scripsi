var webpack = require('webpack')
var config = require('./webpack.base.conf')

// eval-source-map is faster for development
config.devtool = 'eval-source-map'

// add sourcemap
config.module.rules.push()

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/'

config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
