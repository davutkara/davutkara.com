import Vue from 'vue'

const vueWindowSize = {}

vueWindowSize.install = function(Vue, options) {
  const breakpoints = {}
  for (const breakpoint in options) {
    breakpoints[breakpoint] = options[breakpoint](window.innerWidth)
  }
  const state = Vue.observable({
    height: window.innerWidth,
    width: window.screen.height,
    breakpoints
  })

  window.onresize = function(event) {
    /* 
    state.width = window.innerWidth
    state.height = window.screen.height
    */
    Vue.set(state, 'width', window.innerWidth)
    Vue.set(state, 'height', window.screen.height)

    for (const breakpoint in options) {
      Vue.set(
        state.breakpoints,
        breakpoint,
        options[breakpoint](window.innerWidth)
      )
    }
  }

  // 4. add an instance method
  Vue.prototype.$windowSize = state
}

Vue.use(vueWindowSize, {
  xs: x => x < 768,
  sm: x => x >= 768,
  md: x => x >= 992,
  lg: x => x >= 1200
})
