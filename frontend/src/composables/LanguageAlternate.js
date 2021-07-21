import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export const LanguageAlternateSetup = function() {
  const route = useRoute();
  const router = useRouter();

  const getAlternatesOfUrl = (path) => {
    const theRoute = router.resolve(path);
    const alternates = theRoute.meta.alternate;
    if(!alternates) return {}
    return Object.keys(alternates)
      .sort()
      .reduce((acc, lang) => {
        acc[lang] = alternates[lang];
        return acc;
      }, {});
  };

  const alternates = computed(() => {
    return getAlternatesOfUrl(route.path);
  });

  return { getAlternatesOfUrl, alternates };
};
