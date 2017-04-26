var config = require('../config');
if (!config.tasks.js || !config.tasks.webpack) { return; }

var path = require('path');
var pathToUrl = require('./pathToUrl');
var webpack = require('webpack');
var WebpackManifest = require('./webpackManifest');

module.exports = function (env) {
  var webpackSrc = path.resolve(config.root.src, config.tasks.webpack.src);
  var webpackDest = path.resolve(config.root.dest, config.tasks.webpack.dest);
  var publicPath = pathToUrl(config.tasks.webpack.dest, '/');

  var extensions = config.tasks.webpack.extensions.map(function (extension) {
    return '.' + extension;
  });

  var rev = config.tasks.production.rev && env === 'production';

  var webpackConfig = {
    context: webpackSrc,
    entry: config.tasks.webpack.entries,
    output: {
      path: path.normalize(webpackDest), // The output directory as absolute path (required).
      filename: rev ? '[name]-[hash].js' : '[name].js', // Name of each output file on disk (not an absolute path).
      publicPath: publicPath
    },
    plugins: [],
    resolve: {
      extensions: extensions, // An array of extensions that should be used to resolve modules.
      modules: [webpackSrc, path.resolve('./', 'node_modules')],
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

  // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
  if (config.tasks.webpack.provide) {
    webpackConfig.plugins.push(new webpack.ProvidePlugin(config.tasks.webpack.provide));
  }

  if (env === 'production') {
    if (rev) {
      webpackConfig.plugins.push(new WebpackManifest(publicPath, config.root.dest));
    }

    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env),
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  } else {
    webpackConfig.devtool = 'eval-cheap-module-source-map'; // Developer tool to enhance debugging
    webpackConfig.output.pathinfo = true;

    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env),
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      })
    );
  }

  return webpackConfig;
};
