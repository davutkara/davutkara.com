<template>
  <div>
    <hero title="Davut KARA" subTitle="İnformation Systems Engineer" />
  </div>
</template>

<script>
import hero from '~/components/hero.vue'
export default {
  components: {
    hero
  },
  mounted: function () {
    this.$toast.open({
      duration: 5000,
      message: `Site yapım aşamasındadır.`,
      position: 'is-bottom-right',
      type: 'is-info'
    })
  }
}
</script>
