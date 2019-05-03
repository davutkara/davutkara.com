export const state = () => ({
  lang: 'en'
})

export const mutations = {
  set(state, text) {
    state.lang = text
  }
}
