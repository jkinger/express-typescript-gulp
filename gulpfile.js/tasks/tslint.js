var config = require('../config');
if (!config.tasks.html) return;

var gulp = require('gulp');
var path = require('path');
var tslint = require('gulp-tslint');

var paths = {
  src: [
    path.join(config.root.src, config.tasks.typescript.src, '/**/*.ts')
  ],
  dest: path.join(config.root.dest, config.tasks.typescript.dest)
};

var tsLintTask = function () {
  gulp.src(paths.src)
    .pipe(tslint({
      formatter: "prose"
    }))
    .pipe(tslint.report({
      emitError: false
    }));
};

gulp.task('tslint', tsLintTask);
module.exports = tsLintTask;
