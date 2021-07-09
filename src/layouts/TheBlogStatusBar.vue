<template>
  <div id="status-bar">
    Copyright Davut KARA 2021

    <button @click="invert">C</button>
  </div>
</template>

<script>
export default {
  methods: {
    invert() {
      const html = document.querySelector("html");
      //  html.dataset.theme = `theme-light`;

      html.dataset.theme = html.dataset.theme === `dark` ? 'light' : 'dark';
    },
  },
};
</script>

<style lang="scss" scoped>
#status-bar {
  position: absolute;
  text-align: left;
  bottom: 0;
  width: calc(100vw - 255px);
  height: 1em;
  background: var(--color-bg-deep);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  color: rgb(255, 255, 255);
  padding: 8px;
  font-size: 12px;
}
</style>