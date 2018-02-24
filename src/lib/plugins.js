import Vuetify from 'vuetify'
import moment from 'moment'

moment.locale('en')
export default function loadPlugins(Vue) {
  Vue.use(Vuetify, {
    theme: {
      primary: '#1d70b7',
    },
  })
  Vue.filter('date', (str, format = 'DD MMMM YYYY') => moment(str).format(format))
  // Vue.filter('size', prettyBytes)
}
