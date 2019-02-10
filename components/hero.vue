<template>
  <section class="hero is-dark is-bold is-medium">
    <div class="hero-body">
      <div class="container animate has-text-centered">
        <p class="title">{{title}}</p>
        <p class="subtitle">{{subTitle}}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['title', 'subTitle']
}
</script>

<style>
</style>
