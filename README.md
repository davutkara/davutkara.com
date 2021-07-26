# davutkara.com

> Personal web page

[![Netlify Status](https://api.netlify.com/api/v1/badges/7c3f3ac7-4832-4a94-a63f-f944f89cef6b/deploy-status)](https://www.davutkara.com)

## Features
- Made with Vue3
- Multilanguage using `vue-i18n`
- JAMStack using `netlify-cms`
- Prerender using `puppeteer` and `prerender-spa-plugin`
- Responsive using sass
- Generating Atom Rss feed for the blog list using `webpack` custom plugin.

## Todos
 - Light/Dark theme
 - Auto generating thumbnail image for each post according to the post's title.
 - Comments area for the blog posts.
 - Document version details for the blog posts.

## Variables

```
VUE_APP_DEFAULT_LANG_FOR_URL=en
VUE_APP_BLOG_RSS_PATH_EN=blog-en.xml
VUE_APP_BLOG_RSS_PATH_TR=blog-tr.xml
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
