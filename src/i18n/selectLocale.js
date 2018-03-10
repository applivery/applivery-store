import {getURLParam} from '@/lib/utils'

/**
 * Return browser languages
 * @return {Array} languages codes
 */
function getBrowserLanguages() {
  if (navigator.languages && navigator.languages.length) {
    // latest versions of Chrome and Firefox set this correctly
    return navigator.languages.slice(0)
  } else if (navigator.userLanguage) {
    // IE only
    return [navigator.userLanguage]
  }
  // latest versions of Chrome, Firefox, and Safari set this correctly
  return [navigator.language]
}


/**
 * Concat user and browser languages
 * @return {Array} Languages codes
 */
function getUserLanguages() {
  const browser = getBrowserLanguages()
  const saved = window.localStorage.getItem('locale')
  const url = getURLParam('lang')
  if (saved) browser.unshift(saved)
  if (url) browser.unshift(url)
  return browser
}

/**
 * Find suitable language
 * @param  {Array} available Languages
 * @return {String} Selected language code
 */
export default function selectLocale(available) {
  const user = getUserLanguages()

  for (const lang of user) {
    if (~available.indexOf(lang)) return lang
  }

  return available[0]
}