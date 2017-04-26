var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var tslint = require('gulp-tslint');

var lintTask = function () {

  var paths = {
    src: [
      path.join(config.root.src, config.tasks.server.src, '/**/*.ts')
    ]
  };

  gulp.src(paths.src)
    .pipe(tslint())
    .pipe(tslint.report({
      emitError: false
    }));
};

gulp.task('lint', ['jshint'], lintTask);
module.exports = lintTask;
