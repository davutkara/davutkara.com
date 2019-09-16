<template>
  <div>
    <header-cmp />
    <nuxt />
    <footer-cmp />
  </div>
</template>

<style>
.main-icerik {
  margin-top: -5em;
  padding-bottom: 1em;
}
.main-icerik > .container {
  padding-bottom: 10em;
}

.main-icerik > .container-plr {
  padding-left: 2em;
  padding-right: 2em;
}
</style>


<script>
import headerCmp from '@/components/header.vue'
import footerCmp from '@/components/footer.vue'
export default {
  components: { headerCmp, footerCmp },
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  },
  mounted() {
    if (process.client) {
      const html = document.documentElement // returns the html tag
      html.setAttribute('lang', this.$i18n.locale)
    }
  }
}
</script>
