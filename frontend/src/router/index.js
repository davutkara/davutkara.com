import { createWebHistory, createRouter } from "vue-router";
import TheBlogLayout from "@/layouts/TheBlog.vue";
import TheBlogHomePage from "@/views/blog/TheHomePage.vue";
import TheBlogListPage from "@/views/blog/TheBlogListPage.vue";
import TheBlogContentPage from "@/views/blog/TheContentPage.vue";
import TheContactPage from "@/views/blog/TheContactPage.vue";
import XMLToDOM from "@/helpers/XMLToDOM.js";

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
      if (
        language === null &&
        i18nRoute.langPaths[DEFAULT_LANG] === undefined
      ) {
        return;
      }

      let path =
        language === null
          ? i18nRoute.langPaths[DEFAULT_LANG]
          : i18nRoute.langPaths[language];
      path = getPathName(path);
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
      en: "404",
      tr: "tr/404",
    },
    component: TheBlogListPage,
    meta: {
      ContentFetch: true,
    },
  },
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
    beforeEnter(to, from, next) {
      if (router.resolve(to.path).name === to.path) return;

      fetch(
        "/" +
          (to.meta.language === "tr"
            ? process.env.VUE_APP_BLOG_RSS_PATH_TR
            : process.env.VUE_APP_BLOG_RSS_PATH_EN)
      )
        .then((res) => res.text())
        .then(XMLToDOM) // xml to dom
        .then(
          /**
           *  @param {Document} dom
           */
          (dom) => {
            // dom to json
            const entries = dom.querySelectorAll("entry");
            if (entries) {
              for (const entry of entries) {
                const link = entry.querySelector("link:not([rel])");
                const alternates = Array.from(
                  entry.querySelectorAll("link[rel]")
                );

                routerContentPageAdd({
                  link: getPathName(link.getAttribute("href")),
                  language: dom.querySelector("language").textContent,
                  alternate: alternates.reduce((acc, link) => {
                    acc[link.getAttribute("hreflang")] = link.getAttribute(
                      "href"
                    );
                    return acc;
                  }, {}),
                });
              }
            }
          }
        )
        .then(() => {
          if (router.resolve(to.path).name === to.path) return;

          // if not in the atom feed.
          routerContentPageAdd({
            link: to.path,
            language: to.path.includes("/tr/") ? "tr" : "en",
          });
        })
        .then(() => {
          next(to.path);
        })
        .catch(() => {
          next(false);
        })
        .finally(() => {
          // no
        });
    },
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
  // https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
  {
    path: "/:pathMatch(.*)*",
    name: "r-404",
    beforeEnter(to, from, next) {
      if (to.path.includes("/tr/")) next("/tr/404");
      else next("/404");
    },
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
