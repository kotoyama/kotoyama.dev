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

  t(key, params = {}) {
    const keys = key.split('.')
    const translation = this.find(translations, keys)

    if (translation && translation[this.locale]) {
      let translatedText = translation[this.locale]

      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          const paramPattern = `{{ ${param} }}`
          translatedText = translatedText.replace(paramPattern, params[param])
        }
      }

      return translatedText
    }
    return key
  }
}

export const translator = new Translator(['en', 'ru'])
