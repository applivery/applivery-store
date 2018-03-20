import Vue from 'vue'

const state = {
  pins: {},
}

const actions = {
  pin({ commit, getters, rootGetters }, app) {
    const member = rootGetters['auth/memberId']

    if (!getters.isPinned(app)) {
      commit('SAVE_PIN', { member, app })
    }
  },
  unpin({ commit, getters, rootGetters }, app) {
    const member = rootGetters['auth/memberId']

    if (getters.isPinned(app)) {
      commit('REMOVE_PIN', { member, app })
    }
  },
  togglePin({ dispatch, getters }, app) {
    if (getters.isPinned(app)) {
      dispatch('unpin', app)
    } else {
      dispatch('pin', app)
    }
  },
}

const mutations = {
  SAVE_PIN(state, { member, app }) {
    if (!state.pins[member]) {
      Vue.set(state.pins, member, [])
    }
    state.pins[member].push(app)
  },

  REMOVE_PIN(state, { member, app }) {
    if (!state.pins[member]) return
    const index = state.pins[member].indexOf(app)

    if (~index) {
      state.pins[member].splice(index, 1)
    }
  },
}

const getters = {
  isPinned(state, getters, rootState, rootGetters) {
    return app => {
      const member = rootGetters['auth/memberId']
      if (!state.pins[member]) return false
      return ~state.pins[member].indexOf(app)
    }
  },
  pinList(state, getters, rootState, rootGetters) {
    const member = rootGetters['auth/memberId']
    return state.pins[member] || []
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
