import { ref, computed } from "vue";
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

  // COMPUTED
  const isContentLoadingError = computed(() => {
    return isContentLoading.value instanceof Error;
  });

  // METHODS
  const startFetchingByPath = async (path) => {
    isContentLoading.value = true;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 100)
    );

    return import(
      /* webpackChunkName: "[request]" */
      "../assets/docs/blog" + path + ".yaml"
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
