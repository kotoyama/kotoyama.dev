const { EleventyI18nPlugin } = require('@11ty/eleventy')
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItLinkAttr = require('markdown-it-link-attributes')

module.exports = function (config) {
  config.addPassthroughCopy({
    './public/': '/',
  })

  config.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })

  config.setServerOptions({
    module: '@11ty/eleventy-server-browsersync',
    port: 3000,
    open: false,
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          if (req.url === '/') {
            res.writeHead(302, {
              location: '/en/',
            })
            res.end()
          }
        })
      },
    },
  })

  config.addCollection('content_en', function (collection) {
    return collection.getFilteredByGlob('./src/en/content/*.md')
  })

  config.addCollection('content_ru', function (collection) {
    return collection.getFilteredByGlob('./src/ru/content/*.md')
  })

  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    })
      .use(markdownItAttrs)
      .use(markdownItLinkAttr, [
        {
          matcher(href) {
            return href.match(/^https?:\/\//g)
          },
          attrs: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      ]),
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
