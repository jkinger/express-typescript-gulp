const config = require('../config');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const getEnabledTasks = require('../lib/getEnabledTasks');

const productionTask = function productionTask(cb) {
  global.production = true;

  const tasks = getEnabledTasks('production');
  const rev = config.tasks.production.rev ? 'rev' : false;

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, rev, 'size-report', 'static', cb);
};

gulp.task('production', productionTask);
module.exports = productionTask;
