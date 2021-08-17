import Parser from './parser'
import ResParser from './res-parser'
const defaults = { lang: 'en', mode: 'kbf' }

export default class ParserFactory {

  static create ({ lang, mode } = defaults ) {
    switch ( mode ) {
      case '.res':
        return new ResParser(lang)
      case '.kbf':
        return new Parser(lang)
      default:
       throw new Error('No parser for current mode: ' + mode)
    }
  }
  static getInstance () {
    return this.create
  }
}
