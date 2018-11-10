var config = require('./webpack.base.conf');

// eval-source-map is faster for development
config.devtool = 'eval-source-map';

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/';


config.mode = 'development';
module.exports = config;
