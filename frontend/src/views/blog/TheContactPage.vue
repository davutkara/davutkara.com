<template>
  <article>
    <h1>{{ t("contact") }}</h1>
    <p>{{  t("notAvailable")}}</p>
  </article>
</template>
<script>
import { useI18n } from "vue-i18n";
import UpdateDocumentHeader from "@/helpers/UpdateDocumentHeader.js";
import ModelContentMeta from "@/models/contentMeta.js";
import { RouteHistorySetup } from "@/composables/RouteHistory.js";

export default {
  setup() {
    const { routeHistoryUpdateCurrentRouteMeta } = RouteHistorySetup();
    const { t } = useI18n({
      useScope: "global",
      messages: {
        en: {
          contact: "Contact",
          notAvailable: "Not available for now."
        },
        tr: {
          contact: "İletişim",
          notAvailable: "Suan icin mevcut degil."
        },
      },
    });

    const contentMeta = ModelContentMeta({
      title: t("contact"),
    });
    // dynamic route adding.
    routeHistoryUpdateCurrentRouteMeta(contentMeta);
    UpdateDocumentHeader(contentMeta);

    return {
      t,
    };
  },
};
</script>
