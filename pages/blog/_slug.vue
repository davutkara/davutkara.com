<template>
  <div class="container">
    <!-- START ARTICLE FEED -->
    <section class="articles">
      <div class="column is-8 is-offset-2">
        <!-- START PROMO BLOCK -->
        <section class="hero is-danger is-bold is-small promo-block">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                <i class="fa fa-bell-o" />
                {{ title }}
              </h1>
              <span class="tag is-black is-medium is-rounded">Kişisel Yazılar</span>
            </div>
          </div>
        </section>
        <!-- END PROMO BLOCK -->
        <!-- START ARTICLE -->
        <div class="card article">
          <div class="card-content">
            <div class="content article-body" v-html="content" />
          </div>
        </div>
        <!-- END ARTICLE -->
      </div>
    </section>
    <!-- END ARTICLE FEED -->
  </div>
</template>

<script>
/* eslint-disable  */
const yaml = require('js-yaml')
import Markdown from 'markdown-it'
const md = new Markdown({
  html: true,
  linkify: true,
  typographer: true
})
import { mapMutations } from 'vuex'
const url_parse = require('url-parse')
import { decode as base64_decode } from 'universal-base64'
export default {
  computed: {
    title: function() {
      return this.data.title
    },
    content: function() {
      const content = this.data.content
      return md.render(content)
    },
    englishVersionUrl: function() {
      return this.data.englishVersionUrl
    },
    turkishVersionUrl: function() {
      return this.data.englishVersionUrl
    }
  },
  mounted() {
    if (this.$i18n.locale === 'en') {
      if (this.turkishVersionUrl === undefined) {
        this.disableLang('tr')
      }
    } else if (this.$i18n.locale === 'tr') {
      if (this.englishVersionUrl === undefined) {
        this.disableLang('en')
      }
    }
  },
  async asyncData({ app, $axios, route }) {
    const preview = url_parse($axios.defaults.baseURL + route.fullPath, true)
      .query.preview

    const data = await $axios.$get(
      preview === 'true'
        ? `https://api.github.com/repos/davutkara/davutkara.com/contents/static/api/content/blog-${
            app.i18n.locale
          }/${route.params.slug}.yml?ref=cms%2F${route.params.slug}`
        : `/api/content/blog-${app.i18n.locale}/${route.params.slug}.yml`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: `application/x-yaml,text/yaml,${
            preview === 'true' ? `application/json` : ''
          }`
        }
      }
    )
    let content
    if (preview === 'true') {
      content = base64_decode(data.content)
    } else content = data
    return { data: yaml.safeLoad(content) }
  },
  methods: {
    ...mapMutations('language', ['disableLang'])
  },
  destroyed() {
    this.disableLang(undefined)
  }
}
</script>

<style scoped>
.articles {
  margin-top: -8vw;
}
</style>
