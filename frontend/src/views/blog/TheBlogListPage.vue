<template>
  <content-error v-if="isContentLoadingError" />
  <content-loading v-else-if="isContentLoading" />
  <!--- 
  <header v-if="atomFeed">
    <h1>
      {{ atomFeed.rss.channel.title }}
    </h1>
    <h2>{{ atomFeed.rss.channel.description }}</h2>
    <h2>Son Yazilanlar</h2>
  </header> -->
  <main v-if="atomFeed">
    <article
      v-for="({ title, link, summary, updated }, index) in atomFeed"
      :key="index"
    >
      <router-link :to="link"
        ><h2>{{ title }}</h2></router-link
      >
      <p>{{ t("postedOn", { date: datePretty(updated) }) }}</p>
      <p>{{ summary !== "undefined" ? summary : t("noSummary") }}</p>
    </article>
  </main>
</template>

<script>
import ContentError from "@/components/ContentError.vue";
import ContentLoading from "@/components/ContentLoading.vue";
import { RouteHistorySetup } from "@/composables/RouteHistory.js";
import UpdateDocumentHeader from "@/helpers/UpdateDocumentHeader.js";
import ModelContentMeta from "@/models/contentMeta.js";
//import { RouteHistorySetup } from "@/composables/RouteHistory.js";
//import domToJsonSimpleRecursion from "@/helpers/DOMToJsonSimpleRecursion.js";
import XMLToDOM from "@/helpers/XMLToDOM.js";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { routerContentPageAdd, getPathName } from "@/router/index.js";
export default {
  components: { ContentError, ContentLoading },
  setup() {
    const { t, locale } = useI18n({
      useScope: "global",
    });

    // const { router } = RouteHistorySetup();

    const { routeHistoryUpdateCurrentRouteMeta } = RouteHistorySetup();

    const contentMeta = ModelContentMeta({
      title: "Blog List",
    });

    const atomFeed = ref(null);
    const isContentLoading = ref(null);
    // COMPUTED
    const isContentLoadingError = computed(() => {
      return isContentLoading.value instanceof Error;
    });

    isContentLoading.value = true;
    // fetch rss feed.
    fetch(
      "/" +
        (locale.value === "tr"
          ? process.env.VUE_APP_BLOG_RSS_PATH_TR
          : process.env.VUE_APP_BLOG_RSS_PATH_EN)
    )
      .then((res) => res.text())
      .then(XMLToDOM) // xml to dom
      .then(
        /**
         *  @param {Document} dom
         */
        (dom) => {
          // dom to json
          const entries = dom.querySelectorAll("entry");
          const feeds = [];
          if (entries) {
            for (const entry of entries) {
              const link = entry.querySelector("link:not([rel])");
              const alternates = Array.from(
                entry.querySelectorAll("link[rel]")
              );
              const route = {
                title: entry.querySelector("title").textContent,
                summary: entry.querySelector("summary").textContent,
                updated: entry.querySelector("updated").textContent,
                link: getPathName(link.getAttribute("href")),
              };

              feeds.push(route);
              routerContentPageAdd({
                ...route,
                language: dom.querySelector("language").textContent,
                alternate: alternates.reduce((acc, link) => {
                  acc[link.getAttribute("hreflang")] = link.getAttribute(
                    "href"
                  );
                  return acc;
                }, {}),
              });
            }
          }
          atomFeed.value = feeds;
        }
      )
      .catch((msg) => {
        isContentLoading.value = new Error(msg);
      })
      .finally(() => {
        isContentLoading.value = false;
      });

    // dynamic route adding.
    routeHistoryUpdateCurrentRouteMeta(contentMeta);
    UpdateDocumentHeader(contentMeta);

    const datePretty = (e) => {
      const event = new Date(e);
      return event.toLocaleDateString(locale.value);
    };

    return { atomFeed, isContentLoading, isContentLoadingError, datePretty, t };
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
