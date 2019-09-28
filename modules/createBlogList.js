import Markdown from 'markdown-it'
import svgGenerate from './svgGenerate'
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const md = new Markdown({
  html: true,
  linkify: true,
  typographer: true
})
const svgpng = require('svgpng')

const svgTypeTextSize = {
  'About IT': 100,
  'Blog Posts': 110,
  Feeds: 75,
  Quotes: 80,
  'Bilişim Hakkında': 150,
  'Kişisel Yazılar': 130,
  Paylaşımlar: 110,
  Sözler: 75
}

export default async function createBlogList({ locales }) {
  await this.nuxt.hook('render:before', ({ options }) => {
    locales.every(locale => createList(locale, options.i18n.vueI18n.messages))
  })

  await this.nuxt.hook('generate:before', async ({ options }) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
    let localesLength = locales.length
    while (localesLength--) {
      const locale = locales[localesLength]
      const folderPath = process.cwd() + `/static/api/content/blog-${locale}`

      let list = await fs.readFileSync(`${folderPath}/list.json`, 'utf8')
      if (list) {
        list = JSON.parse(list)
      }
      const routes = list.map(
        entry => (locale !== 'en' ? `/${locale}` : '') + `/blog/` + entry.slug + `/`
      )
      options.generate.routes = options.generate.routes.concat(routes)
    }
  })
}

async function createList(locale, messages) {
  const list = []
  const folderPath = process.cwd() + `/static/api/content/blog-${locale}`
  const uploadPath = process.cwd() + `/static/images/uploads/generated`
  const files = await fs.readdirSync(folderPath)

  let fileNumber = files.length

  while (fileNumber--) {
    const file = files[fileNumber]
    if (path.extname(file) === '.yml') {
      const content = yaml.safeLoad(
        await fs.readFileSync(folderPath + '/' + file, 'utf8')
      )
      if (content.content !== undefined)
        content.content = md.render(content.content.split('<!-- more -->')[0])
      list.push(content)

      const svg = svgGenerate(content.title, {
        title: messages[locale][content.type],
        width: svgTypeTextSize[messages[locale][content.type]]
      })

      await fs.writeFileSync(`/tmp/${content.slug}.svg`, svg)

      await svgpng(
        `/tmp/${content.slug}.svg`,
        `${uploadPath}/${content.slug}.png`,
        {
          size: {
            width: 507,
            height: 265
          }
        }
      )
    }
  }

  await fs.writeFileSync(`${folderPath}/list.json`, JSON.stringify(list))
  return true
}
