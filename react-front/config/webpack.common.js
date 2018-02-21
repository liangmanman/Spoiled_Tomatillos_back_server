const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
   entry: path.join(__dirname, '../src/app.js'),
   devtool: 'inline-source-map',
   plugins: [
     new CleanWebpackPlugin(['../dist'])
   ],
   output: {
     path: path.join(__dirname, '../dist'),
     filename: 'bundle.js'
   },
   module: {
     rules: [{
       loader: 'babel-loader',
       test: /\.js$/,
       exclude: /node_modules/
     }]
   }
};
