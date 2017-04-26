var config = require('../config');
if (!config.tasks.html) { return; }

var gulp = require('gulp');
var path = require('path');

var htmlTask = function () {

  var paths = {
    src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}')],
    dest: path.join(config.root.dest, config.tasks.html.dest),
  };

  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
