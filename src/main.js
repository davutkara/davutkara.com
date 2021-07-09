import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import ScrollAnchor from "@/directives/scroll-anchor.js";
import TextTypeWriter from "@/directives/text-typewriter.js";
import ListState from "@/directives/list-state.js";

createApp(App)
  .directive(...ScrollAnchor)
  .directive(...TextTypeWriter)
  .directive(...ListState)
  .use(Router)
  .mount("#app");
