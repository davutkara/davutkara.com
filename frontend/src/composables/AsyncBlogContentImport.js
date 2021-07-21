import { ref, watchEffect, computed } from "vue";

import { RouteHistorySetup } from "@/composables/RouteHistory";

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
    if (route) isContentLoading.value = false;
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

    const filePath =
      route.meta.language +
      (path.includes("/" + route.meta.language + "/")
        ? path.replace("/" + route.meta.language, "")
        : path);

    return import(
      /* webpackChunkName: "[request]" */
      "../assets/docs/blog/" + filePath + ".yml"
    )
      .then((file) => {
        content.value = file.default;
        isContentLoading.value = false;
        return file.default;
      })
      .catch((err) => {
        let msg;
        if (err.code === "MODULE_NOT_FOUND") {
          msg = "404 Page not found !";
        } else if (err && err.name === "ChunkLoadError") {
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
