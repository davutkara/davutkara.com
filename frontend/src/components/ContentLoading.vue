<template>
  <article>
    <h1>{{ t("loading") }}</h1>
  </article>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n({
      useScope: "global",
      locale: "en",
      messages: {
        en: {
          loading: "Loading",
        },
        tr: {
          loading: "Yükleniyor",
        },
      },
    });

    return { t };
  },
};
</script>

<style></style>
