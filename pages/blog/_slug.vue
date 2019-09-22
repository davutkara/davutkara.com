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
                <i class="fa fa-bell-o"></i>
                {{title}}
              </h1>
              <span class="tag is-black is-medium is-rounded">Kişisel Yazılar</span>
            </div>
          </div>
        </section>
        <!-- END PROMO BLOCK -->
        <!-- START ARTICLE -->
        <div class="card article">
          <div class="card-content">
            <div class="content article-body" v-html="content"></div>
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

export default {
  computed: {
    title: function() {
      return this.data.title
    },
    content: function() {
      const content = this.data.content
      return md.render(content)
    }
  },
  async asyncData({ app, $axios, route }) {
    const data = await $axios.$get(
      `/api/content/blog-${app.i18n.locale}/${route.params.slug}.yml`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/x-yaml, text/yaml'
        }
      }
    )
    return { data: yaml.safeLoad(data) }
  }
}
</script>

<style scoped>
.articles {
  margin-top: -8vw;
}
</style>
