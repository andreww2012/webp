const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const srcDir = './src';
const distDir = './dist';
const jsName = 'js/build.[hash].js';
const cssName = 'css/[name].[contenthash].css';
const htmlName = path.resolve(srcDir, 'views/_layout.njk');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: `${srcDir}/app.js`,

  output: {
    path: path.resolve(__dirname, distDir),
    publicPath: '/',
    filename: jsName
  },

  module: {
    rules: [
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'resolve-url-loader',
            options: { root: srcDir, sourceMap: true }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }]
        })
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(distDir),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin(cssName),
    new HtmlWebpackPlugin({
      template: `${srcDir}/layout.njk`,
      filename: htmlName,
      minify: { collapseWhitespace: true }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    noInfo: true,
    quiet: true,
    compress: true,
    // enables HMR without page refresh as fallback in case of build failures
    hot: true,
    hotOnly: true,
    // opens the browser
    open: true,
    overlay: true,
    progress: true,
    proxy: {
      '/': `http://localhost:${config.port}`
    }
  },

  performance: {
    hints: false
  },

  devtool: isProduction ? 'none' : '#cheap-inline-module-source-map'
};

// Production section

if (isProduction) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
