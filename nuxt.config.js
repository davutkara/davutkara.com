import matter from 'gray-matter'
import list from './static/api/pages/portfolio/list'

const pkg = require('./package')

const baseURL = process.env.BASE_URL
  ? process.env.BASE_URL
  : 'http://localhost:3000/'

module.exports = {
  generate: {
    routes: Object.keys(matter(list).data)
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vue-windowsize/index'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    'nuxt-i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en'
      },
      {
        code: 'tr',
        iso: 'tr-TR'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      seo: true,
      fallbackLocale: 'en',
      messages: {
        en: {
          'job-title': 'Information Systems Engineer',
          resume: 'Resume',
          portfolio: 'Portfolio',
          copyright:
            'All the content created by Davut KARA on this website can be used and shared with giving reference.',
          'open-source-message': 'This website supports open source',
          'source-codes': 'Source Codes',
          'how-to-made': `Made with,
            <strong>NuxtJS</strong>,
            <strong>Buefy</strong>,
            served on
            <strong>Netlify</strong>`,
          now: 'Now',
          ABOUT_IT: 'About IT',
          ABOUT_PERSONAL: 'Blog Posts',
          FEED: 'Feeds',
          QUOTE: 'Quotes',
          NO_POST: 'There is no post :(',
          CHOOSE_A_CATEGORY: 'Please choose a category.'
        },
        tr: {
          'job-title': 'Bilişim Sistemleri Mühendisi',
          resume: 'Özgeçmiş',
          portfolio: 'Portfolyo',
          copyright:
            'Bu websitesinde, Davut KARA tarafindan üretilmiş tüm içerikler, referans verilerek kullanılabilir ve paylaşılabilir.',
          'open-source-message': 'Bu websitesi açık kaynaklıdır.',
          'source-codes': 'Kaynak Kodları',
          'how-to-made': `<strong>NuxtJS</strong>,
            <strong>Buefy</strong>
            kullanıldı
            <strong>Netlify</strong> ile barındırıldı.`,
          now: 'Şuan',
          ABOUT_IT: 'Bilişim Hakkında',
          ABOUT_PERSONAL: 'Kişisel Yazılar',
          FEED: 'Paylaşımlar',
          QUOTE: 'Sözler',
          NO_POST: 'Henüz yazı yok :(',
          CHOOSE_A_CATEGORY: 'Kategori seçmeniz gerekiyor.'
        }
      },
      vueI18nLoader: true
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options,
    baseURL: baseURL,
    browserBaseURL: baseURL
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.node = { fs: 'empty' }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-formatter-pretty')
          }
        })
        config.module.rules.push({
          test: /\.(md)$/,
          use: 'raw-loader'
        })
      }
    }
  }
}
