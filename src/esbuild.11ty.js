const esbuild = require('esbuild')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = class {
  data() {
    return {
      eleventyExcludeFromCollections: true,
    }
  }

  async render() {
    await esbuild.build({
      entryPoints: ['src/_scripts/polyfills.js', 'src/_scripts/app.js'],
      bundle: true,
      minify: isProduction,
      outdir: '_site',
      sourcemap: !isProduction,
      target: isProduction ? 'es6' : 'esnext',
    })
  }
}
