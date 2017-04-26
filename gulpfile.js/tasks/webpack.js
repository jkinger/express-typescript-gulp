var config = require('../config');
if(!config.tasks.js) { return; }

var gulp    = require('gulp');
var logger  = require('../lib/compileLogger');
var webpack = require('webpack');

var webpackTask = function(callback) {

  var webpackConfig  = require('../lib/webpack-multi-config')('development');

  webpack(webpackConfig, function(err, stats) {
    logger(err, stats);
    callback();
  });
};

gulp.task('webpack', webpackTask);
module.exports = webpackTask;
