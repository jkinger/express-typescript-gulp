const gutil = require('gulp-util');
const prettifyTime = require('./prettifyTime');
const handleErrors = require('./handleErrors');

module.exports = function compilerLogger(err, stats) {
  if (err) { throw new gutil.PluginError('webpack', err); }

  let statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

  if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach((error) => {
      if (Object.prototype.hasOwnProperty.call(error, 'loaderSource')) {
        handleErrors(`loader: ${error.loaderSource} message: ${error.rawMessage}`);
      } else {
        handleErrors(error);
      }
      statColor = 'red';
    });
  } else {
    const compileTime = prettifyTime(stats.endTime - stats.startTime);
    gutil.log(gutil.colors[statColor](stats));
    gutil.log('Compiled with', gutil.colors.cyan('webpack'), 'in', gutil.colors.magenta(compileTime));
  }
};
