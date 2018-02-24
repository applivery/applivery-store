import Vue from 'vue'
import Vuex from 'vuex'

import main from './mainModule'
import auth from './authModule'
import fetch from './fetchModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
    auth,
    fetch,
  },
})
