var path = require('path');
var fs   = require('fs');
var pathToUrl = require('./pathToUrl');

module.exports = function(publicPath, dest, filename) {
  filename = filename || 'rev-manifest.json';

  return function() {
    this.plugin('done', function(stats) {
      stats    = stats.toJson();
      var chunks   = stats.assetsByChunkName;
      var manifest = {};

      for (var key in chunks) {
        if (chunks.hasOwnProperty(key)) {
          var originalFilename = key + '.js';
          manifest[pathToUrl(publicPath, originalFilename)] = pathToUrl(publicPath, chunks[key]);
        }
      }

      fs.writeFileSync(
        path.join(process.cwd(), dest, filename),
        JSON.stringify(manifest)
      );
    });
  };
};
