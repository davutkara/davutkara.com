const path = require("path");
const Renderer = require("@prerenderer/renderer-jsdom");
const BlogList = require("./src/plugins/blogList.util.js");

module.exports = (api, options) => {
  api.registerCommand("build:prerender", async (args) => {
    const PrerenderSPAPlugin = require("prerender-spa-plugin");
    let filePaths = await BlogList();
    filePaths = filePaths.reduce((acc, path) => {
      if (path.includes("en/"))
        acc.push("/" + path.replace(".yml", "").replace("en/",""));
      acc.push("/" + path.replace(".yml", ""));
      return acc;
    }, []);

    console.log("prerender: ",filePaths)

    api.chainWebpack((config) => {
      config.plugin("PrerenderSPAPlugin").use(PrerenderSPAPlugin, [
        {
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, "dist"),
          // Required - Routes to render.
          routes: [
            "/blog",
            "/home",
            "/contact",
            "/tr/anasayfa",
            "/tr/blog",
            "/tr/iletisim",
            ...filePaths,
          ],
          renderer: new Renderer({ renderAfterTime: 10000 }),
        },
      ]);
    });

    await api.service.run("build", args);
  });
};

module.exports.defaultModes = {
  "build:prerender": "production",
};
