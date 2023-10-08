const esbuild = require('esbuild')

const { EleventyI18nPlugin } = require('@11ty/eleventy')

const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItLinkAttr = require('markdown-it-link-attributes')

module.exports = function (eleventyConfig) {
  // add plugins
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
    fallbackLocales: {
      '*': 'en',
    },
  })

  // copy the contents of the `public` folder to the output folder
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  })

  // run esbuild
  eleventyConfig.on('eleventy.before', async () => {
    await esbuild.build({
      entryPoints: ['src/_scripts/theme.js'],
      outdir: 'src/_assets/js',
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      bundle: true,
      target: ['es2017'],
    })
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

  eleventyConfig.setLibrary(
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
    templateFormats: ['md', 'njk', 'html', 'liquid'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  }
}
