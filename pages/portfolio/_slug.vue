<template>
  <div>
    <header-cmp />
    <section class="section main-icerik">
      <div class="container is-narrowed">
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true" />
        <article v-if="!isLoading" class="tile is-child box">
          <p class="title">
            {{ title }}
          </p>
          <p class="subtitle">
            {{ subTitle }}
          </p>
          <!-- eslint-disable-next-line -->
          <div class="content" v-html="content" />
        </article>
      </div>
    </section>
    <footer-cmp />
  </div>
</template>



<script>
import matter from 'gray-matter'
import Markdown from 'markdown-it'
import headerCmp from '~/components/header.vue'
import footerCmp from '~/components/footerCmp.vue'

const md = new Markdown({
  html: true,
  linkify: true,
  typographer: true
})
export default {
  layout: 'resume',
  components: { headerCmp, footerCmp },
  computed: {
    isLoading: function() {
      return this.context[this.lang] === undefined
    },
    lang: function() {
      return this.$store.state.language.lang
    },
    title: function() {
      const title = this.context[this.lang].data.title
      return title
    },
    subTitle: function() {
      const subTitle = this.context[this.lang].data.subTitle
      return subTitle
    },
    hasLanguages: function() {
      const hasLanguages = 'langs' in this.context[this.lang].data
      return hasLanguages
    },
    content: function() {
      const content = this.context[this.lang].content
      return md.render(content)
    }
  },
  watch: {
    lang: async function(lang) {
      if (this.context[lang] !== undefined) return lang
      const { data } = await this.$axios.get(
        `/api/pages/portfolio/${this.lang}/${this.slug}.md`
      )
      this.$set(this.context, lang, matter(data))

      return lang
    }
  },
  async asyncData({ $axios, params, store }) {
    const { data } = await $axios.get(
     `/api/pages/portfolio/${store.state.language.lang}/${params.slug}.md`
    )
    const context = {}
    context[store.state.language.lang] = matter(data)
    return { context, slug: params.slug }
  },
  mounted: function() {
    // eslint-disable-next-line no-console
    console.log(this.context[this.lang])
  }
}
</script>
