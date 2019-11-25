import Vue from 'vue'
import Vuex from 'vuex'
import timer from './modules/timer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    focusColor: 'red',
    shortbreakColor: 'light-blue',
    longbreakColor: 'green'
  },
  getters: {
    drawer (state) {
      return state.drawer
    }
  },
  mutations: {
    DRAWER (state, payload) {
      state.drawer = payload
    }
  },
  actions: {
    setDrawer (context, payload) {
      context.commit('DRAWER', payload)
    }
  },
  modules: {
    timer
  }
})
