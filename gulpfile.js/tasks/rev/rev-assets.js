const config = require('../../config');
const gulp = require('gulp');
const path = require('path');
const rev = require('gulp-rev');
const revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', () => {
  // Ignore files that may reference assets. We'll rev them next.
  const filePaths = path.join(config.root.dest, `/**/*+(css|js|json|html|${config.tasks.html.templateEngine})`);
  const ignoreThese = `!${filePaths}`;

  return gulp.src([path.join(config.root.dest, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.root.dest))
    .pipe(revNapkin({ verbose: false }))
    .pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), { merge: true }))
    .pipe(gulp.dest(''));
});
