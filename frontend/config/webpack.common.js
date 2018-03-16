const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath =  path.resolve(path.dirname("./"));
const buildPath = path.resolve(rootPath, "./build");
const assetsPath = path.resolve(rootPath, "./src/assets");
const HTML_TITLE = 'Spoiled Tomatillos';

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '../src/app.js')],
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([buildPath],
        {
          root: rootPath,
          verbose: true,
          dry: false,
        },
    ),
    new CopyWebpackPlugin([
      { from: assetsPath, },
    ]),
    new HtmlWebpackPlugin({
      title: HTML_TITLE,
      template: path.resolve(assetsPath, 'index.html'),
    })
  ],
  output: {
    path: buildPath,
    filename: 'bundle.[chunkhash].js',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
    },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.(svg|png|jpg|gif)$/,
        loader: 'file-loader'
      }],

  },
};
