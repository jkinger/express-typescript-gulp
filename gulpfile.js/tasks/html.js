const config = require('../config');

if (!config.tasks.html) { process.exit(0); }

const gulp = require('gulp');
const path = require('path');

const htmlTask = function htmlTask() {
  const paths = {
    src: [path.join(config.root.src, config.tasks.html.src, `/**/*.{${config.tasks.html.extensions}}`)],
    dest: path.join(config.root.dest, config.tasks.html.dest),
  };

  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
