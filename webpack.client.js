const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')

const baseConfig = require('./webpack.base')

const PORT = process.env.DEV_SERVER_PORT || 3000
const PROXY_SERVER_PORT = process.env.PROXY_SERVER_PORT || 3001

const config = {
  context: path.resolve(__dirname, './client'),
  target: 'web',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    './index.js',
  ],
  devServer: {
    proxy: {
      '**': {
        target: `http://localhost:${PROXY_SERVER_PORT}`,
        secure: false,
      },
    },
    port: PORT,
    inline: true,
    historyApiFallback: true,
    hot: true,
    stats: { colors: true, children: false },
  },
  output: {
    path: path.join(__dirname, './public/dist/client'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new LoadablePlugin({
      filename: 'loadable-stats.json',
      writeToDisk: {
        filename: path.join(__dirname, 'public/dist/client'),
      },
    }),
  ],
}

module.exports = merge(baseConfig, config)
