export function getSO() {
  const ua = navigator.userAgent
  const urlSO = new URLSearchParams(window.location.search).get('os')

  if (urlSO && ['android', 'ios'].includes(urlSO)) {
    return urlSO
  }

  if (/android/i.test(ua)) {
    return 'android'
  }

  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return 'ios'
  }

  return 'other'
}

export function getURLParam(name) {
  return new URLSearchParams(window.location.search).get(name)
}
