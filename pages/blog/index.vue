<template>
  <div
    :class="{toTop:true,container: true,'container-plr': $windowSize ? $windowSize.breakpoints.sm : true, 'is-narrow':$windowSize ? $windowSize.breakpoints.sm : true }"
  >
    <!-- 
    <div class="toTop buttons is-centered">
      <div
        v-for="(type,i) in ['ABOUT_IT','ABOUT_PERSONAL','FEED','QUOTE']"
        :key="i"
        :class="{
          button : true,
          'is-light': true,
          'is-outlined': !selected.includes(type)
        }"
        @click="select(type)"
      >
        <span v-text="$t(type)" />
      </div>
    </div>
    -->
    <template v-for="({title,list},li) in blogList">
      <h2 :key="li" :class="`title is-2 ${li===0? 'has-text-white': ''}`" v-text="title" />
      <div :key="li" class="columns is-multiline">
        <template
          v-for="({type,title, content, slug, thumbnail, author, links,date},index) in list"
        >
          <div
            v-show="selected.includes(type)"
            :key="index"
            :class="{column: true , 
                     'is-one-third' : index>=0,
                     // 'is-one-third' : (type==='ABOUT_IT' || type === 'ABOUT_PERSONAL'),
                     // 'is-one-quarter' : type==='FEED'               
            }"
          >
            <!-- Dynamic Component -->
            <component
              :is="getComponentByThePostType(type)"
              :title="title"
              :description="content"
              :author="author"
              :links="links"
              :slug="`${$route.path}/${slug}/`"
              :thumbnail="`https://davutkara.com/images/uploads/generated/${slug}.png`"
              :date="date"
            />
          </div>
        </template>

        <div v-show="list.length < 1 || hasPost < 1" class="column">
          <quote :title="$t('NO_POST')" />
        </div>

        <div v-show="selected.length < 1" class="column">
          <quote :title="$t('CHOOSE_A_CATEGORY')" />
        </div>
      </div>
    </template>
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
    },
    aboutPersonalList() {
      return this.list.filter(({ type }) => type === 'ABOUT_PERSONAL')
    },
    aboutITList() {
      return this.list.filter(({ type }) => type === 'ABOUT_IT')
    },
    feedList() {
      return this.list.filter(({ type }) => type === 'FEED')
    },
    quoteList() {
      return this.list.filter(({ type }) => type === 'QUOTE')
    },
    blogList() {
      return [
        {
          title: this.$t('ABOUT_IT'),
          list: this.aboutITList
        },
        {
          title: this.$t('ABOUT_PERSONAL'),
          list: this.aboutPersonalList
        },
        {
          title: this.$t('FEED'),
          list: this.feedList
        },
        {
          title: this.$t('QUOTE'),
          list: this.quoteList
        }
      ]
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
      list = list.sort((post1, post2) => {
        const time1 = new Date(post1.date).getTime()
        const time2 = new Date(post2.date).getTime()
        return time2 - time1
      })
    } catch (err) {}

    return { list }
  },
  methods: {
    select(key) {
      if (this.selected.includes(key))
        this.selected.splice(this.selected.indexOf(key), 1)
      else this.selected.push(key)
    },
    getComponentByThePostType(type) {
      return type === 'ABOUT_IT' || type === 'ABOUT_PERSONAL'
        ? 'b-article'
        : type === 'FEED'
          ? 'feed'
          : 'quote'
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
