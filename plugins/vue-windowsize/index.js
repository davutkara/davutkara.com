import Vue from 'vue'

const vueWindowSize = {}
vueWindowSize.install = function(Vue, options) {
  if (!process.client) {
    Vue.prototype.$windowSize = null
    return
  }
  const breakpoints = {}
  for (const breakpoint in options) {
    breakpoints[breakpoint] = options[breakpoint](window.innerWidth)
  }
  const state = Vue.observable({
    height: window.screen.height,
    width: window.innerWidth,
    breakpoints
  })

  state.resize = function() {
    Vue.set(state, 'width', window.innerWidth)
    Vue.set(state, 'height', window.screen.height)

    for (const breakpoint in options) {
      Vue.set(
        state.breakpoints,
        breakpoint,
        options[breakpoint](window.innerWidth)
      )
    }
    return true
  }

  window.onresize = state.resize

  // 4. add an instance method
  Vue.prototype.$windowSize = state

  Vue.mixin({
    mounted() {
      if (process.client && this.$windowSize.resize()) this.$forceUpdate()
    }
  })
}

Vue.use(vueWindowSize, {
  xs: x => x < 768,
  sm: x => x >= 768,
  md: x => x >= 992,
  lg: x => x >= 1200
})
