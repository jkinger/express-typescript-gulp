var config       = require('../config')
if(!config.tasks.html) return

var browserSync  = require('browser-sync')
var gulp         = require('gulp')
var path         = require('path')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}')],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}

var htmlTask = function() {

  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)
}

gulp.task('html', htmlTask)
module.exports = htmlTask
