import { createWebHistory, createRouter } from "vue-router";
import TheBlogLayout from "@/layouts/TheBlog.vue";
import TheBlogHomePage from "@/views/blog/TheHomePage.vue";
import TheBlogListPage from "@/views/blog/TheBlogListPage.vue";
import TheBlogContentPage from "@/views/blog/TheContentPage.vue";
import TheContactPage from "@/views/blog/TheContactPage.vue";

const DEFAULT_LANG = process.env.VUE_APP_DEFAULT_LANG_FOR_URL;

export const getPathName = (url) => {
  try {
    return new URL(url).pathname;
  } catch (err) {
    return url;
  }
};

/**
 *   
 * langPaths: {
      en: "home",
      tr: "anasayfa"
    },
    : creates 3 paths

    /home ==> default
    /en/home ==> redirection to /home
    /tr/anasayfa ==> other lang page.

        meta: {
          ...meta,
          language: "en",
          alternate: {
            en: "home",
            tr: "/tr/anasayfa"
          }
        }
 */
const RoutesGenerateForI18n = function(mainPath, i18nPaths) {
  return i18nPaths.reduce((routes, i18nRoute) => {
    // iterate language paths;
    [null, ...Object.keys(i18nRoute.langPaths)].forEach((language) => {
      let path =
        language === null
          ? i18nRoute.langPaths[DEFAULT_LANG]
          : i18nRoute.langPaths[language];
      path =  getPathName(path);
      routes.push({
        path,
        name: path,
        ...(DEFAULT_LANG === null
          ? {
              redirect: i18nRoute.langPaths[DEFAULT_LANG],
            }
          : {}),
        ...i18nRoute,
        meta: {
          ...(i18nRoute.meta ? i18nRoute.meta : {}),
          language: language === null ? DEFAULT_LANG : language,
          alternate: Object.entries(i18nRoute.langPaths).reduce(
            (acc, [lang, path]) => {
              path = getPathName(path);
              acc[lang] = mainPath + path;
              return acc;
            },
            {}
          ),
        },
      });
    });

    return routes;
  }, []);
};

const i18nRoutes = [
  {
    langPaths: {
      en: "home",
      tr: "tr/anasayfa",
    },
    component: TheBlogHomePage,
    meta: {
      ContentFetch: true,
    },
  },
  {
    langPaths: {
      en: "blog",
      tr: "tr/blog",
    },
    component: TheBlogListPage,
  },
  {
    langPaths: {
      en: "contact",
      tr: "tr/iletisim",
    },
    component: TheContactPage,
  },
  {
    langPaths: {
      en: ":slug?",
      tr: "tr/:slug",
    },
    //name: "Blog Content Page",
    component: TheBlogContentPage,
    // beforeEnter(to, from) {},
    meta: {
      ContentFetch: true,
    },
    children: [
      { path: "comments", component: TheBlogContentPage },
      { path: "revisions", component: TheBlogContentPage },
    ],
  },
];

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Blog",
    component: TheBlogLayout,
    children: RoutesGenerateForI18n("/", i18nRoutes),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const routerContentPageAdd = (
  { language, link, alternate },
  mainPath = ""
) => {
  const route = {
    langPaths: {
      [language]: link,
      ...alternate,
    },
    component: TheBlogContentPage,
    meta: {
      ContentFetch: true,
    },
  };

  RoutesGenerateForI18n(mainPath, [route]).forEach((route) => {
    router.addRoute("Blog", route);
  });
};

export default router;
