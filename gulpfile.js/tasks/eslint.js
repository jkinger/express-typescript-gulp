const config = require('../config');
const gulp = require('gulp');
const eslint = require('gulp-eslint');


const eslintTask = function eslintTask() {
  const paths = {
    src: [
      './**/*.js',
      `!./${config.root.dest}/**`,
      '!./node_modules/**'
    ]
  };

  gulp.src(paths.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

gulp.task('eslint', eslintTask);
module.exports = eslintTask;
