const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcDir = './src';
const distDir = './dist';
const jsName = 'js/build.[hash].js';
const cssName = 'css/[name].[contenthash].css';
const htmlName = path.resolve(srcDir, 'views/_layout.njk');

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
    new CleanWebpackPlugin(distDir),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin(cssName),
    new HtmlWebpackPlugin({
      template: `${srcDir}/layout.njk`,
      filename: htmlName,
      minify: { collapseWhitespace: true }
    }),
  ]
};
