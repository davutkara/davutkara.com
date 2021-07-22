<template>
  <article>
    <h1>{{ t("error") }}</h1>
    <p>{{ t("joke") }}</p>
    <p>{{ t("msg") }}</p>
    <p>{{ t("details") }}</p>
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
          error: "Error",
          joke: "It is not a bug. It is a feature :)",
          msg: "Just the page data could not be fetch.",
          details:
            "It may be lost. It maybe does not exist or it may be a connection error.",
        },
        tr: {
          error: "Hata",
          joke: "Bu bir hata değil. Bu bir özellik :) ",
          msg: "Sadece sayfa yuklenmedi.",
          details:
            "Kayıp olabilir, kaçırılmış olabilir, veya bir internet problemidir.",
        },
      },
    });

    return { t };
  },
};
</script>

<style></style>
