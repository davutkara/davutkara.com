import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import ScrollAnchor from "@/directives/scroll-anchor.js";
import TextTypeWriter from "@/directives/text-typewriter.js";
import ListState from "@/directives/list-state.js";
import { createI18n
  //, useI18n 
} from "vue-i18n"

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  tr: {
    message: {
      hello: 'Merhaba'
    }
  }
}

const i18n = createI18n({
  locale: 'ja', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

createApp(App)
  .directive(...ScrollAnchor)
  .directive(...TextTypeWriter)
  .directive(...ListState)
  .use(Router)
  .use(i18n)
  .mount("#app");
