export const state = () => ({
  lang: navigator ? (navigator.language === 'tr' ? 'tr' : 'en') : 'en'
})

export const mutations = {
  set(state, text) {
    state.lang = text
  }
}
