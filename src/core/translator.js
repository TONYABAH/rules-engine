// import en from './locales/en'
// import fr from './locales/fr'
// import keywords from '../core/keywords'

export default class Translator {
  constructor (locale, languageModule) {
    this.languageModule = languageModule
    this.keywords = languageModule[locale]
  }
  get (key) {
    const data = this.keywords.errors
    if (data) {
      return data[key]
    }
    return null
  }
  /**
   * Formats template strings substituting placeholders with the arguments
   * @param  {...any} args String arguments
   * @returns String
   */
  format (text, ...args) {
    let msg = Object.assign({}, text)
    let index = 0
    args.forEach((arg) => {
      msg = msg.replace(`{${index}}`, arg)
      index++
    })
    return msg
  }
  /**
   * Translates code into appropriate target language
   * @param {*} code String that is unique to text being translated
   * @returns the Translater object
   */
  translate (code) {
    const data = this.get(code)
    return data
  }
  /**
   * Translates plain test into target language
   * @param {*} text Text to be translated
   * @returns the Translater object
   */
  translatePlain (text, from = 'en') {
    if (!this.languageModule[from] || !this.languageModule[from].errors) {
      console.log(this.format('Language \'{0}\' not implemented', from))
      return text
    }
    let source = this.languageModule[from].errors
    const index = Object.values(source).find((v) => {
      return v === text
    })
    const code = Object.keys(source)[index]
    return this.translate(code)
  }
  /**
   * 
   * @param {String} code Error code to translate
   * @returns Translator object
   */
  to (code) {
    return this.translate(code)
  }
  toPlain (text, from) {
    return this.translatePlain(text, from)
  }
}
