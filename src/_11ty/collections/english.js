module.exports = function (collection) {
  return collection.getFilteredByGlob('./src/en/content/*.md')
}
