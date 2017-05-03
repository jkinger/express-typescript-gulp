const gulp = require('gulp');
const del = require('del');
const path = require('path');
const config = require('../config');

const cleanTask = function cleanTask() {
  return del([path.resolve(config.root.dest)], { force: true });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
