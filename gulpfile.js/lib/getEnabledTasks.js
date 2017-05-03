const config = require('../config');
const compact = require('lodash/compact');

// Grouped by what can run in parallel
const assetTasks = ['fonts', 'images', 'svgSprite']; // removed 'iconFont'
const codeTasks = ['html', 'stylesheets', 'javascripts', 'server'];

module.exports = (env) => {
  function matchFilter(task) {
    if (config.tasks[task]) {
      if (task === 'javascripts') {
        task = env === 'production' ? 'javascripts:production' : 'javascripts';
      }
      return task;
    }
    return null;
  }

  function exists(value) {
    return !!value;
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter).filter(exists)),
    codeTasks: compact(codeTasks.map(matchFilter).filter(exists))
  };
};
