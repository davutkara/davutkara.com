import Markdown from 'markdown-it'
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const md = new Markdown({
  html: true,
  linkify: true,
  typographer: true
})

export default function createBlogList({ locales }) {
  this.nuxt.hook('render:before', () => {
    locales.every(locale => createList(locale))
  })
}

async function createList(locale) {
  const list = []
  const folderPath = process.cwd() + `/static/api/content/blog-${locale}`
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
    }
  }

  await fs.writeFileSync(`${folderPath}/list.json`, JSON.stringify(list))
}
