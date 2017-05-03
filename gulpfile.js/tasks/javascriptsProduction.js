const config = require('../config');

if (!config.tasks.javascripts) { process.exit(0); }

const gulp = require('gulp');
const logger = require('../lib/compileLogger');
const webpack = require('webpack');
const webpackConfig = require('../lib/webpack-multi-config')('production');

const javascriptsProductionTask = function javascriptsProductionTask(callback) {
  webpack(webpackConfig, (err, stats) => {
    logger(err, stats);
    callback();
  });
};

gulp.task('javascripts:production', javascriptsProductionTask);
module.exports = javascriptsProductionTask;
