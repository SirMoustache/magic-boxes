const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const DIR_SRC = './src';
const DIR_DEST = process.env.dest || 'build';

module.exports = {
  entry: {
    'magic-box': path.resolve(__dirname, DIR_SRC, 'index.js'),
    'magic-box.min': path.resolve(__dirname, DIR_SRC, 'index.js'),
  },
  output: {
    filename: '[name].js',
    library: 'MAGIC',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, DIR_DEST),
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  resolve: {
    modules: [DIR_SRC, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
};
