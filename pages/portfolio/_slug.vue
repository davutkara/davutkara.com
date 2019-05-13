<template>
  <div>
    <header-cmp/>
    <section class="section main-icerik">
      <div class="container is-narrowed">
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <article class="tile is-child box" v-if="!isLoading">
          <p class="title">{{title}}</p>
          <p class="subtitle">{{subTitle}}</p>
          <div class="content" v-html="content"></div>
        </article>
      </div>
    </section>
    <footer-cmp/>
  </div>
</template>

<style>
.main-icerik {
  margin-top: -7em;
  padding-bottom: 1em;
}
.main-icerik > .container {
  padding: 2em 2em 10em 2em;
}
</style>


<script>
import headerCmp from '~/components/header.vue'
import footerCmp from '~/components/footerCmp.vue'
import matter from 'gray-matter'
import Markdown from 'markdown-it'
import markdownItMermaid from 'markdown-it-mermaid'
const md = new Markdown()
md.use(markdownItMermaid)
export default {
  layout: 'resume',
  components: { headerCmp, footerCmp },
  async asyncData({ $axios, params, store }) {
    const { data } = await $axios.get(
      `https://${window.location.hostname}/api/pages/portfolio/${
        store.state.language.lang
      }/${params.slug}.md`
    )
    const context = {}
    context[store.state.language.lang] = matter(data)
    return { context, slug: params.slug }
  },
  watch: {
    lang: async function(lang) {
      if (this.context[lang] !== undefined) return lang
      const { data } = await this.$axios.get(
        `https://${window.location.hostname}/api/pages/portfolio/${this.lang}/${
          this.slug
        }.md`
      )
      this.$set(this.context, lang, matter(data))

      return lang
    }
  },
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
  mounted: function() {
    // eslint-disable-next-line no-console
    console.log(this.context[this.lang])
  }
}
</script>
