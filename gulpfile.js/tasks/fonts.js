const config = require('../config');

if (!config.tasks.fonts) { process.exit(0); }

const changed = require('gulp-changed');
const gulp = require('gulp');
const path = require('path');

const fontsTask = function fontsTask() {
  const paths = {
    src: path.join(config.root.src, config.tasks.fonts.src, `/**/*.{${config.tasks.fonts.extensions}}`),
    dest: path.join(config.root.dest, config.tasks.fonts.dest)
  };

  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
