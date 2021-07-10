const util = require("util");
const fs = require("fs");
const YAML = require("yaml");
const pluginName = "BlogListJson";

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

class BlogListJson {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(pluginName, async (compilation, callback) => {
      // categorized list.
      const rssItemList = { en: [], tr: [] };

      // find the paths
      const filePaths = await readDir(__dirname + "/../../assets/docs/blog/en");
      // create the content list
      const fileContents = filePaths.map((filePath) =>
        readFile(
          __dirname + "/../../assets/docs/blog/en/" + filePath,
          "utf8"
        ).then((fileContent) => {
          const {
            language,
            title,
            description,
            tags,
            slug,
            date,
            author,
          } = YAML.parse(fileContent);
          return { language, title, description, tags, slug, date, author };
        })
      );

      // categorise the contents
      for await (const file of fileContents) {
        rssItemList[file.language].push(file);
      }

      const rssData = {
        [process.env.VUE_APP_BLOG_RSS_PATH_EN]: {
          channel: {
            title: "Davut KARA",
            link: "https://www.davutkara.com",
            description:
              "Davut's personal blog about information technologies and programming.",
            language: "en",
            items: rssItemList.en,
          },
        },
        [process.env.VUE_APP_BLOG_RSS_PATH_TR]: {
          channel: {
            title: "Davut KARA",
            link: "https://www.davutkara.com",
            description: "Bilgi teknolojileri ve programlama.",
            language: "tr",
            items: rssItemList.tr,
          },
        },
      };

      for (const xmlFile of Object.keys(rssData)) {
        const { title, link, description, language, items } = rssData[
          xmlFile
        ].channel;

        let source = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">  
        <channel>
          <title>${title}</title>
          <link>${link}</link>
          <description>${description}</description>
          <language>${language}</language>
        `;
        for (const item of items) {
          source += `<item>
          <title>${item.title}</title>
          <link>${item.slug}</link>
          <date>${item.date}</date>
          <description>${item.description}</description>
        </item>
        `;
        }

        source += `</channel>  
        </rss>`;

        compilation.assets[xmlFile] = {
          source: () => source,
          size: function() {
            return source.length;
          },
        };
      }

      callback();
    });
  }
}

module.exports = BlogListJson;
