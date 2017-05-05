const config = require('../config');

if (!config.tasks.javascripts) {
  process.exit(0);
}

const path = require('path');
const pathToUrl = require('./pathToUrl');
const webpack = require('webpack');
const WebpackManifest = require('./webpackManifest');

module.exports = function webpackMultiConfig(env) {
  const jsSrc = path.resolve(config.root.src, config.tasks.javascripts.src);
  const jsDest = path.resolve(config.root.dest, config.tasks.javascripts.dest);
  const publicPath = pathToUrl(config.tasks.javascripts.dest, '/');

  const extensions = config.tasks.javascripts.extensions.map(extension => `.${extension}`);

  const rev = config.tasks.production.rev && env === 'production';

  const webpackConfig = {
    context: jsSrc,
    entry: config.tasks.javascripts.entries,
    output: {
      path: path.normalize(jsDest), // The output directory as absolute path (required).
      filename: rev ? '[name]-[hash].js' : '[name].js', // Name of each output file on disk (not an absolute path).
      publicPath
    },
    externals: {
      jquery: 'jQuery',
      wowjs: 'WOW'
    },
    plugins: [],
    resolve: {
      extensions, // An array of extensions that should be used to resolve modules.
      modules: [jsSrc, path.resolve('./', 'node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [{
            loader: 'ts-loader',
            options: {
              configFileName: 'tsconfig.webpack.json',
            }
          }]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'raw-loader',
        }
      ]
    }
  };

  // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
  if (config.tasks.javascripts.provide) {
    webpackConfig.plugins.push(new webpack.ProvidePlugin(config.tasks.javascripts.provide));
  }

  webpackConfig.plugins.push(

    // use to define environment constables that you can reference within the application.
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env),
      'process.env.NODE_ENV': JSON.stringify(env)
    }),

    // stops the build if there is an error.
    new webpack.NoEmitOnErrorsPlugin()
  );

  if (env === 'production') {
    if (rev) {
      webpackConfig.plugins.push(new WebpackManifest(publicPath, config.root.dest));
    }

    webpackConfig.plugins.push(
      // minifies the bundles.
      new webpack.optimize.UglifyJsPlugin()
    );
  } else {
    webpackConfig.devtool = 'eval-cheap-module-source-map'; // Developer tool to enhance debugging
    webpackConfig.output.pathinfo = true;
  }

  return webpackConfig;
};
