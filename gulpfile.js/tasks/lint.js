const config = require('../config');
const gulp = require('gulp');
const path = require('path');
const tslint = require('gulp-tslint');

const lintTask = function lintTask() {
  const paths = {
    src: [path.join(config.root.src, config.tasks.server.src, '/**/*.ts')]
  };

  gulp.src(paths.src)
    .pipe(tslint())
    .pipe(tslint.report({
      emitError: false
    }));
};

gulp.task('lint', ['eslint'], lintTask);
module.exports = lintTask;
