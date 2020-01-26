// eslint-disable-next-line import/no-extraneous-dependencies
// require('dotenv').config()
require('../config/babel.register')

function setGlobalScope(scope) {
  global[scope] = {}
}

setGlobalScope('window')

const app = require('./app')
const { port } = require('./config.base')

/**
 * Initialize koa app and start server
 */
app.listen(port, async () => {
  await app.create()
})
