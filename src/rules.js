import Engine from './core/engine'
import Parser from './core/compiler'
import Validator from './core/validator' // Validation
import choice from './core/choice'
// import ErrorKeys from './core/error-keys' // Error Classes + Error Codes
import { ValidationError, SecurityError } from './core/custom-errors'
import { keys as ErrorKeys, Translator } from './translation'

class Rules extends Translator {
  constructor (language = 'en') {
    super(language)
    this.language = language
    this.validator = new Validator(language)
    this.parser = new Parser(language)
    this.errors = null
  }
  get Errors () {
    this.errors
  }
 
  parse (codes) {
    // const parser = new Parser(this.language)
    return this.parser.compile(codes)
  }
  compile (codes) {
    let data = this.parse(codes)
    this.errors = this.parser.errors
    return data
  }
  repeat (data) {
    if (!data) {
      return this.raiseValidationError(ErrorKeys.KnowledgebaseNotFound)
    }
    return this.run(data)
  }
  run (data) {
    if (!data) {
      return this.raiseValidationError(ErrorKeys.KnowledgebaseNotFound)
    }
    let response = new Engine(data).run()
    return this.process(response)
  }

  reply (data, input) {
    if (!data) {
      return this.raiseValidationError(ErrorKeys.KnowledgebaseNotFound)
    }
    if (!input || input.toString().trim().length === 0) {
      return this.raiseValidationError(ErrorKeys.NoInput)
    }
    let response = new Engine(data).input(input)
    return this.process(response)
  }

  process (response) {
    if (response) return response
    if (response.Label === 'Prompt' || response.Label === 'CF') {//Prompting for input
      return ({ type: 'prompt', data: response })
    } else if (response instanceof Array) {//answers are ready
      return ({ type: 'answers', data: response })
    } else {
      return response
    }
  }
  validate (input, prompt) {
    return this.validator.validate(input, prompt)
  }
  choice (input, prompt) {
    return choice(input, prompt, this.language)
  }
  raiseValidationError (code) {
    const message = this.t(code)
    const err = new ValidationError(message, code)
    return err
  }
  static raiseSecurityError (key) {
    const message = t(code, language)
    const err = new SecurityError(message, key)
    return err
  }
}
// export { Parser, KEYWORDS, RulesEngine }
export default Rules
