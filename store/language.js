export const state = () => ({
  lang:
    process.client && navigator
      ? navigator.language === 'tr'
        ? 'tr'
        : 'en'
      : 'en',
  disabledLang: undefined
})

export const mutations = {
  set(state, text) {
    state.lang = text
  },
  disableLang(state, lang) {
    state.disabledLang = lang
  }
}
