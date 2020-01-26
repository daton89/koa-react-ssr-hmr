const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base')

const { NODE_ENV } = process.env

const DIST_PATH = path.resolve(__dirname, 'public/dist/node')
const production = NODE_ENV === 'production'
const development = !NODE_ENV || NODE_ENV === 'development'

const target = 'node'

const serverConfig = {
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: ['./client/index.js'],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // { loader: MiniCssExtractPlugin.loader },
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  externals: ['@loadable/component', nodeExternals()],
  output: {
    path: DIST_PATH,
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: '/',
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [
    // new MiniCssExtractPlugin(),
  ],
}

module.exports = webpackMerge(baseConfig, serverConfig)
