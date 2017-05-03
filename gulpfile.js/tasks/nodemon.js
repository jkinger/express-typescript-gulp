const config = require('../config');
const gulp = require('gulp');
const path = require('path');
const nodemon = require('gulp-nodemon');

const nodemonTask = function nodemonTask() {
  const paths = {
    server: path.join(config.root.dest, config.tasks.nodemon.server),
    dest: config.root.dest
  };

  nodemon({
    script: paths.server,
    watch: paths.dest
  });
};

gulp.task('nodemon', nodemonTask);
module.exports = nodemonTask;
