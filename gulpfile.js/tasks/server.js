var config      = require('../config');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var path        = require('path');
var tsc         = require('gulp-typescript');
var sourcemaps  = require('gulp-sourcemaps');

var serverTask = function() {

  var paths = {
    src: [
      path.join(config.root.src, config.tasks.server.src, '/**/*.ts')
    ],
    dest: path.join(config.root.dest, config.tasks.server.dest)
  };

  // Exclude files
  for (var key = 0; key<config.tasks.server.exclude.length; key++) {
    paths.src.push('!' + path.join(config.root.src, config.tasks.server.src, config.tasks.server.exclude[key]));
  }

  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(tsc(config.tasks.server.compilerOptions))
    .pipe(gulp.dest(paths.dest));
};

gulp.task('server', serverTask);
module.exports = serverTask;
