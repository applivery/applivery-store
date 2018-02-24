import { sync } from 'vuex-router-sync'

import requiredAuth from './requiredAuth'
import ignition from './ignition'

export default function loadHooks(Vue, store, router) {
  sync(store, router)
  ignition(store, router)
  requiredAuth(store, router)
}
