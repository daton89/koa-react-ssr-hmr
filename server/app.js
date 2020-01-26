/* eslint-disable no-unused-expressions */

const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const favicon = require('koa-favicon')

const router = require('./config.router')

const app = new Koa()

module.exports = {
  listen: (port = 3000, cb) => {
    const server = app.listen(port, '0.0.0.0')
    console.info(`Koa listening on port ${port}`)
    if (process.env.NODE_ENV === 'development') {
      console.info(`visit: http://localhost:${port}`)
    }
    cb(server)
  },
  create: async () => {
    app.use(favicon())
    app.use(serve(path.join(__dirname, '../public')))
    app.use(bodyParser({ jsonLimit: '56kb' }))

    if (process.env.ENABLE_SSR === '1') {
      console.log('[ENABLE_SSR]:', process.env.ENABLE_SSR)
      // eslint-disable-next-line global-require
      const devServer = require('./devServer')
      await devServer(app)
    }

    app.use(router.routes())
    return Promise.resolve(app)
    // logger.info(`${isHMREnabled ? 'HMR & ' : ''}Koa App initialized!`);
  },
}
