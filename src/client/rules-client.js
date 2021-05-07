/*jshint esversion: 6*/
import Validator from '../core/validator'
import { ValidationError } from '../core/custom-errors'
// import ErrorKeys from '../core/error-keys'
// import { translateKey } from '../core/translate'
import EventBus from '../core/events.js'
import FetchClient from './fetch-client'
import { keys as ErrorKeys, Translator } from '../translation'
export default class Client extends EventBus {
  constructor (language) {
    super()
    this.language = language
    this.data = null
    this.prompt
    this.url = 'rules.com:8080/engine'
    this.authUrl = 'rules.com:8080'
    this.token = null
    this.validator = new Validator(this.language)
    this.fetchClient = new FetchClient(this.language)
  }
  raiseValidationError(key) {
    const message = translateKey(key, this.language)
    return new ValidationError(message, key)
  }
  validate (input) {
    let result = this.validator.validate(input, this.prompt, this.language)

    if (result instanceof ValidationError) {
      return this.raiseValidationError(ErrorKeys.NoInput)
    }
    return true
  }

  process (response) {
    if (response.Label === 'Prompt' || response.Label === 'CF') {//Prompting for input
      this.prompt = response
      this.fire('prompt', this.prompt)
      return ({ 'prompt': response })
    } else if (response instanceof Array) {//answers are ready
      this.answers = response
      this.fire('answers', this.prompt)
      return ({ 'answers': response })
    } else if (response.status !== 200) {
      this.fire('error', this.prompt)
      return ({ 'error': response.data })
    } else {
      this.fire('msg', this.prompt)
      return ({ 'msg': response })
    }
  }

  repeat () {
    if (!this.data) {
      return this.raiseValidationError(ErrorKeys.KnowledgebaseNotFound)
    }
    this.run()
  }

  async start () {
    try {
      this.token = await this.fetchClient.getToken(this.authUrl, this.apiKey)
      return await this.run()
    } catch (e) {
      this.fire('error', e.message)
    }
  }

  async run () {
    if (!this.token) {
      return this.raiseValidationError(ErrorKeys.TokenRequired)
    }
    try {
      let response = await this.fetchClient.getEngine(this.url, this.token)
      return this.process(response)
    } catch (e) {
      this.fire('error', e.message)
    }
  }

  async reply (input) {
    if (!input || input.toString().trim().length === 0) {
      return this.raiseValidationError(ErrorKeys.NoInput)
    }
    if (!this.token) {
      return this.raiseValidationError(ErrorKeys.TokenExpired)
    }
    try {
      const invalid = this.validate(input) 
      if (invalid instanceof ValidationError) {
        return invalid
      }
      let response = await this.fetchClient.postEngine(this.url, this.token, { input })
      return this.process(response)
    } catch (e) {
      this.fire('error', e.message)
    } 
  }
}
