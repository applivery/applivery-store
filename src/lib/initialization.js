// import register from 'poi-preset-sw-precache/register-service-worker'
// register()

import Debug from 'debug'

// Clear service workers
navigator.serviceWorker &&
  navigator.serviceWorker.getRegistrations &&
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (const registration of registrations) {
      registration.unregister()
    }
  })

if (process.env.NODE_ENV === 'development') {
  Debug.enable('app*')

  // eslint-disable-next-line
  console.log(
    '%cApplivery Store %c%s',
    'font-size:20px;color:#1d70b7;font-weight:bold',
    'font-weight:bold',
    process.env.VERSION
  )
} else {
  Debug.disable()
  localStorage.removeItem('debug')
}

Debug.badge = (bg, font) => {
  return `font-weight:bold;background-color:${bg ||
    'black'};padding:1px 5px;border-radius:3px; color:${font || 'white'}`
}
