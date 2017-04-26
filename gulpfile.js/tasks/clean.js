var gulp   = require('gulp');
var del    = require('del');
var path   = require('path');
var config = require('../config');

var cleanTask = function (cb) {
  return del([path.resolve(config.root.dest)], { force: true });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
