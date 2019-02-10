<template>
  <div>
    <span v-show="!show" @click="show=true">
      <a class="button is-small">
        Show details
      </a>
    </span>
    <div v-show="show">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadMore',
  data: function() {
    return {
      show: false
    }
  }
}
</script>

<style>
</style>
