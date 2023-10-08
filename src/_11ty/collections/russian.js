module.exports = function (collection) {
  return collection.getFilteredByGlob('./src/ru/content/*.md')
}
