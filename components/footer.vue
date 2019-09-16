<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p v-text="$t('copyright')" />
      <p v-dompurify-html="$t('how-to-made')" />
      <p v-text="$t('open-source-message')" />
      <a href="https://github.com/davutkara/davutkara.com" target="_blank">{{ $t('source-codes') }}</a>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
Vue.use(VueDOMPurifyHTML, { default: { ALLOWED_TAGS: ['strong'] } })

export default {
  name: 'FooterCmp'
}
</script>
