const path = require('path');
const fs = require('fs');
const pathToUrl = require('./pathToUrl');

module.exports = function webpackManifest(publicPath, dest, filename) {
  filename = filename || 'rev-manifest.json';

  return function createManifest() {
    this.plugin('done', (stats) => {
      stats = stats.toJson();
      const chunks = stats.assetsByChunkName;
      const manifest = {};

      Object.keys(chunks).forEach((key) => {
        const originalFilename = `${key}.js`;
        manifest[pathToUrl(publicPath, originalFilename)] = pathToUrl(publicPath, chunks[key]);
      });

      fs.writeFileSync(
        path.join(process.cwd(), dest, filename),
        JSON.stringify(manifest)
      );
    });
  };
};
