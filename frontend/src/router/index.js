import { createWebHistory, createRouter } from "vue-router";
import TheBlogLayout from "@/layouts/TheBlog.vue";
import TheBlogHomePage from "@/views/blog/TheHomePage.vue";
import TheBlogListPage from "@/views/blog/TheBlogListPage.vue";
import TheBlogContentPage from "@/views/blog/TheContentPage.vue";


const defaultLang = 'en'

const generateAlternate = function (langPaths) {
  return Object.keys(langPaths).reduce((acc, lang) => {
    acc[lang] = "/" + (lang === defaultLang ? langPaths[lang] : lang + "/" + langPaths[lang]);
    return acc;
  }, {})
}

const i18nPaths = [
  {
    langPaths: {
      en: "home",
      tr: "anasayfa"
    },
    component: TheBlogHomePage,
    meta: {
      ContentFetch: true,
    },
  },
  {
    langPaths: {
      en: "blog",
      tr: "blog"
    },
    component: TheBlogListPage,
  },
  {
    langPaths: {
      en: ":slug?",
      tr: ":slug"
    },
    //name: "Blog Content Page",
    component: TheBlogContentPage,
    meta: {
      ContentFetch: true,
    },
    children: [
      { path: "comments", component: TheBlogContentPage },
      { path: "revisions", component: TheBlogContentPage },
    ],
  }
]

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Blog",
    component: TheBlogLayout,
    children: [
      ...i18nPaths.reduce(
        (acc, { langPaths, ...other }) => {

          Object.keys(langPaths).map(
            (lang) => {

              other = {
                ...other,
                meta: {
                  ...(other.meta ? other.meta : {}),
                  language: lang,
                  alternate: generateAlternate(langPaths)
                }
              }

              const found = acc.find(route => route.path === lang)

              if (found) {
                found.children.push({
                  path: langPaths[lang],
                  ...(lang === defaultLang ? {
                    beforeEnter(to, from, next) {
                      const newPath = to.path.replace('/' + defaultLang + "/", "/");
                      next(newPath)
                    }
                  } : other)
                })

                if (lang === defaultLang) {
                  acc.push({
                    path: langPaths[lang][0] === ":" ? langPaths[lang] : langPaths[lang],
                    ...other,
                  });
                }
              } else {
                acc.push({
                  path: lang + "/" + langPaths[lang],
                  ...other,
                });
              }
            }

          )
          return acc;
        }
        , [
          { path: 'en', children: [] }
        ]).sort((a) => {
          if (a.path[0] === ":") return 1
          else return 0;
        })
    ],
  },
];
console.log(routes)
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
