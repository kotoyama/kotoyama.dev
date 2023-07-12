const { EleventyI18nPlugin } = require('@11ty/eleventy')
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')

module.exports = function (config) {
  config.addPassthroughCopy({
    './public/': '/',
  })

  config.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })

  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(markdownItAttrs),
  )

  return {
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
    },
  }
}
