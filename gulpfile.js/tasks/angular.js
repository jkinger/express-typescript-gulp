var config = require('../config');
if(!config.tasks.angular) return;

var config  = require('../lib/webpack-multi-config')('development');
var gulp    = require('gulp');
var logger  = require('../lib/compileLogger');
var webpack = require('webpack');

var angularTask = function(callback) {
  webpack(config, function(err, stats) {
    logger(err, stats);
    callback();
  });
};

gulp.task('angular', angularTask);
module.exports = angularTask;
