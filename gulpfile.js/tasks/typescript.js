var config      = require('../config')
var gulp        = require('gulp')
var gulpif      = require('gulp-if')
var path        = require('path')
var tsc         = require('gulp-typescript')
var sourcemaps  = require('gulp-sourcemaps');

var paths = {
  src: [
    path.join(config.root.src, config.tasks.typescript.src, '/**/*.ts')
  ],
  dest: path.join(config.root.dest, config.tasks.typescript.dest)
}

var tscTask = function() {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(tsc(
        {
            noImplicitAny: false,
            outDir: paths.dest
        }
    ))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('typescript', tscTask)
module.exports = tscTask
