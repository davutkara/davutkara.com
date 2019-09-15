export default {
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang: async function(lang) {
      if (this.context[lang] !== undefined) return lang

      const data = await this.$axios.$get(`/api/pages/index.${lang}.json`)

      this.$set(this.context, lang, data)

      return lang
    }
  }
}
