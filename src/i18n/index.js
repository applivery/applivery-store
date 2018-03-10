import Vue from 'vue'
import VueI18n from 'vue-i18n'
import missingHandler from './missingHandler'
import selectLocale from './selectLocale'
import en from './en'
import es from './es'

const availableLocales = ['en', 'es']
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: selectLocale(availableLocales),
  messages: { en, es },
  silentTranslationWarn: false,
  missing: missingHandler,
})

export default i18n

// Support for Hot Reloading
if (module.hot) {
  module.hot.accept(['./en.yml', './es.yml'], function() {
    i18n.mergeLocaleMessage('en', require('./en.yml'))
    i18n.mergeLocaleMessage('es', require('./es.yml'))
  })
}
