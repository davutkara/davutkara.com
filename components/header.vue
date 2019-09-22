<template>
  <section class="hero is-dark is-bold is-medium">
    <div class="hero-body">
      <div class="container animate has-text-centered">
        <p class="title">Davut KARA</p>
        <p class="subtitle" v-text="$t('job-title')" />
        <div class="buttons is-centered">
          <router-link :to="localePath('index')" class="button">
            <span class="icon">
              <i class="mdi mdi-shape-plus" />
            </span>
            <span v-text="$t('resume')" />
          </router-link>

          <router-link :to="localePath('portfolio')" class="button">
            <span class="icon">
              <i class="mdi mdi-shape-plus" />
            </span>
            <span v-text="$t('portfolio')" />
          </router-link>

          <router-link :to="localePath('blog')" class="button">
            <span class="icon">
              <i class="mdi mdi-arrow-right-bold" />
            </span>
            <span>Blog</span>
          </router-link>
        </div>
        <div class="is-clearfix" />
        <div class="buttons is-centered">
          <b-tooltip
            label="No english version of the page"
            :active="this.disabledLang === 'en'"
            position="is-bottom"
          >
            <nuxt-link
              :class="{
              button:true, 
              'is-danger': true,
              'is-outlined': $i18n.locale !== 'en'
            }"
              :disabled="this.disabledLang === 'en'"
              :to="switchLocalePath('en')"
            >English</nuxt-link>
          </b-tooltip>
          <b-tooltip
            label="Sayfanın türkçe versiyonu mevcut değil"
            :active="this.disabledLang === 'tr'"
            position="is-bottom"
          >
            <nuxt-link
              :class="{
              button:true, 
              'is-danger': true,
              'is-outlined': $i18n.locale !== 'tr'
            }"
              :disabled="this.disabledLang === 'tr'"
              :to="switchLocalePath('tr')"
            >Türkçe</nuxt-link>
          </b-tooltip>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderCmp',
  computed: {
    ...mapState('language', ['disabledLang'])
  },
  methods: {
    sendWarning: function(text) {
      this.$toast.open({
        duration: 3000,
        message: text,
        position: 'is-bottom-right',
        type: 'is-info'
      })
    }
  }
}
</script>
