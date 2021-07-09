<template>
  <!--- 
  <header v-if="rssJson">
    <h1>
      {{ rssJson.rss.channel.title }}
    </h1>
    <h2>{{ rssJson.rss.channel.description }}</h2>
    <h2>Son Yazilanlar</h2>
  </header> -->
  <main v-if="rssJson">
    <article
      v-for="({ title, link, description, date }, index) in rssJson.rss.channel
        .item"
      :key="index"
    >
      <router-link :to="link"
        ><h2>{{ title }}</h2></router-link
      >
      <p>posted on {{ datePretty(date) }}</p>
      <p>{{ description }}</p>
    </article>
  </main>
</template>

<script>
import { RouteHistorySetup } from "@/composables/RouteHistory.js";
import UpdateDocumentHeader from "@/helpers/UpdateDocumentHeader.js";
import ModelContentMeta from "@/models/contentMeta.js";
import domToJsonSimpleRecursion from "@/helpers/DOMToJsonSimpleRecursion.js";
import XMLToDOM from "@/helpers/XMLToDOM.js";
import { ref } from "vue";
export default {
  setup() {
    const { routeHistoryUpdateCurrentRouteMeta } = RouteHistorySetup();

    const contentMeta = ModelContentMeta({
      title: "Blog List",
    });

    const rssJson = ref(null);

    // fetch rss feed.
    fetch("/" + process.env.VUE_APP_BLOG_RSS_PATH_TR)
      .then((res) => res.text())
      .then(XMLToDOM) // xml to dom
      .then((dom) => {
        // dom to json
        rssJson.value = domToJsonSimpleRecursion(dom);
      });

    routeHistoryUpdateCurrentRouteMeta(contentMeta);
    UpdateDocumentHeader(contentMeta);

    return { rssJson };
  },
  methods: {
    datePretty(e) {
      const event = new Date(e);
      return event.toDateString();
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  color: var(--color-bg-text);
  margin: 1em;

  h1 {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
  }
}

article {
  a {
    color: #4e92b4;
    text-decoration: none;
    &:hover {
      color: #98bbc7;
    }
  }
}
</style>