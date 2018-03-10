const debug = require('debug')('app:i18n')
const notified = {}

export default function(lang, key) {
  if (!debug.enabled || notified[key]) return
  notified[key] = true
  debug('missing', key)
}
