var config = require('../config');
if (!config.tasks.stylesheets) { return; }

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var cssnano = require('gulp-cssnano');

var stylesheetsTask = function () {

  var paths = {
    src: path.join(config.root.src, config.tasks.stylesheets.src,
      '/**/*.{' + config.tasks.stylesheets.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.stylesheets.dest)
  };


  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(config.tasks.stylesheets.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.stylesheets.autoprefixer))
    .pipe(gulpif(global.production, cssnano({ autoprefixer: false })))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest));
};

gulp.task('stylesheets', stylesheetsTask);
module.exports = stylesheetsTask;
