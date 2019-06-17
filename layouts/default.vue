<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
.main-icerik {
  margin-top: -5em;
  padding-bottom: 1em;
}
.main-icerik > .container {
  padding-bottom: 10em;
}

.main-icerik > .container-plr {
  padding-left: 2em;
  padding-right: 2em;
}
</style>


<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
