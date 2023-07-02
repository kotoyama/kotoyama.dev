module.exports = ({ env }) => ({
  plugins: [
    require('autoprefixer'),
    require('postcss-nesting'),
    require('postcss-custom-media'),
    env === 'production'
      ? require('cssnano')({
          preset: 'default',
        })
      : false,
  ],
})
