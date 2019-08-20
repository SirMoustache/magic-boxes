const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const DIR_SRC = './src';
const DIR_DEST = process.env.dest || 'build';

module.exports = {
  entry: {
    'magic-boxes': path.resolve(__dirname, DIR_SRC, 'index.ts'),
    'magic-boxes.min': path.resolve(__dirname, DIR_SRC, 'index.ts'),
  },
  output: {
    filename: '[name].js',
    library: 'MB',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, DIR_DEST),
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
      }),
      // new UglifyJsPlugin({
      //   include: /\.min\.js$/,
      // }),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [DIR_SRC, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
};
