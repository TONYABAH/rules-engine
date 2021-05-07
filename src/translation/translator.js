import en from './locales/en'
import fr from './locales/fr'

class Translator {
  constructor (to, from = 'en') {
    this.target = to
    this.source = from
    this.data = null
    this.locales = { en, fr }
  }
  get (code) {
    const locale = this.locales[this.target]
    const key = Object.keys(locale).find((k) => {
      return k === code
    })
    if (key) {
      return locale[k]
    }
    return null
  }
  /**
   * Formats template strings substituting placeholders with the arguments
   * @param  {...any} args String arguments
   * @returns String
   */
  format (...args) {
    let msg = Object.assign({}, this.data)
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
    this.data = this.get(code)
    return this
  }
  /**
   * Translates plain test into target language
   * @param {*} text Text to be translated
   * @returns the Translater object
   */
  translatePlain (text) {
    if (this.to === this.from) {
      this.data = text
      return this
    }
    const index = Object.values(this.source).find((v) => {
      return v === text
    })
    const code = Object.keys(this.source)[index]
    return this.translate(code)
  }
  t (code) {
    return this.translate(code)
  }
  tp (text) {
    return this.translatePlain(text)
  }
}

// let t = new Translater('fr')
// t.translate('foo').format()
export default Translator
