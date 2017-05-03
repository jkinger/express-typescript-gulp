const config = require('../config');

if (!config.tasks.javascripts) { process.exit(0); }

const gulp = require('gulp');
const logger = require('../lib/compileLogger');
const webpack = require('webpack');
const webpackConfig = require('../lib/webpack-multi-config')('development');

const javascriptsTask = function javascriptsTask(callback) {
  webpack(webpackConfig, (err, stats) => {
    logger(err, stats);
    if (callback) {
      callback();
    }
  });
};

gulp.task('javascripts', javascriptsTask);
module.exports = javascriptsTask;
