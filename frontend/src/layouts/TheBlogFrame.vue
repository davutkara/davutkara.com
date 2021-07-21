<template>
  <section id="text-bar">
    <the-blog-frame-tabs />
    <router-view-extends-async />
    <the-blog-status-bar />
  </section>
</template>

<script>
import TheBlogFrameTabs from "./TheBlogFrameTabs";
import RouterViewExtendsAsync from "@/components/RouterViewExtendsAsync.vue";
import TheBlogStatusBar from "./TheBlogStatusBar";
export default {
  components: { TheBlogFrameTabs, RouterViewExtendsAsync, TheBlogStatusBar },
};
</script>

<style lang="scss" scoped>
section#text-bar {
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.25);
  background: var(--color-bg-deep);
  height: 100vh;
  //width: calc(100vw - 255px);
  flex-grow: 1;
  float: left;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-color: #79797c7c var(--color-bg-middle);

  /** To escape scoped /deep/ ::v-deep or >>> */
  &:deep() article {
    margin: 1em;
    border-left: 1px solid #ffffff20;
    padding: 0.5em 1em;
    text-align: justify;
    @media only screen and (max-width: 800px) {
      text-align: left;
    }
    color: var(--color-bg-text);

    &:last-child, &:only-of-type{
      padding-bottom: 4em;
    }

    p {
      max-width: 600px;
      @media only screen and (max-width: 1000px) {
        max-width: 100%;
      }
      line-height: 1.25em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin-bottom: 0.75em;
    }

    h1 {
      font-size: 32px;
      font-weight: 800;
    }

    h2 {
      font-size: 28px;
      font-weight: 700;
    }

    h3 {
      font-size: 24px;
      font-weight: 600;
    }

    h4 {
      font-size: 22px;
      font-weight: 500;
    }

    h5 {
      font-size: 20px;
    }

    h6 {
      font-size: 18px;
    }
  }
}
</style>
