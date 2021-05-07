/* jshint esversion:8*/
import { ValidationError } from './custom-errors'
import { keys, Translator } from '../translation'

export default class Validator extends Translator {
  constructor (language = 'en') {
    super(language)
    this.language = language
  }

  raiseValidationError (key) {
    const message = this.t(key).data
    // translateKey(key, this.language)
    return new ValidationError(message, key)
  }

  validateCF (input, prompt) {
    const num = input
    if (isNaN(num)) {
      return this.raiseValidationError(keys.InvalidSelection)
    }
    if (num == 0) {
      return this.raiseValidationError(keys.InvalidSelection)
    } else if (num < 1) {
      return this.raiseValidationError(keys.InvalidSelection)
    } else if (num > prompt.Menu.length) {
      return this.raiseValidationError(keys.InvalidSelection)
    }
  }

  validateMenu (input, prompt) {
    if (input.length === 0) {
      return this.raiseValidationError(keys.NoSelection)
    } else if (input.length < prompt.Min) {
      return this.raiseValidationError(keys.SelectionsBelowRange)
    } else if (input.length > prompt.Max) {
      return this.raiseValidationError(keys.SelectionsAboveRange)
    }

    input.forEach((num) => {
      if (isNaN(num)) {
        return this.raiseValidationError(keys.InvalidSelection)
      } else if (num == 0) {
        return this.raiseValidationError(keys.InvalidSelection)
      } else if (num < 0) {
        return this.raiseValidationError(keys.InvalidSelection)
      } else if (num > prompt.Menu.length) {
        return this.raiseValidationError(keys.InvalidSelection)
      }
    })
  }

  validateText (input, prompt) {
    if (input.length < prompt.Min) {
      return this.raiseValidationError(keys.CharactersBelowRange)
    } else if (input.length > prompt.Max) {
      return this.raiseValidationError(keys.CharactersAboveRange)
    }
  }

  validateNumeric (input, prompt) {
    const num = Number(input)
    if (isNaN(num)) {
      return this.raiseValidationError(keys.NumberRequired)
    }

    if (!prompt.Max && !prompt.Min) return null

    if (num < prompt.Min) {
      return this.raiseValidationError(keys.NumberBelowRange)
    } else if (num > prompt.Max) {
      return this.raiseValidationError(keys.NumberAboveRange)
    }
  }

  /** *
   * Validates input to the system. This is the entry point of the validation module.
   * Depending on the type of input (menu, number, text) the input is further submmitted to
   * other methods to complete the validation and return the result.
   * @param {Object} input The input text.
   * @return {String}
   */
  validate (input, prompt) {
    
    if (!prompt.Type) {
      return this.raiseValidationError(keys.NoActiveSession)
    }
    if (!input || input.toString().trim().length === 0) {
      return this.raiseValidationError(keys.NoInput)
    }
    if (prompt.Label.toUpperCase() === 'CF') {
      return this.validateCF(input, prompt)
    }

    switch (prompt.Type.toUpperCase()) {
      case 'MENU':
      case 'YN':
      case 'TF': {
        const values = input.toString().split(',')
        return this.validateMenu(values, prompt)
      }
      case 'NUMBER':
        return this.validateNumeric(input, prompt)
      default:
        return this.validateText(input, prompt)
    }
  }
}
