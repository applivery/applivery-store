import * as api from '@/lib/api'
import get from 'lodash/get'

const GENERIC_DOMAINS = ['store.applivery.com', 'localhost']

const state = {
  enterprise: null,
}

const actions = {
  async init({ commit }) {
    const domain = window.__testHostname || window.location.hostname
    if (!~GENERIC_DOMAINS.indexOf(domain)) {
      const enterprise = await api.getEnterprise(domain)
      commit('SET_ENTERPRISE', enterprise)
    }
  },
}

const mutations = {
  SET_ENTERPRISE(state, enterprise) {
    state.enterprise = enterprise
  },
}

const getters = {
  fromAuth(state, getters, rootState) {
    return get(rootState, 'auth.member.organizations[0].member')
  },
  custom(state, getters, rootState, rootGetters) {
    const enterprise = state.enterprise || getters.fromAuth

    const customLogo = get(enterprise, 'enterprise.customLogo')
    const memberId = get(enterprise, '_id')
    const color = get(enterprise, 'enterprise.primaryColor')

    const logo = customLogo ? `https://dashboard.applivery.com/img/enterprise/${memberId}.jpg` : ''

    return { color, logo }
  },
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
