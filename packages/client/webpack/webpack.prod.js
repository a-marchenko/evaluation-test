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
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
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
