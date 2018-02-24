export function getSO() {
  const ua = navigator.userAgent

  if (/android/i.test(ua)) {
    return 'android'
  }

  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return 'ios'
  }

  // return 'android'
  return 'other'
}
