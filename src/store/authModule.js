import * as api from '@/lib/api'
import { clear as clearCache } from '@/lib/cache'
import { getURLParam } from '@/lib/utils'

const state = {
  token: undefined,
  member: undefined,
}

const actions = {
  async init({ commit }) {
    const token = getURLParam('authToken') || window.localStorage.getItem('token')
    if (!token) return commit('CLEAR')

    try {
      const member = await api.getMember(token)
      commit('SET', { token, member })
    } catch (err) {
      commit('CLEAR')
    }
  },
  async login({ commit }, { email, password }) {
    const token = await api.authenticate(email, password)
    const member = await api.getMember(token)
    commit('SET', { token, member })
  },
  logout({ commit }) {
    clearCache()
    commit('main/CLOSE_SIDEBAR', null, { root: true })
    commit('CLEAR')
  },
}

const mutations = {
  SET(state, { member, token }) {
    state.token = token
    state.member = member
    window.localStorage.setItem('token', token)
  },
  CLEAR(state) {
    state.token = null
    state.member = null
    window.localStorage.removeItem('token')
  },
}

const getters = {
  isLogged: state => !!(state.member && state.token),
  memberId: state => state.member && state.member._id,
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
