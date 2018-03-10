import Vue from 'vue'
import VueI18n from 'vue-i18n'
import missingHandler from './missingHandler'
import en from './en'
import es from './es'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: { en, es },
  silentTranslationWarn: false,
  missing: missingHandler,
})

export default i18n

// Support for Hot Reloading
if (module.hot) {
  module.hot.accept(['./en.yml'], function () {
    i18n.mergeLocaleMessage('en', require('./en.yml'))
  })
}
