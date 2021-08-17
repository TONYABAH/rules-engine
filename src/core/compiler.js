
import Knowledgebase from './knowledgebase'
import Parser from './parser'

export default class Compiler extends Parser {
  constructor (locale, languageModule) {
    super(locale, languageModule)
    this.languageModule = languageModule
    this.data = {}
  }
  get Data () {
    return this.data
  }
  /**
   * 
   * @param { String } text Pruduction rules in plain text
   * @returns { Promise<Object> } Knowledgebase Data
   */
  async compile (text) {
    let knowledgebase = new Knowledgebase(this)
    const tokens = await this.parse(text)
    this.data = knowledgebase ? knowledgebase.Data : {}
    this.emit('data', { errors: this.errors, data: this.data })
    this.data.languageModule = this.languageModule
    return Promise.resolve(this.data)
  }
}
