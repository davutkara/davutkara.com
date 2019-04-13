<template>
  <div>
    <header-cmp/>
    <section class="section main-icerik">
      <div class="container is-narrowed">
        <article class="tile is-child box">
          <p class="title">Health Calcula</p>
          <p class="subtitle">A wordpress plugin consist of calculations related with health.</p>
          <div class="content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
            <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
            <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
          </div>
        </article>
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
