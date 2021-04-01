const path = require('path');
var webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  devtool: 'eval-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'animated-numbers.js',
    library: 'animated-numbers',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, "dist"),
          to: path.resolve(__dirname, "example")
        },
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
    compress: true,
    port: 1337,
  },
};
