const state = {
  focusTime: 50,
  shortBreak: 10,
  longBreak: 2,
  autoStart: false
}

const getters = {
  focusTime (state) {
    return state.focusTime
  },

  shortBreak (state) {
    return state.shortBreak
  },

  longBreak (state) {
    return state.longBreak
  },

  autoStart (state) {
    return state.autoStart
  }
}

export const mutations = {
  FOCUS_TIME (state, payload) {
    state.focusTime = payload
  },

  SHORT_BREAK (state, payload) {
    state.shortBreak = payload
  },

  LONG_BREAK (state, payload) {
    state.longBreak = payload
  },

  AUTO_START (state, payload) {
    state.autoStart = payload
  }
}

export const actions = {
  setFocusTime ({ commit }, focusTime) {
    commit('FOCUS_TIME', focusTime)
  },

  setShortBreak ({ commit }, shortBreak) {
    commit('SHORT_BREAK', shortBreak)
  },

  setLongBreak ({ commit }, longBreak) {
    commit('LONG_BREAK', longBreak)
  },

  setAutoStart ({ commit }, autoStart) {
    commit('AUTO_START', autoStart)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
