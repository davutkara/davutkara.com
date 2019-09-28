<template>
  <div
    :class="{container: true,'container-plr': $windowSize ? $windowSize.breakpoints.sm : true, 'is-narrow':$windowSize ? $windowSize.breakpoints.sm : true }"
  >
    <div class="toTop buttons is-centered">
      <div
        :class="{
          button : true,
          'is-light': true,
          'is-outlined': !selected.includes('ABOUT_IT')
        }"
        @click="select('ABOUT_IT')"
      >
        <span v-text="$t('ABOUT_IT')" />
      </div>

      <div
        :class="{
          button : true,
          'is-light': true,
          'is-outlined': !selected.includes('ABOUT_PERSONAL')
        }"
        @click="select('ABOUT_PERSONAL')"
      >
        <span v-text="$t('ABOUT_PERSONAL')" />
      </div>

      <div
        :class="{
          button : true,
          'is-light': true,
          'is-outlined': !selected.includes('FEED')
        }"
        @click="select('FEED')"
      >
        <span v-text="$t('FEED')" />
      </div>

      <div
        :class="{
          button : true,
          'is-light': true,
          'is-outlined': !selected.includes('QUOTE')
        }"
        @click="select('QUOTE')"
      >
        <span v-text="$t('QUOTE')" />
      </div>
    </div>

    <div class="columns is-multiline">
      <template v-for="({type,title, content, slug, thumbnail, author, links},index) in list">
        <template v-if="selected.includes(type)">
          <div
            v-if="type==='ABOUT_IT' || type === 'ABOUT_PERSONAL'"
            :key="index"
            class="column is-one-third"
          >
            <b-article
              :title="title"
              :description="content"
              :slug="`/${$i18n.locale}/blog/${slug}/`"
              :thumbnail="thumbnail"
            />
          </div>
          <div v-else-if="type==='FEED'" :key="index" class="column is-one-quarter">
            <feed
              :title="title"
              :description="content"
              :author="author"
              :links="links"
              :slug="`/${$i18n.locale}/blog/${slug}/`"
            />
          </div>
          <div v-else-if="type==='QUOTE'" :key="index" class="column">
            <quote
              :title="title"
              :author="author"
              :links="links"
              :slug="`/${$i18n.locale}/blog/${slug}/`"
            />
          </div>
        </template>
      </template>

      <div v-show="list.length < 1 || hasPost < 1" class="column">
        <quote :title="$t('NO_POST')" />
      </div>

      <div v-show="selected.length < 1" class="column">
        <quote :title="$t('CHOOSE_A_CATEGORY')" />
      </div>
    </div>
  </div>
</template>


<script>
import bArticle from '@/components/cards/article.vue'
import feed from '@/components/cards/feed.vue'
import quote from '@/components/cards/quote.vue'

export default {
  components: {
    bArticle,
    feed,
    quote
  },
  layout: 'default',
  nuxtI18n: {
    paths: {
      en: '/blog',
      tr: '/blog'
    }
  },
  data() {
    return {
      selected: ['ABOUT_IT', 'ABOUT_PERSONAL', 'FEED', 'QUOTE']
    }
  },
  computed: {
    hasPost() {
      const posts = this.list.filter(({ type }) => this.selected.includes(type))
      return posts.length
    }
  },
  async asyncData({ app, $axios }) {
    let list = []

    try {
      list = await $axios.$get(
        `/api/content/blog-${app.i18n.locale}/list.json`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    } catch (err) {}

    return { list }
  },
  methods: {
    select(key) {
      if (this.selected.includes(key))
        this.selected.splice(this.selected.indexOf(key), 1)
      else this.selected.push(key)
    }
  }
}
</script>

<style>
.toTop {
  margin-top: -8vw;
}
.tabs li {
  background: white;
}
</style>
