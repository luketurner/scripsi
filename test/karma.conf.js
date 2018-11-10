var webpackConfig = require('../build/webpack.test.conf.js');

delete webpackConfig.entry

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['jsdom'],
    
    files: ['unit-test-runner.ts'],
    preprocessors: {
      'unit-test-runner.ts': ['webpack']
    },
    
    reporters: ['progress'],
    
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
  });
};