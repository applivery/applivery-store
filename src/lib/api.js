import axios from 'axios'
import cache from './cache'

const debug = require('debug')('app:api')

const BASE_URL = 'https://dashboard.applivery.com'

const API_URL = BASE_URL + '/api'
// const API_URL = '/api'

// Error response wrapper
export class ApiError extends Error {
  constructor(data) {
    if (!data || typeof data !== 'object') data = {}
    if (!data.msg) data.msg = 'Unkown error'
    data.code |= 0
    if (!data.code) data.code = -1

    super(data.msg)
    this.name = this.constructor.name
    this.code = data.code | 0
    this.data = data
  }
}

// Axios instance
const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    x_client_version: process.env.VERSION,
  },
})

// Intercept request start
// Used for logging and authorization injection
request.interceptors.request.use(config => {
  if (config.token) {
    config.headers.authorization = `Bearer ${config.token}`
  }
  debug('request-start', config.url, config)
  return config
})

// Handle the same way all responses status
request.interceptors.response.use(
  response => handleResponse(null, response),
  err => handleResponse(err, err.response)
)

/**
 * Response handler
 * @param  {Error} err
 * @param  {Object} AJAX response
 * @return {Promise}
 */
function handleResponse(err, response) {
  // Posible network or config errors
  if (!response) response = {}

  if (!response.data) {
    response.data = {
      status: false,
      error: {
        code: -2,
        msg: err && err.message,
      },
    }
  }

  // KO response
  if (!response.data || response.data.status !== true) {
    const errorData = response.data && response.data.error
    debug('response-error', errorData)
    return Promise.reject(new ApiError(errorData))
  }

  // OK Response
  debug('response-ok', response.data.response)
  return response.data.response
  // return new Promise(resolve => {
  // setTimeout(() => resolve(response.data.response), 1500)
  // })
}

export function authenticate(email, password) {
  return request.post('/auth', { email, password }).then(res => res.accessToken)
}

export function getApps(token) {
  return cache(`${token}:getApps`, () =>
    request({
      url: '/apps',
      token,
    })
  )
}

export function getApp(token, appId) {
  return cache(`${token}:getApp:${appId}`, () =>
    request({
      url: `/apps/${appId}`,
      token,
    })
  )
}
export function getBuilds(token, appId) {
  return cache(`${token}:getBuilds:${appId}`, () =>
    request({
      url: `/builds/app/${appId}`,
      token,
    })
  )
}
export function getBuild(token, buildId) {
  return cache(`${token}:getBuild:${buildId}`, () =>
    request({
      url: `/builds/${buildId}`,
      token,
    })
  )
}
export function getMember(token) {
  return cache(`${token}:getMember`, () =>
    request({
      url: `/member`,
      token,
    })
  )
}
export async function getBuildLink(token, buildId, so) {
  if (!~['android', 'ios'].indexOf(so)) {
    return Promise.reject(new Error('Invalid SO parameter'))
  }

  const data = await request({
    url: `/builds/${buildId}/token`,
    token,
  })

  if (so === 'ios') {
    return `itms-services://?action=download-manifest&url=${BASE_URL}/download/${
      data.build
    }/manifest/${data.token}`
  }
  if (so === 'android') {
    return `${BASE_URL}/download/${data.build}/manifest/${data.token}`
  }
}
