<template>
  <section class="hero is-dark is-bold is-medium">
    <div class="hero-body">
      <div class="container animate has-text-centered">
        <p class="title">
          Davut KARA
        </p>
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

          <a class="button" @click="sendWarning('Under construction.')">
            <span class="icon">
              <i class="mdi mdi-arrow-right-bold" />
            </span>
            <span>Blog</span>
          </a>
        </div>
        <div class="is-clearfix" />
        <div class="buttons is-centered">
          <nuxt-link
            :class="{
              button:true, 
              'is-danger': true,
              'is-outlined': $i18n.locale !== 'en'
            }"
            :to="switchLocalePath('en')"
          >
            English
          </nuxt-link>
          <nuxt-link
            :class="{
              button:true, 
              'is-danger': true,
              'is-outlined': $i18n.locale !== 'tr'
            }"
            :to="switchLocalePath('tr')"
          >
            Türkçe
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeaderCmp',
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

<i18n>
en: 
  job-title:  "Information Systems Engineer"
  resume: "Resume"
  portfolio:  "Portfolio"
tr:
  job-title:  "Bilişim Sistemleri Mühendisi"
  resume: "Özgeçmiş"
  portfolio:  "Portfolyo"
</i18n>
