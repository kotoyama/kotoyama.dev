module.exports = function (config) {
  config.addPassthroughCopy('src/assets')

  return {
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
    },
  }
}
