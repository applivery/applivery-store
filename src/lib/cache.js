const debug = require('debug')('app:api:cache')
const expireTime = 10 * 60 * 1000
let store = {}

export default async function cache(key, fn) {
  if (!store[key] || Date.now() - store[key].ts > expireTime) {
    debug('miss', key)
    store[key] = {
      value: await fn(),
      ts: Date.now(),
    }
    debug('saved', key, store[key])
  } else {
    debug('hit', key, store[key])
  }

  return store[key].value
}

export function clear() {
  debug('cleared')
  store = {}
}
