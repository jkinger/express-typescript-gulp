var config = require('../config');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');

var productionTask = function (cb) {
  global.production = true;

  var tasks = getEnabledTasks('production');
  var rev = config.tasks.production.rev ? 'rev': false;

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, rev, 'size-report', 'static', cb);
};

gulp.task('production', productionTask);
module.exports = productionTask;
