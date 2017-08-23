const chalk = require('chalk');
const CleanPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

/**
 * Load environment variables from .env
 */

require('dotenv').load();
process.env.NODE_ENV = process.env.NODE_ENV || 'production'; // Production by default

/**
 * Define variables used in configuration
 * Relative files are relative to context (project root)
 */
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEBUG = process.env.APP_DEBUG === 'true';
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = 'bundle';
const OUTPUT_DIR = path.resolve(PROJECT_ROOT, 'build');

/**
 * Entry points for JS / CSS files
 * Add something to here if you want to generate a new bundle. The key will be the filename (in hashed form).
 * The paths are all relative to the project root.
 */
const ENTRY_POINTS = {
  [OUTPUT_FILE]: path.resolve(PROJECT_ROOT, 'src', 'index.js'),
};

/* ====================== Export configuration ====================== */

/**
 * Target: Different for server/client
 */
module.exports.target = 'node';

/**
 * Devtool: For server, we can always use sourcemaps.
 * This devtool is fast, but no column mappings.
 * Comparison: https://webpack.github.io/docs/build-performance.html#sourcemaps
 */
module.exports.devtool = 'eval-cheap-module-source-map';

/**
 * We don't care about filesize on server bundle
 */
module.exports.stats = 'errors-only';
module.exports.performance = { hints: false };

/**
 * Context: Make context be root dir
 */
module.exports.context = PROJECT_ROOT;

/**
 * Watch: We watch for server changes during development
 */

module.exports.watch = !IS_PRODUCTION;

/**
 * Entry: Production uses separate entry points for CSS assets, development has only 1 bundle
 */

module.exports.entry = ENTRY_POINTS;

/**
 * Output
 */

module.exports.output = {
  path: OUTPUT_DIR,
  filename: '[name].js',
  chunkFilename: '[name]-[id].js',
  library: 'hmkit',
  libraryExport: 'default',
  libraryTarget: 'commonjs-module',
};

/**
 * Resolve: We use the project root to import modules in JS absolutely, in addition to node_modules
 */

module.exports.resolve = {
  modules: [process.env.NODE_PATH, 'node_modules'],
  extensions: ['.json', '.js', '.node'],
};

/**
 * Externals: Ignore node_modules in the bundle
 */

module.exports.externals = [
  nodeExternals(),
];

/**
 * Module: Mainly for loaders. Some loaders are shared, others are specific to dev/prod
 */

const sharedRules = [
  // Node
  {
    test: /\.node$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'node-loader',
      },
    ],
  },
];

const developmentRules = [
  // JS
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      'babel-loader', // Conf is in .babelrc
      {
        loader: 'eslint-loader',
        options: { exclude: /node_modules/ },
      },
    ],
  },
];

const productionRules = [
  // JS
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options:
          process.env.APP_DEBUG === 'true'
            ? { compact: false, comments: true, minified: false }
            : { compact: true, comments: false, minified: true },
      },
    ], // Conf is in .babelrc
  },
];

module.exports.module = {
  rules: [
    ...sharedRules,
    ...(IS_PRODUCTION ? productionRules : developmentRules),
  ],
};

/**
 * Plugins: Some plugins are shared, others are specific to dev/prod
 */

module.exports.plugins = [
  /* SHARED PLUGINS */

  // Take only moment locales we need
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /et|ru|en-gb/),
  // Define globals for the bundle. Most config should be defined in bin/server.js's OD_CONFIG.
  // Here we have things that must be known at build-time, and are specific to the client.
  // If you put something here, you should probably also put it in bin/server.js for node.
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __DEVELOPMENT__: !IS_PRODUCTION,
    __PRODUCTION__: IS_PRODUCTION,
    __DEBUG__: process.env.APP_DEBUG === 'true',
  }),
  new webpack.IgnorePlugin(/^(client)\//), // Ignore client-side JS
  ...(IS_PRODUCTION
    ? [
        /* PRODUCTION PLUGINS */
        new CleanPlugin([OUTPUT_DIR], { root: PROJECT_ROOT }), // Clean previously built assets before making new bundle
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/), // Ignore dev config
        ...(!IS_DEBUG ? [
          new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
              warnings: false,
              drop_console: IS_DEBUG,
            },
            mangle: { screw_ie8: true },
            output: { comments: false, screw_ie8: true },
            comments: false,
            sourceMap: false,
          })
        ] : [])
      ]
    : [
        /* DEVELOPMENT PLUGINS */

        new webpack.NamedModulesPlugin(), // Named modules for HMR
        new webpack.NoEmitOnErrorsPlugin(),
        new (require('./BuildDonePlugin'))(
          chalk.green.bold('\n=== Server build done === \n')
        ),
      ]),
];
