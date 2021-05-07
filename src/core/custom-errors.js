
export class CustomError {
  constructor (message) {
    this.message = message
    this.name = "Error"
    this.code = 0
  }
}

export class ValidationError extends CustomError {
  constructor (message, code) {
    super(message)
    this.code = code
    this.name = 'ValidationError'
  }
}

export class SecurityError extends CustomError {
  constructor (message, code) {
    super(message)
    this.code = code
    this.name = 'SecurityError'
  }
}

export class DatabaseError extends CustomError {
  constructor (message, code) {
    super(message)
    this.code = code
    this.name = 'DatabaseError'
  }
}

export class NetworkError extends CustomError {
  constructor (message, code) {
    super(message)
    this.name = 'NetworkError'
    this.code = code
  }
}

export class SyntaxError extends CustomError {
  constructor (message, code) {
    super(message)
    this.name = 'SyntaxError'
    this.code = code
  }
}

export class ScriptError extends Error {
  constructor (message, e) {
    super(message)
    this.name = 'ScriptError'
    this.code = 'SystemError'
    this.data = e
  }
}

export default {
  ValidationError,
  SecurityError,
  DatabaseError,
  NetworkError,
  ScriptError,
  SyntaxError,
}
