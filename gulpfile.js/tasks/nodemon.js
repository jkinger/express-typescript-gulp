var config = require('../config')
var gulp = require('gulp')
var path = require('path')
var nodemon = require('gulp-nodemon')

var paths = {
  server: path.join(config.root.dest, config.tasks.nodemon.server),
  dest: config.root.dest
}

var nodemonTask = function () {
  nodemon({
    script: paths.server,
    watch: paths.dest
  })
}

gulp.task('nodemon', nodemonTask)
module.exports = nodemonTask
