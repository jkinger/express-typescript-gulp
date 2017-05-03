const config = require('../config');

if (!config.tasks.static) { process.exit(0); }

const changed = require('gulp-changed');
const gulp = require('gulp');
const path = require('path');

const staticTask = function staticTask() {
  const paths = {
    src: [
      path.join(config.root.src, config.tasks.static.src, '/**'),
      path.join(`!${config.root.src}`, config.tasks.static.src, '/README.md')
    ],
    dest: path.join(config.root.dest, config.tasks.static.dest)
  };

  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('static', staticTask);
module.exports = staticTask;
