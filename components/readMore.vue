<template>
  <div>
    <span v-show="!show" @click="show=true">
      <a class="button is-small">Show details</a>
    </span>    
    <!-- eslint-disable-next-line -->
    <div v-show="show" v-html="content" />
  </div>
</template>

<script>
export default {
  name: 'ReadMore',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      show: false
    }
  }
}
</script>

<style>
</style>
