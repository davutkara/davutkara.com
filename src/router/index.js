import { createWebHistory, createRouter } from "vue-router";
import TheBlogLayout from "@/layouts/TheBlog.vue";
import TheBlogHomePage from "@/views/blog/TheHomePage.vue";
import TheBlogListPage from "@/views/blog/TheBlogListPage.vue";
import TheBlogContentPage from "@/views/blog/TheContentPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Blog",
    component: TheBlogLayout,
    children: [
      ...["/home", "/anasayfa"].map((path) => ({
        path: path,
        meta: {
          ContentFetch: true,
        },
        component: TheBlogHomePage,
      })),
      {
        path: "/blog",
        component: TheBlogListPage,
      },
      ...["/activities", "/aktivitelerim"].map((path) => ({
        path: path,
        meta: {
          ContentFetch: true,
        },
        component: TheBlogHomePage,
      })),
      ...["/contact", "/iletisim"].map((path) => ({
        path: path,
        component: TheBlogHomePage,
      })),
      ...["/about", "/hakkimda", ":slug?"].map((path) => ({
        name: "Blog Content Page",
        path,
        component: TheBlogContentPage,
        meta: {
          ContentFetch: true,
        },
        children: [
          { path: "comments", component: TheBlogContentPage },
          { path: "revisions", component: TheBlogContentPage },
        ],
      })),
    ],
  },
];
console.log(routes)
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
