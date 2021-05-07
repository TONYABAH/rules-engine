import Parser from './parser'
import ResParser from './res-parser'
const defaults = { lang: 'en', mode: 'kbf' }

export default class ParserFactory {

  static create ({ lang, mode } = defaults ) {
    switch ( mode ) {
      case 'res':
        return new ResParser(lang)
      default:
        return new Parser(lang)
    }
  }
  static getInstance () {
    return this.create
  }
}
