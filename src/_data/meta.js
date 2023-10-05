require('dotenv').config()

module.exports = {
  env: process.env.ELEVENTY_ENV,
  url: process.env.URL || 'http://localhost:8080',
  en: {
    title: 'Ekaterina Maltseva',
    description: 'Frontend Engineer',
  },
  ru: {
    title: 'Екатерина Мальцева',
    description: 'Фронтенд разработчица',
  },
}
