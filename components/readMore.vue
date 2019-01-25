<template>
  <div>
    <span @click="show=true" v-show="!show">
      <a class="button is-small">Show details</a>
    </span>
    <div v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "readMore",
  data: function() {
    return {
      show: false
    };
  }
};
</script>

<style>
</style>
