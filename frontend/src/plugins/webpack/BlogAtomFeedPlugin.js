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
      const filePathsEn = await readDir(
        __dirname + "/../../assets/docs/blog/en"
      );
      const filePathsTr = await readDir(
        __dirname + "/../../assets/docs/blog/tr"
      );
      const filePaths = [
        ...filePathsEn.map((p) => "en/" + p),
        ...filePathsTr.map((p) => "tr/" + p),
      ];
      // create the content list
      const fileContents = filePaths.map((filePath) =>
        readFile(
          __dirname + "/../../assets/docs/blog/" + filePath,
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
            alternate,
          } = YAML.parse(fileContent);
          return {
            language,
            alternate,
            title,
            description,
            tags,
            slug,
            date,
            author,
          };
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
    <feed xmlns="http://www.w3.org/2005/Atom"> 
      <title>${title}</title>
      <subtitle>${description}</subtitle>
      <link>${link}</link>
      <language>${language}</language>
      <updated>${new Date().toISOString()}</updated>
        `;
        items.sort((a, b) => {
          if (!a.date || !b.date) return -1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        for (const item of items) {
          if (!item.tags?.includes("blog")) continue;
          source += `<entry>
          <title>${item.title}</title>
          <link href="https://davutkara.com/${item.slug}" />
          `;

          if (item.alternate)
            for (const alternate of Object.keys(item.alternate)) {
              if (alternate === language) continue;
              source += `<link rel="alternate" type="text/html" href="https://davutkara.com${item.alternate[alternate]}" hreflang="${alternate}"/>`;
            }
          source += `<updated>${item.date}</updated>
          <summary>${item.description}</summary>
        </entry>
        `;
        }
        /**
         * <content type="xhtml">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <p>This is the entry content.</p>
              </div>
            </content>
            <author>
              <name>John Doe</name>
              <email>email</email>
            </author>
         */
        source += `
        </feed>`;

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
