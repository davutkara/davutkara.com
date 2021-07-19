import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import ScrollAnchor from "@/directives/scroll-anchor.js";
import TextTypeWriter from "@/directives/text-typewriter.js";
import ListState from "@/directives/list-state.js";
import ClearChildrenOfId from "@/directives/clear-children-of-id.js";
import { createI18n
  //, useI18n 
} from "vue-i18n"

const  messages = {
  en: {
    postedOn: "posted on {date}.",
    postDetails: "posted on {date} by {author}.",
    noSummary: "No summary",
  },
  tr: {
    postedOn: "{date} tarihinde gonderildi.",
    postDetails: "{author} tarafindan {date} tarihinde gonderildi.",
    noSummary: "Ozet yok",
  }
}

const i18n = createI18n({
  legacy:false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

const app = createApp(App)
  .directive(...ScrollAnchor)
  .directive(...TextTypeWriter)
  .directive(...ListState)
  .directive(...ClearChildrenOfId)
  .use(Router)
  .use(i18n)
  .mount("#app");

window.$appd = app