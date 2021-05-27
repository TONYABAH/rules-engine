
import {
  RULE, ELSE, ELSEIF, THEN, AND, OR, IF, PROMPT, QUESTION, MENU, LINE, ATTR,
  /* CF, DIGIT, YES, NO, TRUE, FALSE, NUM, MIN, MAX, ARRAY, ATTR, CONST, FUNC,
  ATTRIBUTE, TITLE, SUMMARY, GOAL, LINE, ERROR, EOF, LPAREN, RPAREN, TIMES,
  COMMA, GT, LT, EQ, TEXT, NOT, IN, EX, IS, REM, COMMENT, SPACE, MOD, LBRACKET, CARRET, */
} from './token-constants'

const ParseToken = function (self) {
  return {
    rule (token) {
      if (
        self.prev === null ||
        self.prev === MENU ||
        self.prev === THEN ||
        self.prev === ELSE ||
        self.prev === AND
      ) {
        self.prev = RULE
        const r = self.scanRule()
        self.emit('rule', [r, self.row], this)
        return true
      }
    },
    if () {
      if (self.prev === RULE) {
        self.prev = IF
        const p = self.scanPremise()
        if (!p) return
        const { left, right, op } = p
        self.emit('condition', [IF, left, right, self.row, op], this)
        return true
      }
    },
    or () {
      if (
        self.prev === IF ||
        self.prev === ELSEIF ||
        self.prev === OR ||
        self.prev === AND
      ) {
        self.prev = OR
        const p = self.scanPremise()
        if (!p) return
        const { left, right, op } = p
        self.emit('premise', [OR, left, right, self.row, op], this)
        return true
      }
    },
    and () {
      if (
        self.prev === IF ||
        self.prev === ELSEIF ||
        self.prev === THEN ||
        self.prev === ELSE ||
        self.prev === AND
      ) {
        self.prev = AND
        if (self.prev === THEN) {
          const p = self.scanInference()
          if (!p) return
          const { name, right } = p
          self.emit('inference', [name, right, false, self.row], this)
          return true
        } else if (self.prev === ELSE) {
          const p = self.scanInference()
          if (!p) return
          const { name, right } = p
          self.emit('inference', [name, right, false, self.row], this)
          return true
        } else {
          const p = self.scanPremise()
          if (!p) return
          const { left, right, op } = p
          self.emit('premise', [AND, left, right, self.row, op], this)
          return true
        }
      }
    },
    then (token) {
      // console.log(self.prev, token)
      if (
        self.prev === IF ||
        self.prev === ELSEIF ||
        self.prev === OR ||
        self.prev === AND
      ) {
        self.prev = THEN
        const p = self.scanInference()
        if (!p) return false
        const { name, right } = p
        self.emit('inference', [name, right, false, self.row], this)
        return true
      }
    },
    elseif (token) {
      if (self.prev === THEN ||
        self.prev === AND ||
        self.prev === ELSE
      ) {
        self.prev = ELSEIF
        // console.log(token)
        const p = self.scanPremise()
        if (!p) return
        const { left, right, op } = p
        self.emit('condition', [ELSEIF, left, right, self.row, op], this)
        return true
      }
    },
    else () {
      if (self.prev === THEN || self.prev === AND) {
        self.prev = ELSE
        const f = self.scanInference()
        if (!f) return
        const { name, right } = f
        self.emit('inference', [name, right, true, self.row], this)
        return true
      }
    },
    prompt () {
      if (
        self.prev === null ||
        self.prev === MENU ||
        self.prev === THEN ||
        self.prev === ELSE) {
        self.prev = PROMPT
        const p = self.scanPrompt()
        self.emit('prompt', [p, self.row], this)
        return true
      }
    },
    question () {
      if (self.prev === PROMPT) {
        self.prev = QUESTION
        const q = self.scanQuestion()
        self.emit('question', [q, self.row], this)
        return true
      }
    },
    menu () {
      if (self.prev === QUESTION) {
        self.prev = MENU
        const m = self.scanMenu()
        self.emit('menu', [m, self.row], this)
        return this
      }
    },
    digit () {
      if (self.prev === QUESTION) {
        self.prev = MENU
        self.scanDigit()
        self.emit('digit', [self.row], this)
        return true
      }
    },
    text () {
      if (self.prev === QUESTION) {
        self.prev = MENU
        self.scanText()
        self.emit('text', [self.row], this)
        return true
      }
    },
    yes () {
      if (self.prev === QUESTION) {
        self.prev = MENU
        self.scanYesNo()
        self.emit('yes-no', [self.row], this)
        return true
      }
    },
    true () {
      if (self.prev === QUESTION) {
        self.prev = MENU
        self.scanTrueFalse()
        self.emit('true-false', [self.row], this)
        return true
      }
    },
    min () {
      if (self.prev === MENU) {
        const min = self.scanMin()
        self.pos--
        if (min) {
          self.emit('min', [min, self.row], this)
        }
        return true
      }
    },
    max () {
      if (self.prev === MENU) {
        const max = self.scanMax()
        self.pos--
        if (max) {
          self.emit('max', [max, self.row], this)
        }
        return true
      }
    },
    cf () {
      if (self.prev === MENU) {
        self.emit('cf', [self.row], this)
        return true
      }
    },
    mod () {
      if (self.prev === MENU) {
        self.emit('cf', [self.row], this)
        return true
      }
    },
    attribute () {
      const attribute = self.scanAttribute()
      self.emit('attribute', [attribute, self.row], this)
      return true
    },
    goal (token) {
      if (
        self.prev === null ||
        self.prev === MENU ||
        self.prev === THEN ||
        self.prev === ELSE
      ) {
        if (self.lastToken.type === LINE) {
          const goal = self.scanGoal()
          if (goal) {
            self.emit('goal', [goal, self.row], this)
          }
          return true
        }
      }
    },
    array () {
      if (
        self.prev === null ||
        self.prev === MENU ||
        self.prev === THEN ||
        self.prev === ELSE
      ) {
        const array = self.scanArray()
        self.emit('array', [array, self.row], this)
        return true
      }
    },
    title () {
      if (self.prev === null) {
        const title = self.scanTitle()
        self.emit('title', [title, self.row], this)
        return true
      }
    },
    summary () {
      if (self.prev === null) {
        const summary = self.scanSummary()
        self.emit('summary', [summary, self.row], this)
        return true
      }
    },
    line () {
      self.emit('line', [self.row], this)
      return true
    },
    eof () {
      // End of file
      self.emit('eof', [self.row], this)
      return true
    },
    error () {
      self.error('Unknown character or token: ' + token.value, token)
      return true
    }
  }
}
export default ParseToken
