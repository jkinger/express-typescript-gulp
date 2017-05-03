const config = require('../config');
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');

const watchTask = function watchTask() {
  const watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'stylesheets', 'server', 'javascripts'];

  watchableTasks.forEach((taskName) => {
    const task = config.tasks[taskName];
    if (task) {
      const glob = [
        path.join(config.root.src, task.src, `**/*.{${task.extensions.join(',')}}`)
      ];

      if (task.exclude) {
         // Exclude files
        for (let key = 0; key < task.exclude.length; key += 1) {
          const pathExclude = path.join(config.root.src, task.src, task.exclude[key]);
          glob.push(`!${pathExclude}`);
        }
      }

      watch(glob, () => {
        require(`./${taskName}`)();
      });
    }
  });
};

gulp.task('watch', ['nodemon'], watchTask);
module.exports = watchTask;
