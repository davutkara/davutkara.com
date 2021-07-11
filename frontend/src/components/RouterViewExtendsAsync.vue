<template>
  <content-error v-if="isContentLoadingError" />
  <content-loading v-else-if="isContentLoading" />
  <template v-else>
    <teleport to="#language-change">
      <languages-available
        v-clear-children-of-id="'language-change'"
        v-if="$route.meta.alternate"
        :key="$route.path"
      />
    </teleport>
    <router-view v-bind="isContentFetch ? { content } : {}" />
  </template>
</template>

<script>
import AsyncBlogContentImport from "../composables/AsyncBlogContentImport.js";
import ContentError from "@/components/ContentError.vue";
import ContentLoading from "@/components/ContentLoading.vue";
import LanguagesAvailable from "@/components/LanguagesAvailable.vue";

import UpdateDocumentHeader from "@/helpers/UpdateDocumentHeader.js";
import { RouteHistorySetup } from "@/composables/RouteHistory";
import ModelContentMeta from "@/models/contentMeta.js";

import { watch, computed, nextTick } from "vue";
export default {
  setup() {
    const {
      content,
      isContentLoading,
      startFetchingByPath,
      isContentLoadingError,
    } = AsyncBlogContentImport();

    const { route, router, routeHistory, routeHistoryUpdateCurrentRouteMeta } =
      RouteHistorySetup();

    const isContentFetch = computed(() => {
      return route.meta && route.meta.ContentFetch === true;
    });

    /**
     * Save the scroll state to the route meta.
     */
    router.beforeEach(async () => {
      const { scrollTop, scrollLeft } = document.getElementById("text-bar");
      routeHistoryUpdateCurrentRouteMeta({
        scrollTo: [scrollTop, scrollLeft],
      });
      return true;
    });

    // WATCH
    /**
     * Watch vue-router instance changes.
     * If the page meta has ContentFetch. Update  import the yaml file.
     * @todo refactor
     */
    watch(
      route,
      ($route) => {
        if ($route.meta && $route.meta.ContentFetch) {
          startFetchingByPath($route.path === "/" ? "/home" : $route.path);
        }
      },
      { immediate: true }
    );

    /**
     * Watch the content changes and update the route meta
     * and update the document header.
     */
    watch(content, (value) => {
      if (!value) return;
      const contentMeta = ModelContentMeta(value);
      routeHistoryUpdateCurrentRouteMeta(contentMeta);
      UpdateDocumentHeader(contentMeta);
    });

    watch(isContentLoading, (val) => {
      if (val === true) UpdateDocumentHeader({ title: "Loading" });
    });
    watch(isContentLoadingError, (val) => {
      if (val === true) UpdateDocumentHeader({ title: isContentLoading.value });
    });

    /* Watch content and isContentLoading
        Retrieve back the scroll state
    */
    watch(
      [content, isContentLoading],
      ([valueContent, valueIsContentLoading]) => {
        if (valueContent && valueIsContentLoading === false) {
          const scrollTo = routeHistory.get(route.path)?.scrollTo;
          const [top, left] = scrollTo ? scrollTo : [0, 0];
          nextTick(() => {
            document
              .getElementById("text-bar")
              .scrollTo({ top, left, behavior: "smooth" });
          });
        }
      }
    );

    return { content, isContentFetch, isContentLoading, isContentLoadingError };
  },
  components: { ContentError, ContentLoading, LanguagesAvailable },
};
</script>