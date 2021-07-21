<template>
  <div>
    <span>{{ t("availableLang") }}</span>
    <router-link :to="path" v-for="(path, lang) in alternates" :key="path"
      >{{ getLanguageTitle(lang) }}
    </router-link>
  </div>
</template>

<script>
import { ROUTE_HISTORY_OVERRIDE_HASH } from "@/composables/RouteHistory.js";
import { RouteHistorySetup } from "@/composables/RouteHistory";
import { LanguageAlternateSetup } from "@/composables/LanguageAlternate.js";

import { watchEffect } from "vue";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { alternates } = LanguageAlternateSetup();
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

    watchEffect(() => {
      locale.value = route.meta.language;
    });

    return { t, alternates };
  },
  methods: {
    getLanguageTitle(lang) {
      switch (lang) {
        case "en":
          return "English";
        case "tr":
          return "Türkçe";
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
