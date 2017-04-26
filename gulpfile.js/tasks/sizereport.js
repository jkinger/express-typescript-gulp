var config = require('../config');
var gulp = require('gulp');
var repeatString = require('../lib/repeatString');
var sizereport = require('gulp-sizereport');
var path = require('path');

gulp.task('size-report', function () {
  return gulp.src([
    path.join(config.root.dest, config.tasks.fonts.dest, '/**/*'),
    path.join(config.root.dest, config.tasks.js.dest, '/**/*'),
    path.join(config.root.dest, config.tasks.stylesheets.dest, '/**/*'),
    path.join(config.root.dest, config.tasks.images.dest, '/**/*')])
    .pipe(sizereport({
      gzip: true
    }));
});
