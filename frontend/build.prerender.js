const path = require("path");
const BlogList = require("./src/plugins/blogList.util.js");

module.exports = (api, options) => {
  api.registerCommand("build:prerender", async (args) => {
    const PrerenderSPAPlugin = require("prerender-spa-plugin");
    const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
    let filePaths = await BlogList();
    filePaths = filePaths.reduce((acc, path) => {
      if (path.includes("en/"))
        acc.push("/" + path.replace(".yml", "").replace("en/", ""));
      acc.push("/" + path.replace(".yml", ""));
      return acc;
    }, []);

    console.log("prerender: ", filePaths);

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
          renderer: new Renderer({
            executablePath: "google-chrome-stable",
            renderAfterDocumentEvent: "custom-render-trigger",
            //renderAfterElementExists: "section article",
          }),
        },
      ]);
    });

    await api.service.run("build", args);
  });
};

module.exports.defaultModes = {
  "build:prerender": "production",
};
