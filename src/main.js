import 'babel-polyfill'
import '@/assets/style/main.scss'
import '@/lib/initialization'

import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import i18n from '@/i18n'
import router from './router'

import loadHooks from '@/lib/hooks'
import loadPlugins from '@/lib/plugins'

loadHooks(Vue, store, router)
loadPlugins(Vue)

const vm = new Vue({
  el: '#app',
  store,
  i18n,
  router,
  render: h => h(App),
})

if (process.env.NODE_ENV === 'development') window.vm = vm
Vue.config.productionTip = false
