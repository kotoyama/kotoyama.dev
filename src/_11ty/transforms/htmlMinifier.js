const htmlMinifier = require('html-minifier-terser')

module.exports = (content, outputPath) => {
  if (
    outputPath &&
    outputPath.endsWith('.html') &&
    process.env.NODE_ENV === 'production'
  ) {
    return htmlMinifier.minify(content, {
      useShortDoctype: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      includeAutoGeneratedTags: false,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
    })
  }
  return content
}
