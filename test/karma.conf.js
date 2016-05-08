var webpackConfig = require('../build/webpack.base.conf.js')

delete webpackConfig.entry

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['jsdom'],
    
    files: ['index.ts'],
    preprocessors: {
      'index.ts': ['webpack']
    },
    
    reporters: ['spec'],
    
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}