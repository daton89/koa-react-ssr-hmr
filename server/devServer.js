const koaWebpack = require('koa-webpack')
const historyApiFallback = require('koa-history-api-fallback')
const webpack = require('webpack')
const webpackConfig = require('../webpack.server')

module.exports = function devServer(app) {
  const compiler = webpack({
    ...webpackConfig,
    stats: {
      modules: false,
      colors: true,
    },
  })

  return new Promise((resolve, reject) => {
    koaWebpack({
      compiler,
      hotClient: {
        port: 0,
        logLevel: 'error',
        hmr: true,
        reload: true,
      },
      devMiddleware: {
        index: 'index.html',
        publicPath: webpackConfig.output.publicPath,
        watchOptions: {
          aggregateTimeout: 0,
        },
        writeToDisk: false,
        stats: {
          modules: false,
          colors: true,
          children: false,
        },
      },
    })
      .then(middleware => {
        app.use(historyApiFallback())
        app.use(middleware)
        middleware.devMiddleware.waitUntilValid(() => {
          console.log('[koa-webpack]: running')
          resolve()
        })
      })
      .catch(err => {
        // logger.error('[koa-webpack]:', err)
        console.error('[koa-webpack]:', err)
        reject()
      })
  })
}
