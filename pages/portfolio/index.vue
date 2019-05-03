<template>
  <div>
    <header-cmp/>
    <section class="section main-icerik">
      <div class="container is-narrowed">
        <div class="box" v-for="i in [0,1,2,3,4,5]" :key="i">
          <div class="columns">
            <div class="column is-one-fifth">
              <img src="https://via.placeholder.com/252x137">
            </div>
            <router-link to="/portfolio/health-calcula" title="Click for details">
              <div class="column">
                <p class="title">Health Calcula</p>
                <p class="subtitle">A wordpress plugin consist of calculations related with health.</p>
                <div class="tags has-addons">
                  <span class="tag is-dark">2019</span>
                  <span class="tag is-link">Nisan</span>
                  <span class="tag is-light">Wordpress</span>
                  <span class="tag is-light">Plugin</span>
                  <span class="tag is-light">Portfolio</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <footer-cmp/>
  </div>
</template>

<style>
.main-icerik {
  margin-top: -7em;
  padding-bottom: 1em;
}
.main-icerik > .container {
  padding: 2em 2em 10em 2em;
}
</style>


<script>
import headerCmp from '~/components/header.vue'
import footerCmp from '~/components/footerCmp.vue'
export default {
  layout: 'resume',
  components: { headerCmp, footerCmp }
}
</script>
