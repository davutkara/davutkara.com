import { ref, watchEffect, computed } from "vue";

import { RouteHistorySetup } from "@/composables/RouteHistory";

const YAML = require("yaml");

/**
 * Making an async template that handle loading,error and content fetched.
 *
 * @type {Ref<any>} content : Stores the fetched file data.
 * @type {Ref<boolean>} isContentLoading : Boolean to check whether the content is laoded
 * @type {ComputedRef<boolean>} isContentLoadingError : Computes the content loading is failed.
 * @async
 * @function {Promise<any>} startFetchingByPath : The fetch function by given path.
 */
export default function() {
  const isContentLoading = ref(false),
    content = ref(null);
  // always loading false when router changed.
  const { route } = RouteHistorySetup();
  watchEffect(() => {
    if (route.path) isContentLoading.value = false;
  });

  // COMPUTED
  const isContentLoadingError = computed(() => {
    return isContentLoading.value instanceof Error;
  });

  // METHODS
  const startFetchingByPath = async (path) => {
    // fix to trigger watch.
    content.value = null;
    isContentLoading.value = true;

    let filePath =
      route.meta.language +
      (path.includes("/" + route.meta.language + "/")
        ? path.replace("/" + route.meta.language, "")
        : path);

    if (filePath.slice(-1) === "/") {
      filePath = filePath.slice(0, -1);
    }

    return fetch("/docs/blog/" + filePath + ".yml")
      .then(
        /**
         *
         * @param {Response} file
         * @returns
         */
        async (res) => {
          if (res.status !== 200) throw new Error(res);
          const str = await res.text();
          const parsed = YAML.parse(str);
          content.value = parsed;
          isContentLoading.value = false;
          return parsed;
        }
      )
      .catch((err) => {
        let msg;
        if (err.status === 404) {
          msg = "404 Page not found ! :" + filePath;
        } else if (err.status === 500) {
          msg = "500 Network error !";
        } else {
          msg = "Unknown Error";
        }
        const error = new Error(msg);
        isContentLoading.value = error;
        throw error;
      });
  };

  return {
    content,
    startFetchingByPath,
    isContentLoading,
    isContentLoadingError,
  };
}
