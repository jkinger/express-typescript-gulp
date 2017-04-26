var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');


var jshintTask = function () {

  var paths = {
    src: [ './**/*.js',
           '!./' + config.root.dest + '/**',
           '!./node_modules/**'
    ]
  };

  gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
};

gulp.task('jshint', jshintTask);
module.exports = jshintTask;
