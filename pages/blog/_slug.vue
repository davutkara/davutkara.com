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
              <span class="tag is-black is-medium is-rounded">{{ $t(type) }}</span>
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
import {
  decode as base64_decode,
  encode as base64_encode
} from 'universal-base64'
import striptags from 'striptags'
import svg from '@/modules/svgGenerate'
import hljs from '@/plugins/highlight-js/index.js'
export default {
  head() {
    return {
      title: this.metaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.metaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://davutkara.com' + this.fullPath
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.metaImage
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:site',
          property: 'twitter:site',
          content: '@bydavutkara'
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: this.metaTitle
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.metaDescription
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.metaImage
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title
        }
      ]
    }
  },
  computed: {
    slug: function() {
      return this.data.slug
    },
    title: function() {
      return this.data.title
    },
    type: function() {
      return this.data.type
    },
    content: function() {
      const content = this.data.content
      if (content) return md.render(content)
    },
    metaTitle() {
      return this.title + ' | Davut KARA'
    },
    metaDescription: function() {
      return striptags(this.content)
        .split(' ')
        .reduce((str, word, i, arr) => {
          if (str.substr(-9) === '#FINISHED') return str
          if (str.length + word.length + 1 < 120) str += word + ' '
          else str += '#FINISHED'
          return str
        }, '')
        .replace('#FINISHED', '...')
        .replace(/[\"\']/g, '')
    },
    englishVersionUrl: function() {
      return this.data.englishVersionUrl
    },
    turkishVersionUrl: function() {
      return this.data.englishVersionUrl
    },
    metaImage() {
      return `https://davutkara.com/images/uploads/generated/${this.slug}.png`
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

    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block)
    })
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
    return {
      data: yaml.safeLoad(content),
      fullPath: `${
        app.i18n.locale !== 'en' ? `/${app.i18n.locale}` : ``
      }/blog/${route.params.slug}`
    }
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
