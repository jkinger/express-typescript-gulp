const config = require('../config');

if (!config.tasks.svgSprite) { process.exit(0); }

const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const path = require('path');

const svgSpriteTask = function svgSpriteTask() {
  const settings = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.svgSprite.dest)
  };

  return gulp.src(settings.src)
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest));
};

gulp.task('svgSprite', svgSpriteTask);
module.exports = svgSpriteTask;
