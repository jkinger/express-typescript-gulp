var config = require('../config');
if (!config.tasks.js || !config.tasks.angular) return;

var path = require('path');
var pathToUrl = require('./pathToUrl');
var webpack = require('webpack');
var webpackManifest = require('./webpackManifest');

module.exports = function (env) {
  var angularSrc = path.resolve(config.root.src, config.tasks.angular.src);
  var angularDest = path.resolve(config.root.dest, config.tasks.angular.dest);
  var publicPath = pathToUrl(config.tasks.angular.dest, '/');

  var extensions = config.tasks.angular.extensions.map(function (extension) {
    return '.' + extension;
  });

  var rev = config.tasks.production.rev && env === 'production';
  var filenamePattern = rev ? '[name]-[hash].js' : '[name].js';

  var webpackConfig = {
    context: angularSrc,
    plugins: [],
    resolve: {
      extensions: extensions // An array of extensions that should be used to resolve modules.
    },
    module: {
      rules: [
        {
          // Loader to transpile the Typescript code to ES5, guided by the tsconfig.json file.
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: 'tsconfig.webpack.json' }
            }, 'angular2-template-loader' // Loads angular components' template and styles.
          ]
        },
        {
          // Loader for component templates.
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          // Loader for component-scoped styles (the ones specified in a component's styleUrls metadata property)
          test: /\.css$/,
          loader: 'raw-loader'
        }
      ]
    }
  };

  if (env === 'development') {
    webpackConfig.devtool = 'inline-source-map'; // Developer tool to enhance debugging
    webpackConfig.entry = config.tasks.angular.entries;

    webpackConfig.output = {
      path: path.normalize(angularDest), // The output directory as absolute path (required).
      filename: filenamePattern, // Specifies the name of each output file on disk (not an absolute path).
      publicPath: publicPath
    };

    if (config.tasks.angular.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      );
    }
  }

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.angular.entries;

    webpackConfig.output = {
      path: path.normalize(angularDest),
      filename: filenamePattern,
      publicPath: publicPath
    };

    if (config.tasks.angular.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      );
    }
  }

  if (env === 'production') {
    if (rev) {
      webpackConfig.plugins.push(new webpackManifest(publicPath, config.root.dest));
    }
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  return webpackConfig;
};
