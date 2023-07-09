const { EleventyI18nPlugin } = require('@11ty/eleventy')

module.exports = function (config) {
  config.addPassthroughCopy({
    './public/': '/',
  })

  config.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })

  return {
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
    },
  }
}
