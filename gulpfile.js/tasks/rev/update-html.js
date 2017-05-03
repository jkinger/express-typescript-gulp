const config = require('../../config');

if (!config.tasks.html) { process.exit(0); }

const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');
const path = require('path');

// 5) Update asset references in HTML
gulp.task('update-html', () => {
  const manifest = gulp.src(path.join(config.root.dest, '/rev-manifest.json'));
  return gulp.src(path.join(config.root.dest, config.tasks.html.dest, `/**/*.${config.tasks.html.templateEngine}`))
    .pipe(revReplace({
      manifest,
      replaceInExtensions: [`.${config.tasks.html.templateEngine}`]
    }))
    .pipe(gulp.dest(path.join(config.root.dest, config.tasks.html.dest)));
});
