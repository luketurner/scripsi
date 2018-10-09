var webpack = require('webpack');

var config = require('./webpack.base.conf');

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URL.
config.output.filename = '[name].[chunkhash].js'
config.output.chunkFilename = '[id].[chunkhash].js';

config.mode = 'production';

module.exports = config;
