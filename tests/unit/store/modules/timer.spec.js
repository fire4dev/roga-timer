import { mutations, actions } from '@/store/modules/timer'

// Destruct mutations
const { FOCUS_TIME, SHORT_BREAK, LONG_BREAK } = mutations

// Mock context for testing actions
const context = {
  commit: jest.fn().mockImplementation((type, payload) => {
    mutations[type](context.state, payload)
  }),

  state: {}
}

describe('Vuex timer module', () => {
  describe('mutations', () => {
    it('MUTATES FOCUS TIME', () => {
      const state = { focusTime: 25 }
      FOCUS_TIME(state, 50)
      expect(state.focusTime).toBe(50)
    })

    it('MUTATES SHORT BREAK', () => {
      const state = { shortBreak: 5 }
      SHORT_BREAK(state, 10)
      expect(state.shortBreak).toBe(10)
    })

    it('MUTATES LONG BREAK', () => {
      const state = { longBreak: 15 }
      LONG_BREAK(state, 10)
      expect(state.longBreak).toBe(10)
    })
  })

  describe('actions', () => {
    it('set focus time', () => {
      actions.setFocusTime(context, 30)
      expect(context.commit).toHaveBeenCalled()
      expect(context.state.focusTime).toBe(30)
      context.commit.mockClear()
    })

    it('set short break', () => {
      actions.setShortBreak(context, 5)
      expect(context.commit).toHaveBeenCalled()
      expect(context.state.shortBreak).toBe(5)
      context.commit.mockClear()
    })

    it('set long break', () => {
      actions.setLongBreak(context, 15)
      expect(context.commit).toHaveBeenCalled()
      expect(context.state.longBreak).toBe(15)
      context.commit.mockClear()
    })
  })
})
