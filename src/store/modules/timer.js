const state = {
  focusTime: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStart: true,
  currentState: 'focus'
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
  },

  currentState (state) {
    return state.currentState
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
  },

  CURRENT_STATE (state, payload) {
    state.currentState = payload
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
  },

  setCurrentState ({ commit }, payload) {
    commit('CURRENT_STATE', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
