const config = require('../config');

if (!config.tasks.stylesheets) { process.exit(0); }

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handleErrors = require('../lib/handleErrors');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const cssnano = require('gulp-cssnano');

const stylesheetsTask = function stylesheetsTask() {
  const paths = {
    src: path.join(config.root.src, config.tasks.stylesheets.src,
      `/**/*.{${config.tasks.stylesheets.extensions}}`),
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
