const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const project = require('./project');

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
};

module.exports = {
  target: 'electron-renderer',
  devtool: 'source-map',
  entry: {
    // Export the entry to our plugin. Referenced in package.json main.
    index: path.resolve(project.path.src, 'index.js')
  },
  output: {
    path: project.path.output,
    publicPath: './',
    filename: '[name].js',
    // Export our plugin as a UMD library (compatible with all module definitions - CommonJS, AMD and global variable)
    library: 'AggregationsPlugin',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', 'less'],
    alias: {
      components: path.join(project.path.src, 'components'),
      constants: path.join(project.path.src, 'constants'),
      fonts: path.join(project.path.src, 'assets/fonts'),
      images: path.join(project.path.src, 'assets/images'),
      less: path.join(project.path.src, 'assets/less'),
      models: path.join(project.path.src, 'models'),
      modules: path.join(project.path.src, 'modules'),
      reducers: path.join(project.path.src, 'reducers'),
      'action-creators': path.join(project.path.src, 'action-creators'),
      plugin: path.join(project.path.src, 'index.js'),
      stores: path.join(project.path.src, 'stores'),
      storybook: project.path.storybook,
      utils: path.join(project.path.src, 'utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      // For styles that have to be global (see https://github.com/css-modules/css-modules/pull/65)
      {
        test: /\.less$/,
        include: [/\.global/, /bootstrap/],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  project.plugin.autoprefixer
                ];
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          }
        ]
      },
      // For CSS-Modules locally scoped styles
      {
        test: /\.less$/,
        exclude: [/\.global/, /bootstrap/, /node_modules/],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: 'AggregationsPlugin_[name]-[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  project.plugin.autoprefixer
                ];
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          }
        ]
      },
      {
        test: /node_modules[\\\/]JSONStream[\\\/]index\.js/,
        use: [{ loader: 'shebang-loader' }]
      },
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /(node_modules)/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          // In prod we need to go to $COMPASS_HOME/node_modules/<plugin>/lib or
          // $USER_HOME/.mongodb/compasss(-community)/plugins
          //
          // @note This currently does not work in published plugin.
          query: {
            name: 'assets/images/[name]__[hash:base64:5].[ext]',
            publicPath: function(file) {
              return path.join(__dirname, '..', 'lib', file);
            }
          }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          // In prod we need to go to $COMPASS_HOME/node_modules/<plugin>/lib or
          // $USER_HOME/.mongodb/compasss(-community)/plugins
          //
          // @note This currently does not work in published plugin.
          query: {
            name: 'assets/images/[name]__[hash:base64:5].[ext]',
            publicPath: function(file) {
              return path.join(__dirname, '..', 'lib', file);
            }
          }
        }]
      }
    ]
  },
  plugins: [
    // Auto-create webpack externals for any dependency listed as a peerDependency in package.json
    // so that the external vendor JavaScript is not part of our compiled bundle
    new PeerDepsExternalsPlugin(),

    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Configure Extract Plugin for dependent global styles into a single CSS file
    new ExtractTextPlugin({
      filename: 'assets/css/index.css',
      allChunks: true,
      ignoreOrder: true // When using CSS modules import order of CSS no longer needs to be preserved
    }),

    // Defines global variables
    new webpack.DefinePlugin(GLOBALS),

    // Creates HTML page for us at build time
    new HtmlWebpackPlugin(),

    // An ES6+ aware minifier, results in smaller output compared to UglifyJS given that
    // Chromium in electron supports the majority of ES6 features out of the box.
    new MinifyPlugin()

    // Uncomment to Analyze the output bundle size of the plugin. Useful for optimizing the build.
    // new BundleAnalyzerPlugin()
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
};
