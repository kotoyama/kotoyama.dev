require('dotenv').config()

module.exports = {
  language: 'en',
  env: process.env.ELEVENTY_ENV,
  url: process.env.URL || 'http://localhost:8080',
  title: 'Ekaterina Maltseva',
  description: 'Frontend Engineer',
}
