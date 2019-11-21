import { createLocalVue, mount } from '@vue/test-utils'
import store from '@/store'
import Vuex from 'vuex'
import Timer from '@/views/Timer.vue'

describe('Timer.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  it('check inital times status', () => {
    const wrapper = mount(Timer, {
      store,
      localVue
    })
    expect(wrapper.vm.inFocusTime).toBe(true)
    expect(wrapper.vm.inBreakTime).toBe(false)
    expect(wrapper.vm.inLongBreakTime).toBe(false)
  })

  it('check forward initial focus time', () => {
    const wrapper = mount(Timer, {
      store,
      localVue
    })
    wrapper.vm.forwardTimer()
    expect(wrapper.vm.inFocusTime).toBe(false)
    expect(wrapper.vm.inBreakTime).toBe(true)
    expect(wrapper.vm.inLongBreakTime).toBe(false)
  })
})
