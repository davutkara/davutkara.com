<template>
  <section class="hero is-dark is-bold is-medium">
    <div class="hero-body">
      <div class="container animate has-text-centered">
        <p class="title">Davut KARA</p>
        <p class="subtitle">Information Systems Engineer</p>

        <router-link to="/" class="button">
          <span class="icon">
            <i class="mdi mdi-shape-plus"/>
          </span>
          <span>CV</span>
        </router-link>

        <router-link to="/portfolio" class="button">
          <span class="icon">
            <i class="mdi mdi-shape-plus"/>
          </span>
          <span>Portfolio</span>
        </router-link>

        <a class="button" @click="sendWarning('Under construction.')">
          <span class="icon">
            <i class="mdi mdi-arrow-right-bold"/>
          </span>
          <span>Blog</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'headerCmp',
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

<style>
</style>
