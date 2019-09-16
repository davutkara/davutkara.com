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

<i18n>
en:
  copyright: "All the content created by Davut KARA on this website can be used and shared with giving reference."
  open-source-message: "This website supports open source"
  source-codes: "Source Codes" 
  how-to-made: "Made with,
    <strong>NuxtJS</strong>,
    <strong>Buefy</strong>,
    served on
    <strong>Netlify</strong>"
tr:
  copyright: "Bu websitesinde, Davut KARA tarafindan üretilmiş tüm içerikler, referans verilerek kullanılabilir ve paylaşılabilir."
  open-source-message: "Bu websitesi açık kaynaklıdır." 
  source-codes: "Kaynak Kodları" 
  how-to-made: "<strong>NuxtJS</strong>,
    <strong>Buefy</strong>
    kullanıldı
    <strong>Netlify</strong> ile barındırıldı."
</i18n>
