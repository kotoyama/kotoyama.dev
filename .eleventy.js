const { EleventyI18nPlugin } = require('@11ty/eleventy')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const i18nPlugin = require('eleventy-plugin-i18n')
const faviconsPlugin = require('eleventy-plugin-gen-favicons')
const pluginPWA = require('eleventy-plugin-pwa-v2')

const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItLinkAttr = require('markdown-it-link-attributes')

const translations = require('./src/_data/i18n')

module.exports = function (eleventyConfig) {
  // add plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })
  eleventyConfig.addPlugin(i18nPlugin, {
    translations,
    defaultLanguage: 'en',
    fallbackLocales: {
      '*': 'en',
    },
  })
  eleventyConfig.addPlugin(faviconsPlugin, {
    generateManifest: false,
  })
  eleventyConfig.addPlugin(pluginPWA, {
    cacheId: 'kotoyama.dev',
    runtimeCaching: [
      {
        urlPattern: /\/$/,
        handler: 'NetworkFirst',
      },
      {
        urlPattern: /\.html$/,
        handler: 'NetworkFirst',
      },
      {
        urlPattern:
          /^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
        handler: 'StaleWhileRevalidate',
      },
    ],
  })

  // copy the contents of the `public` folder to the output folder
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  })

  // redirect from root to default language root
  eleventyConfig.setServerOptions({
    module: '@11ty/eleventy-server-browsersync',
    port: 3000,
    open: false,
    notify: true,
    files: ['_site/styles'],
    callbacks: {
      ready: function (_, bs) {
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

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })

  // filters
  eleventyConfig.addFilter('markdown', (content) => {
    return md.render(content)
  })

  // collections
  eleventyConfig.addCollection(
    'content_en',
    require('./src/_11ty/collections/english'),
  )
  eleventyConfig.addCollection(
    'content_ru',
    require('./src/_11ty/collections/russian'),
  )

  // transforms
  eleventyConfig.addTransform(
    'html-minify',
    require('./src/_11ty/transforms/htmlMinifier'),
  )

  // markdown
  eleventyConfig.setLibrary(
    'md',
    md.use(markdownItAttrs).use(markdownItLinkAttr, [
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
