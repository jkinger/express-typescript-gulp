var config = require('../config');
if (!config.tasks.html) return;

var gulp = require('gulp');
var path = require('path');
var tslint = require('gulp-tslint');

var paths = {
  src: [
    path.join(config.root.src, config.tasks.server.src, '/**/*.ts')
  ]
};

var tsLintTask = function () {
  gulp.src(paths.src)
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report({
      emitError: false
    }));
};

gulp.task('tslint', tsLintTask);
module.exports = tsLintTask;
