const translations = require('../_data/i18n/index.runtime')

class Translator {
  constructor(supportedLocales) {
    const contextLocale = location.pathname.split('/')[1]
    this.locale = supportedLocales.includes(contextLocale)
      ? contextLocale
      : 'en'
  }

  find(obj, keys) {
    return keys.reduce((acc, current) => {
      if (acc && acc[current]) {
        return acc[current]
      }
      return acc
    }, obj)
  }

  t(key) {
    const keys = key.split('.')
    const translation = this.find(translations, keys)

    if (translation && translation[this.locale]) {
      return translation[this.locale]
    }
    return key
  }
}

export const translator = new Translator(['en', 'ru'])
