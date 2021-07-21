const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const BlogAtomFeedPlugin = require("./src/plugins/webpack/BlogAtomFeedPlugin.js");

/* 
    sass pre-configured 
    https://cli.vuejs.org/guide/css.html#pre-processors 
 */

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/_variables.scss";`,
      },
    },
  },
  /*
  SERVE DIST
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    hot: true,
  },
  */
  chainWebpack: async (config) => {
    // support md files.
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader")
      .end();

    // support yaml files.
    config.module
      .rule("yaml")
      .test(/\.ya?ml$/)
      .type("json")
      .use("yaml-loader")
      .loader("yaml-loader")
      .end();

    config.plugin("BlogAtomFeedPlugin").use(BlogAtomFeedPlugin, []);

    if (process.env.NODE_ENV !== "production") return;
    // production scripts etc.
  },
};
