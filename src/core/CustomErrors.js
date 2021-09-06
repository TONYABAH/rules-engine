// import Translator from './translator'
// const translator = new Translator()
export default function CustomErrors (translator, lang = 'en') {

  return {
    CustomError: function (code) {
      const name = "Error"
      const message = translator.to(code, lang)
      return {
        message,
        code,
        name
      }
    },
    ValidationError: function (code) {
      let err = this.CustomError(code)
      err.name = 'ValidationError'
      return err
    },
    SecurityError: function (code) {
      const err = this.CustomError(code)
      err.name = 'SecurityError'
      return err
    },

    DatabaseError: function (code) {
      const err = this.CustomError(code)
      err.name = 'DatabaseError'
      return err
    },

    NetworkError: function (code) {
      const err = this.CustomError(code)
      err.name = 'NetworkError'
      return err
    },

    SyntaxError: function (code) {
      const err = this.CustomError(code)
      err.name = 'SyntaxError'
      return err
    },

    ScriptError: function (code, e) {
      const err = this.CustomError(code)
      err.name = 'ScriptError'
      err.data = e
      return err
    }
  }
}
