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
          welcome: 'Welcome'
        },
        tr: {
          welcome: 'Hoşgeldiniz'
        }
      }
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
