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

  config.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",
    port: 3000,
    open: true,
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          if (req.url === '/') {
            res.writeHead(302, {
              location: '/en/'
            });
            res.end()
          }
        })
      }
    }
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
