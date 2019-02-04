const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Base Webpack configuration, used by all other configurations for common settings
module.exports = function(env = 'development', argv = {}) {
  const isProduction = env === 'production';

  /**
   * TODO (@imlucas) Support electron-renderer as target.
   */
  const target = (argv && argv.target) || 'web';
  //   const pkg = require(path.join(process.cwd(), 'package.json'));
  const project = {
    path: {
      src: path.join(process.cwd(), 'src')
    }
  };
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(process.cwd(), 'lib'),
      filename: 'index.js',
      publicPath: '/'
    },
    target: target,
    resolve: {
      extensions: ['.js', '.jsx', '.less', '.css'],
      alias: {
        components: path.join(project.path.src, 'components'),
        constants: path.join(project.path.src, 'constants'),
        fonts: 'mongodb-compass-theme/fonts',
        images: path.join(project.path.src, 'assets/images'),
        less: 'mongodb-compass-theme/less',
        models: path.join(project.path.src, 'models'),
        modules: path.join(project.path.src, 'modules'),
        plugin: path.join(project.path.src, 'index.js'),
        stores: path.join(project.path.src, 'stores'),
        utils: path.join(project.path.src, 'utils')
      }
    },
    node: {
      fs: 'empty'
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    externals: isProduction
      ? [
        'execa',
        'fs',
        'prop-types',
        'react',
          // Don't bundle other ui-kit components inside of other components.
        /^@mui\//
      ]
      : ['execa', 'fs'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [{ loader: 'babel-loader' }],
          exclude: /node_modules/
        },
        // For styles that have to be global (see https://github.com/css-modules/css-modules/pull/65)
        {
          test: /\.less$/,
          include: [/global/, /bootstrap/],
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: false
              }
            },
            // {
            //   loader: 'postcss-loader'
            // },
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
          exclude: [/\.global/, /bootstrap/, /node_modules/, /global\.less/],
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: 'compass-aggregations_[name]_[local]'
              }
            },
            {
              loader: 'less-loader',
              options: {
                noIeCompat: true
              }
            }
          ]

          //   return isProduction
          //     ? ExtractTextPlugin.extract({
          //         // Only enable extraction of CSS for non production environments.
          //         disable: !isProduction,
          //         fallback: 'style-loader',
          //         use: useArray
          //       })
          //     : useArray;
          // })()
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              query: {
                limit: 8192,
                name: 'assets/images/[name]__[hash:base64:5].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              query: {
                limit: 8192,
                name: 'assets/fonts/[name]__[hash:base64:5].[ext]'
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: [{ loader: 'raw-loader' }]
        },
        {
          test: /\.node$/,
          use: 'node-loader'
        },
        {
          test: /node_modules[\\\/](JSONStream|rc)[\\\/]index\.js/,
          use: [{ loader: 'shebang-loader' }]
        }
      ]
    },
    plugins: (function() {
      // const GLOBALS = {
      //   'process.env': {
      //     NODE_ENV: isProduction ? 'production' : 'development'
      //   },
      //   __DEV__: isProduction ? 'false' : 'true'
      // };

      const GLOBALS = {
        'process.env.NODE_ENV': '"${process.env.NODE_ENV}"'
      };

      let plugins = [
        // Defines global variables
        new webpack.DefinePlugin(GLOBALS)
      ];

      if (isProduction) {
        plugins = plugins.concat([
          new ExtractTextPlugin('style.css'),
          new webpack.optimize.ModuleConcatenationPlugin()
        ]);
      } else {
        plugins = plugins.concat([
          new webpack.HotModuleReplacementPlugin(),

          // Prints more readable module names in the browser console on HMR updates
          new webpack.NamedModulesPlugin(),

          // Do not emit compiled assets that include errors
          new webpack.NoEmitOnErrorsPlugin()
        ]);
      }

      return plugins;
    })()
  };
};

/**
 * TODO (@imlucas) Support the below loaders if testing.
 */
//
// {
//   test: /\.(js|jsx)/,
//   enforce: 'post', // Enforce as a post step so babel can do its compilation prior to instrumenting code
//   exclude: [/node_modules/, /constants/, /.*?(?=\.spec).*?\.js/],
//   include: project.path.src,
//   use: {
//     loader: 'istanbul-instrumenter-loader',
//     options: {
//       esModules: true
//     }
//   }
// },
// {
//   test: /\.(png|jpg|jpeg|gif|svg)$/,
//   use: [{ loader: 'ignore-loader' }]
// },
// {
//   test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
//   use: [{ loader: 'ignore-loader' }]
// }
