<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p v-text="$t('copyright')" />
      <p v-html="$t('how-to-made')" />
      <p v-text="$t('open-source-message')" />
      <a href="https://github.com/davutkara/davutkara.com" target="_blank">
        {{ $t('source-codes') }}
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterCmp'
}
</script>
