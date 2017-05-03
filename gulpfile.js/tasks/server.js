const config = require('../config');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const path = require('path');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const serverTask = function serverTask() {
  const paths = {
    src: [
      path.join(config.root.src, config.tasks.server.src, '/**/*.ts')
    ],
    dest: path.join(config.root.dest, config.tasks.server.dest)
  };

  // Exclude files
  for (let key = 0; key < config.tasks.server.exclude.length; key += 1) {
    const pathExclude = path.join(config.root.src, config.tasks.server.src,
      config.tasks.server.exclude[key]);
    paths.src.push(`!${pathExclude}`);
  }

  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(tsc(config.tasks.server.compilerOptions))
    .pipe(gulp.dest(paths.dest));
};

gulp.task('server', serverTask);
module.exports = serverTask;
