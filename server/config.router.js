import Router from 'koa-router'
import { matchRoutes } from 'react-router-config'

import routes from '../client/app/routes'
import configureStore from '../client/app/store/configureStore'
import { getBody } from './ssr'

const router = new Router()

router.get('/*', async ctx => {
  const location = ctx.url

  const branches = matchRoutes(routes, location)

  const { store } = configureStore(location)

  const promises = branches.map(({ route }) => {
    const fetchData = route && route.fetchData

    return fetchData instanceof Function
      ? fetchData(store)
      : Promise.resolve(null)
  })

  await Promise.all(promises)

  const context = {}

  if (context.status === 404) {
    await ctx.status(404)
  }

  if (context.status === 302) {
    await ctx.redirect(302, context.url)
  }

  ctx.body = getBody(location, context, store)
})

module.exports = router
