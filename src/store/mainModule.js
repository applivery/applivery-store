import { getSO } from '@/lib/utils'

const state = {
  so: getSO(),
  sidebarVisible: false,
  ignition: {
    state: 'pending',
    error: null,
  },
}
const mutations = {
  SET_IGNITION_SUCCESS(state) {
    state.ignition.state = 'success'
  },
  SET_IGNITION_FAILED(state, err) {
    state.ignition.state = 'failed'
    state.ignition.error = err
  },
  OPEN_SIDEBAR(state) {
    state.sidebarVisible = true
  },
  CLOSE_SIDEBAR(state) {
    state.sidebarVisible = false
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
