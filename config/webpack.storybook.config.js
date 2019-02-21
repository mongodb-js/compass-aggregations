const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const baseWebpackConfig = require('./webpack.base.config');
const project = require('./project');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  },
  jQuery: require('jquery'),
  __DEV__: JSON.stringify(JSON.parse('true'))
};

const config = {
  target: 'web',
  devtool: 'eval-source-map',
  entry: {
    index: path.resolve(project.path.src, 'index.js')
  },
  output: {
    path: project.path.output,
    publicPath: '/',
    filename: '[name].js'
  },
  node: {
    fs: 'empty'
  },
  externals: [nodeExternals(), 'electron', 'antlr4'],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Creates HTML page for us at build time
    new HtmlWebpackPlugin(),

    // Defines global variables
    new webpack.DefinePlugin(GLOBALS)
  ]
};

module.exports = merge.smart(baseWebpackConfig, config);
