const debug = require('debug')('orx:sync-logged-view')

export default function(store, router) {
  let exitedFrom = null
  const login = { name: 'login' }
  const home = { name: 'list' }

  async function requiredAuth(to, from, next) {
    // Redirect to non auth route
    if (
      !store.getters['auth/isLogged'] &&
      to.matched.some(route => route.meta.requiredAuth === true)
    ) {
      debug('redirect-to-login')

      exitedFrom = to.fullPath

      // Cancel this routing and replace with unlogged entry point
      next(false)
      router.replace(login)
      return
    }

    // Redirect to auth route
    if (
      store.getters['auth/isLogged'] &&
      to.matched.some(route => route.meta.requiredAuth === false)
    ) {
      // Cancel this routing and replace with logged entry point
      debug('redirect-to-home')
      next(false)
      router.replace(exitedFrom || home)
      exitedFrom = null
      return
    }
    next()
  }

  // Watch for logged changes
  store.watch(
    state => state.auth.member,
    (curr, prev) => {
      if (prev !== undefined) {
        debug('member-state-changed')
        requiredAuth(router.currentRoute, null, () => {})
      }
    }
  )

  router.beforeEach(requiredAuth)
}
