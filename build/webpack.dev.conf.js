var webpack = require('webpack');
var config = require('./webpack.base.conf');

// eval-source-map is faster for development
config.devtool = 'eval-source-map';

// add sourcemap
config.module.rules.push({
  enforce: "pre",
  test: /\.js$/,
  loader: 'source-map-loader'
});

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/';

// Add hot reloader to client code for development
// config.entry.push('webpack-hot-middleware/client?reload=true');

// config.plugins = (config.plugins || []).concat([
//   // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
//   new webpack.HotModuleReplacementPlugin(),
//   new webpack.NoEmitOnErrorsPlugin(),
//   new webpack.DefinePlugin({
//     PRODUCTION: 'false'
//   })
// ]);

config.mode = 'development';
module.exports = config;
