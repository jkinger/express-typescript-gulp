const config = require('../../config');
const gulp = require('gulp');
const path = require('path');
const revReplace = require('gulp-rev-replace');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', () => {
  const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));

  return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest(config.root.dest));
});
