/* jshint esversion:8 */

import {
  YES, NO, TRUE, FALSE, RULE, ELSE, ELSEIF, THEN, AND, OR, IF, CF,
  PROMPT, QUESTION, DIGIT, MENU, NUM, MIN, MAX, ARRAY, ATTR, CONST, FUNC,
  ATTRIBUTE, TITLE, SUMMARY, GOAL, LINE, ERROR, EOF, LPAREN, RPAREN, TIMES,
  COMMA, GT, LT, EQ, TEXT, NOT, IN, EX, IS, REM, COMMENT, SPACE, MOD, LBRACKET, CARRET,
} from './token-constants'
import CustomEvent from './events'
import keywords from './keywords'
import Lexer from './Lexer'
import { MATH_CONSTS, MATH_FUNCS } from './regex'

const ParseToken = function (self) {
  // let self.prev = null
  return {
    rule () {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE || self.prev === AND) {
        self.prev = RULE
        const r = self.scanRule()
        self.emit('rule', [r, self.row], this)
        return true
      }
    },
    if () {
      if (self.prev === RULE) {
        self.prev = IF
        const [left, right, op] = self.scanPremise()
        self.emit('condition', [IF, left, right, self.row, op], this)
        return true
      }
    },
    or () {
      if (self.prev === IF || self.prev === ELSEIF || self.prev === OR || self.prev === AND) {
        self.prev = OR
        const [left, right, op] = self.scanPremise()
        self.emit('premise', [OR, left, right, self.row, op], this)
        return true
      }
    },
    and () {
      if (self.prev === IF || self.prev === ELSEIF || self.prev === THEN || self.prev === ELSE || self.prev === AND) {

        if (self.prev === THEN) {
          const [name, right] = self.scanInference()
          self.emit('inference', [name, right, false, self.row], this)
        } else if (self.prev === ELSE) {
          const [name, right] = self.scanInference()
          self.emit('inference', [name, right, false, self.row], this)
        } else {
          const [left, right, op] = self.scanPremise()
          self.emit('premise', [AND, left, right, self.row, op], this)
        }
        self.prev = AND
        return true
      }
    },
    then () {
      if (self.prev === IF || self.prev === ELSEIF || self.prev === OR || self.prev === AND) {
        self.prev = THEN
        // console.log( self.pos, self.prev, self.row )
        const [name, right] = self.scanInference()
        self.emit('inference', [name, right, false, self.row], this)
        return true
      }
    },
    elseif () {
      if (self.prev === THEN || self.prev === AND || self.prev === ELSE) {
        self.prev = IF
        const [left, right, op] = self.scanPremise()
        self.emit('condition', [ELSEIF, left, right, self.row, op], this)
        return true
      }
    },
    else () {
      if (self.prev === THEN || self.prev === AND) {
        self.prev = ELSE
        const [name, right] = self.scanInference()
        self.emit('inference', [name, right, true, self.row], this)
        return true
      }
    },
    prompt () {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
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
    goal () {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
        const goal = self.scanGoal()
        self.emit('goal', [goal, self.row], this)
        return true
      }
    },
    array () {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
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
      // New line \n
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
/**
 * Laguage grammar parser. Parser is language neutral, 
 * it does not know in which language the rules are written
 */
export default class Parser extends CustomEvent {
  /**
    * Constructor 
    */
  constructor (language = 'en') {
    super()
    this.language = language
    this.keywords = keywords[language.toLowerCase()]
    this.keyMap = Object.keys(this.keywords)
    this.keyValues = Object.values(this.keywords)
    this.tokens = []
    this.prev = null
    this.parseToken = ParseToken(this)
    // this.init()
  }
  get Errors () {
    return this.errors
  }
  get Event () {
    return super.prototype
  }
  init () {
    this.row = 0
    this.col = 0
    this.errors = []
    this.attributes = {},
    this.prompts = {},
    this.inferences = []
    this.knowledgebase = null
    this.data = null
  }
  matchCloseParenthesis (tokens, startIndex) {
    let $return = -1
    let left = 0
    let right = 0
    for (let i = startIndex; i < tokens.length; i++) {
      const s = tokens[i].value
      if (s === '(') {
        left++
      } else if (s === ')') {
        right++
      }
      if (left > 0 && left === right) {
        $return = i
        break
      }
    }
    return $return
  }
  matchOpenParenthesis (tokens, startIndex) {
    let $return = -1
    let left = 0
    let right = 0
    for (let i = startIndex; i >= 0; i--) {
      const s = tokens[i].value
      if (s === '(') {
        left++
      } else if (s === ')') {
        right++
      }
      if (left > 0 && left === right) {
        $return = i
        break
      }
    }
    return $return
  }
  matchParenthesis (tokens) {
    if (!tokens) return
    this.matchBrackets(tokens)
    const open = '('
    const close = ')'
    const opens = []
    const closes = []
    for (let i = 0; i < tokens.length; i++) {
      const c = tokens[i].value
      if (c === open) {
        opens.push([i, c])
      } else if (c === close) {
        closes.push([i, c])
      }
    }

    for (let i = opens.length - 1; i >= 0; i--) {
      const match = this.matchCloseParenthesis(tokens, opens[i][0])
      if (match === -1) {
        const msg = 'Open parenthesis \'{0}\' at column {1} has no close parenthesis'
        this.error(msg)
        break
      }
    }
    for (let i = 0; i < closes.length; i++) {
      // let c = closes[i][1];
      const index = closes[i][0]
      const match = this.matchOpenParenthesis(tokens, index)
      if (match === -1) {
        const msg = 'Close parenthesis \'{0}\' at column {1} has no opening parenthesis'
        this.error(msg)
        break
      }
    }
  }
  matchCloseBracket (tokens, startIndex) {
    let $return = -1
    let left = 0
    let right = 0
    for (let i = startIndex; i < tokens.length; i++) {
      const s = tokens[i].value
      if (s === '[') {
        left++
      } else if (s === ']') {
        right++
      }
      if (left > 0 && left === right) {
        $return = i
        break
      }
    }
    return $return
  }
  matchOpenBracket (tokens, startIndex) {
    let $return = -1
    let left = 0
    let right = 0
    for (let i = startIndex; i >= 0; i--) {
      const s = tokens[i].value
      if (s === '[') {
        left++
      } else if (s === ']') {
        right++
      }
      if (left > 0 && left === right) {
        $return = i
        break
      }
    }
    return $return
  }
  matchBrackets (tokens) {
    if (!tokens) return
    const open = '['
    const close = ']'
    const opens = []
    const closes = []
    for (let i = 0; i < tokens.length; i++) {
      const c = tokens[i].value
      if (c === open) {
        opens.push([i, c])
      } else if (c === close) {
        closes.push([i, c])
      }
    }

    for (let i = opens.length - 1; i >= 0; i--) {
      const match = this.matchCloseBracket(tokens, opens[i][0])
      if (match === -1) {
        const msg = 'Open bracket \'{0}\' at column {1} has no close bracket'
        this.error(msg)
        break
      }
    }
    for (let i = 0; i < closes.length; i++) {
      const index = closes[i][0]
      const match = this.matchOpenBracket(tokens, index)
      if (match === -1) {
        const msg = 'Close bracket \'{0}\' at column {1} has no opening bracket'
        this.error(msg)
        break
      }
    }
  }
  matchDuplicateOperator (token) {
    if (!token) return
    if (token.value.toString().match(/[+\-*/]/)) {
      const next = this.peek()
      if (next && next.value.toString().match(/[+\-*/]/)) {
        this.error('Duplicate operator ' + token.value + ' ' + next.value, token)
        return
      }
    }
  }
  scanRule () {
    const tokens = []
    let token = null// this.eat('RULE');
    while ((token = this.tokens[this.pos]) && token.type !== LINE && token.type !== EOF) {
      tokens.push(token.value)
      this.advance()
    }
    const text = tokens.join(' ')
    const result = `${text}`
    return result
  }
  scanDefinition (type, name) {
    this.eat(type)
    const tokens = []
    let token = this.devour()
    if (!token) {
      return this.error('definition should have texts', token)
    }
    do {
      tokens.push(token.value)
      this.advance()
      token = this.devour()
    } while (token && (token.type !== LINE))

    if (tokens.length === 0) {
      return this.error(name + ' definition should have texts', token)
    }
    return tokens.join(' ')
  }
  scanTitle () {
    const title = this.scanDefinition(TITLE, keywords.TITLE)

    return title
  }
  scanSummary () {
    const sum = this.scanDefinition(SUMMARY, keywords.SUMMARY)
    return sum
  }
  scanQuestion () {
    const ques = this.scanDefinition(QUESTION, keywords.QUESTION)
    return ques
  }
  scanAttribute () {
    // then attribute equal expression
    this.eat(ATTRIBUTE)
    const left = this.eat(ATTR)
    if (!left) {
      return this.error('Attribute definition should have Attribute Name')
    }
    const equal = this.eat(EQ)
    if (!equal) {
      return this.error('Expected =')
    }
    const right = this.rightNode()
    if (right.type === EOF) {
      return this.error('Expected expression but found end of file', right)
    } else if (right.type === LINE) {
      return this.error('Expected expression but found new line', right)
    }
    this.matchParenthesis(left)
    this.matchParenthesis(right)
    const rt = right.map((n) => n.value)
    this.assignGlobal(left.value, rt.join(' '), right[0].row, right[0].column, true)
    return [left.value, right]
  }
  scanArray () {
    const node = this.eat(ARRAY)
    if (!node) {
      return this.error('Expected array name')
    }
    const equal = this.eat(EQ)
    if (!equal) {
      return this.error('Expected =')
    }
    // let token=null;
    const tokens = []
    const lparen = this.eat(LPAREN)
    if (!lparen) {
      return this.error('Expected (')
    }
    // tokens.push(lparen);
    while (this.peek() && this.peek().type !== LINE && this.peek().type !== EOF) {
      let token = this.tokens[this.pos]
      if (!token || (token.type !== NUM && token.type !== ATTR)) {
        return this.error('Expected number or Attribute')
      }
      tokens.push(token)
      token = this.eat(COMMA)
      if (!token) {
        return this.error('Expected ,')
      }
      tokens.push(token)
    }
    const rparen = tokens.pop()
    if (rparen && rparen.type !== RPAREN) {
      return this.error('Expected ) but found new line')
    }
    this.assignGlobal(node.value, node.value, node.row, node.column)
    return [node, tokens, ARRAY]
  }
  scanGoal () {
    this.eat(GOAL)
    const g = this.eat(ATTR)
    if (!g) {
      return this.error('Goal definition should have texts')
    }

    return g.value
  }
  scanPrompt () {
    this.eat(PROMPT)
    const prompt = this.eat(ATTR)
    if (!prompt) {
      return this.error('Prompt definition should have texts')
    }
    this.prompts[prompt.value.toLocaleLowerCase()] = prompt.value

    return prompt.value
  }
  scanMenu () {
    this.eat(MENU)
    const tokens = []
    const lparen = this.eat(LPAREN)
    if (!lparen) {
      return this.error('Expected (')
    }
    let token
    while ((token = this.tokens[this.pos]) &&
      token.type !== RPAREN && token.type !== LINE && token.type !== EOF) {
      if (!token || (token.type !== NUM && token.type !== ATTR &&
        token.type !== YES && token.type !== NO &&
        token.type !== TRUE && token.type !== FALSE
      )) {
        return this.error('Expected number or Attribute')
      }
      tokens.push(token)
      if (this.peek().type === RPAREN) {
        this.advance()
        break
      }
      this.advance()
      this.eat(COMMA)
    }
    const menu = tokens.map((m) => m.value)
    return menu
  }
  scanYesNo () {
    let next = this.peek()
    this.eat(YES)
    if (next && next.type === COMMA) {
      this.eat(COMMA)
    }
    this.eat(NO)
  }
  scanTrueFalse () {
    let next = this.peek()
    this.eat(TRUE)

    if (next && next.type === COMMA) {
      this.eat(COMMA)
    }
    this.eat(FALSE)
  }
  scanDigit () {
    this.eat(DIGIT)
  }
  scanText () {
    this.eat(TEXT)
  }
  scanMin () {
    this.eat(MIN)
    const min = this.eat(NUM)
    return min
  }
  scanMax () {
    this.eat(MAX)
    const max = this.eat(NUM)
    return max
  }

  /*scanCF () {
    if ( this.peek() && this.peek().type  ===  this.CF ) {
      this.advance()
      // cf = true;
    }
    if ( this.peek() && this.peek().type !== LINE ) {
      this.error( 'Expected end of line but found ' + this.peek().value )
    }
  }*/
  scanInference () {
    this.advance()
    const name = this.leftAttribute()
    let right = null
    let nextToken = this.devour()
    let comparator = nextToken
    if (!comparator) {
      return this.error('Expected expression but found end of line')
    }
    switch (nextToken.type) {
      case EQ:
      case GT:
      case LT:
      case NOT:
      case IS:
      case IN:
      case EX:
        this.advance()
        right = this.rightNode()
        if (comparator) {
          if (right.type === EOF) {
            return this.error('Expected expression but found end of file', right)
          } else if (right.type === LINE) {
            return this.error('Expected expression but found new line', right)
          }
          this.matchParenthesis(right)
        }
        break
      default:
        comparator = null
    }
    let _right = Object.assign({}, name)
    if (!right) {
      _right.type = TRUE
      _right.value = this.keywords[TRUE]
    }
    return [name, right || [_right]]
  }
  scanPremise () {
    this.advance()
    const left = this.leftNode()
    let nextToken = this.devour()
    let comparator = nextToken
    if (!comparator) {
      return this.error('Expected expression but found end of line')
    }
    this.matchParenthesis(left)
    let comp = null
    let right = []

    switch (this.devour().type) {
      case EQ:
      case GT:
      case LT:
      case NOT:
      case IS:
      case IN:
      case EX:
        this.advance()
        comp = comparator.type
        right = this.rightNode()
        this.matchParenthesis(right)
        if (comparator) {
          if (right.type === EOF) {
            return this.error('Expected expression but found end of file', right)
          } else if (right.type === LINE) {
            return this.error('Expected expression but found new line', right)
          }
          this.matchParenthesis(right)
        }
        break
      case AND:
      case OR:
        this.pos--
        break
      default:
        comparator = null
    }

    if (left.length == 0) {
      this.error('Expected expression but found end of line')
    }
    left.forEach((token) => {
      if (token.type === ATTR) {
        if (!(this.attributes[token.value.toLocaleLowerCase()])) {
          this.assignGlobal(token.value, null, token.row, token.column)
        }
      }
    })

    if (!right || right.length === 0) {
      let _right = Object.assign({}, {})
      _right.type = TRUE
      _right.value = this.keywords[TRUE]
      right = [_right]
    }
    return [left, right, comp || EQ]
  }

  peek () {
    const peek_pos = this.pos + 1
    if (peek_pos > this.tokens.length - 1) {
      return null
    }
    return this.tokens[peek_pos]

  }
  trace () {
    const trace_pos = this.pos - 1
    if (trace_pos < 0) {
      return null
    }
    return this.tokens[trace_pos]

  }
  devour () {
    const token = this.tokens[this.pos]
    return token
  }
  eat (type) {
    const token = this.tokens[this.pos]
    if (token && (token.type === type)) {
      this.advance()
      return token
    }
    return this.error('Expected ' + type + ' but found ' + JSON.stringify(token))
  }
  advance () {
    this.pos += 1
  }
  rightNode () {
    const result = []
    let token = this.tokens[this.pos]
    while (token && (token.type !== LINE && token.type !== EOF)) {
      switch (token.type) {
        case EQ:
        case GT:
        case LT:
        case NOT:
        case IS:
        case IN:
        case EX:
          return this.error('Duplicate comparator ' + token.value)
        case AND:
        case OR:
          return result
        default:
          this.matchDuplicateOperator(token)
          result.push(token)
          this.advance()
          token = this.tokens[this.pos]
      }
    }
    return result
  }
  leftNode () {
    const result = []
    let token = this.tokens[this.pos]

    while (token && (token.type !== LINE && token.type !== EOF)) {
      if (token.type === ERROR) {
        this.error('Error', token)
      }
      switch (token.type) {
        case EQ:
        case GT:
        case LT:
        case NOT:
        case IS:
        case IN:
        case EX:
          return result
        case AND:
        case OR:
          return result
        default:
          // do nothing
          this.matchDuplicateOperator(token)
          result.push(token)
          this.advance()
          token = this.tokens[this.pos]
      }
    }
    return result // may never be reached
  }
  leftAttribute () {
    const token = this.eat(ATTR)
    if (!token) {
      return this.error('Expected attribute')
    }
    this.inferences[token.value.toLocaleLowerCase()] = token

    return token // may never be reached
  }
  comparator () {
    const token = this.tokens[this.pos]
    switch (token.type) {
      case EQ:
      case GT:
      case LT:
      case NOT:
      case IS:
      case IN:
      case EX:
        break
      default:
        this.warn('Expected comparator but found ' + token.value + ' ' + token.row)
    }
    this.advance()

    return token
  }
  assignGlobal (name, value, row, col, inf) {
    this.attributes[name.toLocaleLowerCase()] = {
      name: name,
      value: value,
      row: row,
      col: col,
    }
    if (inf) {
      this.inferences[name.toLocaleLowerCase()] = name
    }
  }
  checkVarableDeclarations () {
    Object.keys(this.attributes).forEach((k) => {
      const a = this.attributes[k]
      if (!(this.inferences[k] || this.prompts[k])) {
        this.warn('No input prompt for attribute ' + k, a)
      }
    })
  }
  warn (msg, token) {
    const w = {
      type: 'warning', // "error"|"warning"|"info"
      row: token ? token.row : this.row, // row index
      column: token ? token.col : this.col, // character index on line
      text: msg, // Error message
      raw: '', // "Missing semicolon"
    }
    this.errors.push(w)
    this.emit('warning', w, this)
  }
  error (msg, token) {
    const e = {
      type: 'error', // "error"|"warning"|"info"
      row: token ? token.row : this.row, // row index
      column: token ? token.col : this.col, // character index on line
      text: msg, // Error message
      raw: token, // "Missing semicolon"
    }

    this.errors.push(e)
    this.emit('error', e, this)
  }
  /* raiseError (token) {
    // let translated =  Translator(this.language).translate(arguments);
    this.errors.push({
      type: 'error', // "error"|"warning"|"info"
      row: token.row, // row index
      column: token.column, // character index on line
      text: token.value, // Error message
      raw: token.value, // "Missing semicolon"
    })
  } */
  info (msg, token) {
    const i = {
      type: 'info', // "error"|"warning"|"info"
      row: token ? token.row : this.row, // row index
      column: token ? token.col : this.col, // character index on line
      text: msg, // Error message
      raw: token, // "Missing semicolon"
    }
    this.errors.push(i)
    this.emit('info', i, this)
  }

  filterKeywords () {
    let tokens = []
    for (let i = 0; i < this.tokens.length; i++) {
      let token = this.tokens[i]
      if (token.type === ATTR) {
        //let found = this.keyValues.findIndex(v => v.toUpperCase() === token.value.toUpperCase())
        let key = this.keyMap.find(k => this.keywords[k].toUpperCase() === token.value.toUpperCase())
        if (key) {
          let tk = Object.assign({}, token)
          tk.type = key
          tokens.push(tk)

          continue
        }
      }
      tokens.push(token)
    }
    this.tokens = tokens
  }

  transform () {
    let transformed = []
    this.filterKeywords()

    for (let i = 0; i < this.tokens.length; i++) {
      let token = this.tokens[i]
      if (token.type === EOF) break
      let phrase = []

      if (token.type === ATTR) {
        let row = token.row
        let col = token.column
        do {
          phrase.push(token.value)
          i++
          token = this.tokens[i]
        } while (token && (token.type === ATTR || token.type == NUM))

        let attr = phrase.join(' ')
        transformed.push({ type: ATTR, value: attr, row: row, column: col })
        i-- // Go back to last token (tokens[i])
      } else if (token.type === ELSE && this.tokens[i + 1] && this.tokens[i + 1].type === IF) {
        let next = this.tokens[i + 1]
        let t = Object.assign({}, token)
        t.type = ELSEIF
        t.value = t.value + ' ' + next.value
        transformed.push(t)
        i++ // Skip the next Token (IF)
      } else {
        transformed.push(token)
      }
    }
    this.tokens = transformed
  }

  applyMaths () {
    let _tokens = []

    for (let i = 0; i < this.tokens.length; i++) {
      let math = null
      let current = this.tokens[i]
      const t = this.tokens[i + 1]
      if (t && t.type === LPAREN && current.type === ATTR && MATH_FUNCS[current.value]) {
        math = Object.assign({}, current)
        math.type = FUNC
        _tokens.push(math)
      } else if (current.type === ATTR && MATH_CONSTS[current.value]) {
        math = Object.assign({}, current)
        math.type = CONST
        _tokens.push(math)
      } else {
        _tokens.push(current)
      }
    }

    let finalTokens = []
    for (let i = 0; i < _tokens.length; i++) {
      let math = null
      let current = _tokens[i]
      const t = _tokens[i + 1]
      const nextToken = _tokens[i + 2]
      if ((current.type === ATTR || current.type === NUM || current.type === CONST) &&
        (t.type === LPAREN || t.type === LBRACKET)) {

        finalTokens.push(current)

        let key = this.keyMap.find(k => this.keywords[k].toUpperCase() === current.value.toUpperCase())
        if (!key) {
          math = Object.assign({}, current)
          math.type = TIMES
          math.value = '*'
          // finalTokens.push(current)
          finalTokens.push(math)
        }
      } else if ((nextToken &&
        (nextToken.type === ATTR || nextToken.type === NUM || nextToken.type === CONST)) &&
        (current.type === ATTR || current.type === NUM || current.type === CONST) &&
        (t.type === CARRET)) {
        let pow = Object.assign({}, current)
        pow.type = 'FUNC'
        pow.value = 'pow'

        let paren = Object.assign({}, current)
        paren.type = LPAREN
        paren.value = '('

        let rparen = Object.assign({}, current)
        rparen.type = RPAREN
        rparen.value = ')'

        let comma = Object.assign({}, current)
        comma.type = COMMA
        comma.value = ','

        finalTokens.push(pow)
        finalTokens.push(paren)
        finalTokens.push(current)
        finalTokens.push(comma)
        finalTokens.push(nextToken)
        finalTokens.push(rparen)
        i++
        i++

      } else {
        finalTokens.push(current)
      }
    }
    // console.log( finalTokens )
    this.tokens = finalTokens
  }
  filterComment () {
    return this.tokens.filter((token) => token.type !== REM && token.type !== COMMENT)
  }

  /**
     * Recursively go through tokens and emmit events using implementation of
     * Finite State Machine (FST)
     * @param {JSON} tokens 
     * @returns {String} errors if any including warning and info
     */
  parse (text) {
    this.init()
    this.pos = 0
    let tokenizer = new Lexer(this.language)
    let tokens = tokenizer.tokenize(text)
    this.tokens = tokens.filter(token => token.type !== SPACE && token.type !== REM)
    this.applyMaths()
    this.transform()

    // this.tokens.forEach( (token) => {
    for (this.pos = 0; this.pos < this.tokens.length; this.pos++) {
      const token = this.tokens[this.pos]
      this.row = token.row
      this.col = token.column
      const type = token.type
    
      if (type === REM || type === COMMENT) {
        continue
      }
      const action = this.parseToken[type.toLowerCase()]
      try {
        if (action) {
          // call the method to parse token
          const result = action() // this.parseToken[type.toLowerCase()]()
          if (!result) {
            this.error('Invalid token or keyword: ' + token.value, token)
          }
        } else {
          this.error('Invalid token or keyword: ' + token.value, token)
        }
      } catch (e) {
        console.log(e)
        throw e
      }
    }
    this.checkVarableDeclarations()
    this.emit('done', { errors: this.errors, tokens: this.tokens })
    return this.tokens
  }
}
