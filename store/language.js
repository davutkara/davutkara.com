export const state = () => ({
  lang:
    process.client && navigator
      ? navigator.language === 'tr'
        ? 'tr'
        : 'en'
      : 'en'
})

export const mutations = {
  set(state, text) {
    state.lang = text
  }
}
