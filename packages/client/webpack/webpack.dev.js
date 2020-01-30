const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const commonConfig = require('./webpack.common');
const commonPaths = require('./paths');

module.exports = merge(commonConfig, {
  mode: 'development',
  name: 'client',
  target: 'web',
  entry: commonPaths.entryPathClient,
  output: {
    filename: `${commonPaths.appFolder}/[name].js`,
    path: commonPaths.outputPathClient,
    chunkFilename: `${commonPaths.appFolder}/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|(o|t)tf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: false,
  },
  devServer: {
    contentBase: commonPaths.outputPathClient,
    https: false,
    hot: true,
    historyApiFallback: true,
    port: 9000,
  },
  devtool: 'eval-source-map',
  plugins: [new CleanWebpackPlugin(), new HardSourceWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
});
