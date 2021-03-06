const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'client', 'index.js')
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.json'],
    mainFiles: ['index'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/i,
        use: ["html-loader"]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'dist/src/index.html')
    })
  ]
}
