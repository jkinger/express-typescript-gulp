var config = require('../config');
if (!config.tasks.svgSprite) return;

var browserSync = require('browser-sync');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var path = require('path');

var settings = {
  src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
  dest: path.join(config.root.dest, config.tasks.svgSprite.dest)
};

var svgSpriteTask = function () {

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());
};

gulp.task('svgSprite', svgSpriteTask);
module.exports = svgSpriteTask;
