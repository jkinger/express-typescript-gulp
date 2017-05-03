const config = require('../config');
const gulp = require('gulp');
const sizereport = require('gulp-sizereport');
const path = require('path');

gulp.task('size-report', () => {
  const sizeReportTask = gulp.src([
    path.join(config.root.dest, config.tasks.fonts.dest, '/**/*'),
    path.join(config.root.dest, config.tasks.javascripts.dest, '/**/*'),
    path.join(config.root.dest, config.tasks.stylesheets.dest, '/**/*'),
    path.join(config.root.dest, config.tasks.images.dest, '/**/*')])
    .pipe(sizereport({
      gzip: true
    }));

  return sizeReportTask;
});
