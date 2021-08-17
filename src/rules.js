import Engine from './core/engine'
import Compiler from './core/compiler'
import Validator from './core/validator' // Validation
import Translator from './core/translator'
import choice from './core/choice'
import languageModules from './core/languageModules'
import ErrorKeys from './translation/keys'
import CustomErrors from './core/custom-errors'
import installedLanguagePlugins from './plugins/language'

export default function rule (locale, locales = []) {
  
  const registerLanguage = (lang, data) => {
    const language = lang.toLocaleLowerCase()
    if (arguments.length < 2) {
      throw new Error('Language name required')
    }
    if (!data) {
      throw new Error('Language data required')
    }
    if (typeof language !== 'string') {
      throw new Error('Language name should be a String')
    }
    if (language.length > 2) {
      throw new Error('Language code should contain only two characters')
    }
    if (!language.match(/[a-z][a-z]/)) {
      throw new Error('Unknown character in language code')
    }
    if (languageModules[language]) {
      throw new Error('Language already installed')
    }
    languageModules[language] = data
    // console.log(languageModule)
    // return this
  }
  try {
    locales.forEach(l => {
      const data = installedLanguagePlugins[l]
      if (data) {
        registerLanguage(l, data)
        console.log('installed language: ' + l)
      } else {
        throw new Error('Locale not installed: ' + l)
      }
    })
   
  } catch (e) {
    console.log(e.message)
  }
 
  const languageModule = languageModules[locale]
  const compiler = new Compiler(locale, languageModule)
  const translator = new Translator(locale, languageModules)
  const validator = new Validator(locale, translator)
  
  const init = function (language) {
    languageModule = languageModules[language]
    validator = new Validator(language)
    compiler = new Compiler(language, languageModule)
    translator = new Translator(languageModule)
  }

  const raiseValidationError = function (code) {
    const err = CustomErrors(translator, locale).ValidationError(code)
    return err
  }
  const raiseSecurityError = function (key) {
    const err = CustomErrors(translator, locale).SecurityError(key)
    return err
  }
  const process = function (response) {
    if (response) return response
    if (response.Label === 'Prompt' || response.Label === 'CF') {//Prompting for input
      return ({ type: 'prompt', data: response })
    } else if (response instanceof Array) {//answers are ready
      return ({ type: 'answers', data: response })
    } else {
      return response
    }
  }
 
  return {
    registerLanguage,
    init: init,
    getKeywords: () => languageModule.keywords,
    parse: async function (codes) {
      const errors = await compiler.parse(codes)
      return errors
    },
    compile: async function (codes) {
      const data = await compiler.compile(codes)
      const errors = compiler.errors
      if (errors && errors.length > 0) {
        Promise.reject(errors)
      } else {
        return data
      }
    },
    repeat: function (data) {
      if (!data) {
        return raiseValidationError(ErrorKeys.KnowledgebaseNotFound)
      }
      return this.run(data)
    },
    run: function (data) {
      if (!data) {
        return raiseValidationError(ErrorKeys.KnowledgebaseNotFound)
      }
      let response = new Engine(data, translator, validator).run()
      return process(response)
    },
    reply: function (data, input) {
      if (!data) {
        return raiseValidationError(ErrorKeys.KnowledgebaseNotFound)
      }
      if (!input || input.toString().trim().length === 0) {
        return raiseValidationError(ErrorKeys.NoInput)
      }
      let response = new Engine(data, translator, validator
      ).input(input)
      return process(response)
    },
    validate: function (input, prompt) {
      return validator.validate(input, prompt)
    },
    choice: function (input, prompt) {
      return choice(input, prompt, locale)
    },
    translate: function (code, to) {
      return translator.translate(code, to)
    },
    translatePlain: function (text, to, from) {
      return translator.translatePlain(text, to, from)
    },
  }
}
