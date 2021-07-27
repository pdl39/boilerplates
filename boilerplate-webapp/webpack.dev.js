const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist/assets'),
    historyApiFallback: true,
    hot: true
  }
});
