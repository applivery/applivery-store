import Debug from 'debug'
const debug = Debug('app:ignition')

export default function(store, router) {
  const unregisterStart = router.beforeEach(ignitionStart)
  const unregisterEnd = router.afterEach(ignitionEnd)

  async function ignitionStart(to, from, next) {
    debug('starting')
    try {
      if (store.state.main.so === 'other') {
        const err = new Error('INVALID_OS')
        err.code = -3
        throw err
      }
      await store.dispatch('auth/init')
      unregisterStart()
      debug('success')
      next()
    } catch (err) {
      debug('%cFAILED', Debug.badge('#900', 'white'), err)
      store.commit('main/SET_IGNITION_FAILED', err)
      next(false)
    }
  }

  function ignitionEnd() {
    debug('%cREADY', Debug.badge('#bada55', 'black'))
    store.commit('main/SET_IGNITION_SUCCESS')
    setTimeout(unregisterEnd) // Avoid lose one hook
  }
}
