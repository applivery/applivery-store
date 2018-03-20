import Vue from 'vue'
import Vuex from 'vuex'

import main from './mainModule'
import auth from './authModule'
import fetch from './fetchModule'
import pin from './pinModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: ['pin.pins'],
    }),
  ],
  modules: {
    main,
    auth,
    fetch,
    pin,
  },
})
