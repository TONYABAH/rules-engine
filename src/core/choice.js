import { ValidationError } from './custom-errors'
import { keys as ErrorKeys, Translator } from '../translation'
// import ErrorKeys from './error-keys'
// import { translateKey } from './translate-XXX'
 const translator = new Translator()
function raiseValidationError(code) {
  const message = translator.translate(code).data
  return new ValidationError(message, code)
}
/**
  * 
  * @param {Array} values Values to map in the original menu
  * @param {JSON} prompt The Current Prompt that has the menu
  * @param {String} language User Language (eg. en, fr, es)
  * @returns {String} Result of the map
  */
export default function map (input, prompt, language = "en") {
  translator.target = language
  if (!input || input.length === 0) {
    return raiseValidationError(ErrorKeys.NoInput)
  }
  if (!prompt) {
    return raiseValidationError(ErrorKeys.NoActiveSession)
  }
  if (prompt.Type === 'NUMBER' || prompt.Type === 'TEXT' || prompt.Type === 'VALUE') {
    return (input && input instanceof Array) ? input[0] : input
  }
  const array = input.toString().trim().split(/,/g)
  const result = [] //array.map((v) => {
  for (let i = 0; i < array.length; i++) {
    const v = array[i]
    if (!prompt.Menu[v - 1]) {
      return raiseValidationError(ErrorKeys.InvalidSelection)
    }
    result.push(prompt.Menu[v - 1].Value)
  }
  return result.length > 0 ? result : null
}
