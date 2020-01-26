require('dotenv').config()

if (process.env.NODE_ENV === 'development') {
  require('../config/babel.register')
}

function initGlobalScope(scope) {
  global[scope] = {}
}

initGlobalScope('window')

const app = require('./app')
const { port } = require('./config.base')

/**
 * Initialize koa app and start server
 */
app.listen(port, async () => {
  await app.create()
})
