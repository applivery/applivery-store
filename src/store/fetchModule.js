import * as api from '@/lib/api'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    GET_APPS({ rootState }) {
      return api.getApps(rootState.auth.token)
    },
    GET_APP({ rootState }, appId) {
      return api.getApp(rootState.auth.token, appId)
    },
    GET_BUILD({ rootState }, buildId) {
      return api.getBuild(rootState.auth.token, buildId)
    },
    GET_BUILDS({ rootState }, appId) {
      return api.getBuilds(rootState.auth.token, appId)
    },
    GET_MEMBER({ rootState }) {
      return api.getMember(rootState.auth.token)
    },
    GET_BUILD_LINK({ rootState }, buildId) {
      return api.getBuildLink(rootState.auth.token, buildId, rootState.main.so)
    },
  },
  getters: {},
}
