
import Knowledgebase from './knowledgebase'
import Parser from './parser'

export default class Compiler extends Parser {
  constructor (language) {
    super(language)
    this.data = {}
  }
  get Data () {
    return this.data
  }
  compile (text) {
    let knowledgebase = new Knowledgebase(this)
    this.parse(text)
    this.data = knowledgebase ? knowledgebase.Data : {}
    this.emit('data', { errors: this.errors, data: this.data })
    return this.data
  }
}
