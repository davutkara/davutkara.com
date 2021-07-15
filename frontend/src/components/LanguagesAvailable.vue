<template>
  <div>
    <span>{{ t("availableLang") }}</span>
    <router-link
      :to="path"
      v-for="(path, lang) in $route.meta.alternate"
      :key="path"
      >{{ getLanguageTitle(lang) }}
    </router-link>
  </div>
</template>

<script>
import { ROUTE_HISTORY_OVERRIDE_HASH } from "@/composables/RouteHistory.js";
import { RouteHistorySetup } from "@/composables/RouteHistory";

import { watch } from "vue";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { route } = RouteHistorySetup();
    const { t, locale } = useI18n({
      useScope: "global",
      locale: "en",
      messages: {
        en: {
          availableLang: "Languages:",
        },
        tr: {
          availableLang: "Diller:",
        },
      },
    });

    watch(
      route,
      (to) => {
        locale.value = to.meta.language;
      },
      {
        immediate: true,
      }
    );

    return { t };
  },
  methods: {
    getLanguageTitle(lang) {
      switch (lang) {
        case "en":
          return "English";
        case "tr":
          return "Turkish";
        default:
          return null;
      }
    },
    overrideTab(path) {
      return {
        path,
        hash: ROUTE_HISTORY_OVERRIDE_HASH,
      };
    },
  },
};
</script>