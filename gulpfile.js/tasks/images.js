const config = require('../config');

if (!config.tasks.images) { process.exit(0); }

const changed = require('gulp-changed');
const gulp = require('gulp');
const path = require('path');

const imagesTask = function imagesTask() {
  const paths = {
    src: path.join(config.root.src, config.tasks.images.src, `/**/*.{${config.tasks.images.extensions}}`),
    dest: path.join(config.root.dest, config.tasks.images.dest)
  };

  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
