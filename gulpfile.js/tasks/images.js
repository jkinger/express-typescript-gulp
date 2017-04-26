var config = require('../config');
if (!config.tasks.images) { return; }

var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');

var imagesTask = function () {

  var paths = {
    src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.images.dest)
  };

  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
