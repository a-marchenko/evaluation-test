const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

const commonConfig = require('./webpack.common');
const commonPaths = require('./paths');

module.exports = merge(commonConfig, {
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: commonPaths.entryPathClient,
  output: {
    filename: `${commonPaths.appFolder}/[name].[hash].js`,
    path: commonPaths.outputPathClient,
    chunkFilename: `${commonPaths.appFolder}/[name].[chunkhash].js`,
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
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 0,
      minRatio: 0.9,
    }),
    new BrotliPlugin({
      filename: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 0, // Only assets bigger than this size (in bytes) are processed
      minRatio: 0.9, // Only assets that compress better that this ratio are processed
    }),
  ],
});
