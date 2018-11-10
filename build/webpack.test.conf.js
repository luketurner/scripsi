// var webpack = require('webpack');
var config = require('./webpack.base.conf');

config.entry = './test/unit-test-runner.ts';

config.mode = 'development';
config.node = { 'fs': 'empty' }; // used to fix "Error: Cannot find module 'fs'"
module.exports = config;
