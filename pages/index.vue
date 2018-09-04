<template>
<section class="hero is-dark is-bold is-large">

  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">
        Davut KARA
      </p>
      <p class="subtitle">
        Information Systems Engineer
      </p>
    </div>
  </div>

  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li class="is-active">
            <a>Yapım Aşamasında</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</section>
</template>

<script>
export default {
  components: {

  },
  mounted: function () {
    this.$toast.open({
      duration: 5000,
      message: `Site yapım aşamasındadır.`,
      position: 'is-top',
      type: 'is-info'
    })
  }
}
</script>
