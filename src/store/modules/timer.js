const state = {
  focusTime: 25,
  shortBreak: 5,
  longBreak: 15
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
