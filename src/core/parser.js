/* jshint esversion:8 */
import CustomEvent from './events'
import Lexer from './lexer'
import { MATH_CONSTS, MATH_FUNCS } from './regex'
import ParseToken from './parse-token'
import {
  YES, NO, TRUE, FALSE, ELSE, ELSEIF, AND, OR, IF, RULE, THEN, /* CF, MOD, */
  PROMPT, QUESTION, DIGIT, MENU, NUM, MIN, MAX, ARRAY, ATTR, CONST, FUNC,
  ATTRIBUTE, TITLE, SUMMARY, GOAL, LINE, ERROR, EOF, LPAREN, RPAREN, TIMES,
  COMMA, GT, LT, EQ, TEXT, NOT, IN, EX, IS, REM, COMMENT, SPACE, LBRACKET, CARRET,
  EXCLUDE,
} from './token-constants'
/**
 * Laguage grammar parser. Parser is language neutral, 
 * it does not know in which language the rules are written
 */
export default class Parser extends CustomEvent {
  /**
    * Constructor 
    */
  constructor (language, languageModule) {
    super()
    this.language = language
    // this.languageModule = languageModule
    this.keywords = languageModule.keywords // languageModule.keywords // keywords[language.toLowerCase()]
    this.keyMap = Object.keys(this.keywords)
    this.keyValues = Object.values(this.keywords)
    this.tokens = null
    this.prev = null
    this.errors = []
    this.data = null
    this.parseToken = ParseToken(this)
    // this.init()
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
    this.tokens = []
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
  readToEndOfLine () {
    const tokens = []
    let peek = null
    do {
      peek = this.peek()
      let token = this.tokens[this.pos]
      tokens.push(token)
      this.advance()
    } while (peek && peek.type !== LINE && peek.type !== EOF)

    const text = tokens.map(t => t.value)
    if (!text || text.length === 0) {
      return null
    }
    return text.join(' ')
  }
  scanRule () {
    const text = this.scanDefinition(RULE)
    if (!text || text.length === 0) {
      return this.error('Rule should have description')
    }
    return text
  }
  scanDefinition (type, name) {
    let token = this.peek(type)
    if (token) this.eat(type)
    return this.readToEndOfLine()
  }
  scanTitle () {
    const text = this.scanDefinition(TITLE, this.keywords.TITLE)
    if (!text || text.length === 0) {
      return this.error('Title should have description')
    }
    return text
  }
  scanSummary () {
    const text = this.scanDefinition(SUMMARY, this.keywords.SUMMARY)
    if (!text || text.length === 0) {
      return this.error('Summary should have description')
    }
    return text
  }
  scanQuestion () {
    const text = this.scanDefinition(QUESTION, this.keywords.QUESTION)
    if (!text || text.length === 0) {
      return this.error('Question should have a statement')
    }
    return text
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
    // this.eat(GOAL)
    const text = this.scanDefinition(GOAL)
    if (!text || text.length === 0) {
      return this.error('Goal definition should have texts')
    }
    return text
  }
  scanPrompt () {
    // this.eat(PROMPT)
    const prompt = this.scanDefinition(PROMPT) // this.eat(ATTR)
    if (!prompt || prompt.length === 0) {
      return this.error('Prompt definition should have texts')
    }
    this.prompts[prompt.toLowerCase()] = prompt

    return prompt
  }
  scanMenu () {
    this.eat(MENU)
    const tokens = []
    const lparen = this.eat(LPAREN)
    if (!lparen) {
      return this.error('Expected (')
    }
    let token = this.tokens[this.pos]
    while (token && token.type !== RPAREN && token.type !== LINE && token.type !== EOF) {
      if (!token || (token.type !== NUM && token.type !== ATTR &&
        token.type !== YES && token.type !== NO &&
        token.type !== TRUE && token.type !== FALSE
      )) {
        return this.error('Expected number or Attribute')
      }
      tokens.push(token)
      if (this.peek() && this.peek().type === RPAREN) {
        this.advance()
        break
      }
      this.advance()
      this.eat(COMMA)
      token = this.tokens[this.pos]
    }
    const menu = tokens.map((m) => m.value)
    return menu
  }
  scanYesNo () {
    // let next = this.peek()
    this.eat(YES)
    // if (next && next.type === COMMA) {
    this.eat(COMMA)
    // }
    this.eat(NO)
  }
  scanTrueFalse () {
    // let next = this.peek()
    this.eat(TRUE)
    // if (next && next.type === COMMA) {
    this.eat(COMMA)
    // }
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

  scanCF () {
    if (this.peek() && this.peek().type === this.CF) {
      this.advance()
      cf = true
    }
    if (this.peek() && this.peek().type !== LINE) {
      this.error('Expected end of line but found ' + this.peek().value)
    }
  }
  scanInference () {
    this.advance()
    const name = this.leftAttribute()
    let right = null
    let nextToken = this.taste()
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
          if (right && right[0].type === EOF) {
            return this.error('Expected expression but found end of file', right)
          } else if (right && right[0].type === LINE) {
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
    if (!right) right = [_right]
    return { name, right }
  }
  scanPremise () {
    this.advance()
    const left = this.leftNode()
    let nextToken = this.taste()
    let comparator = nextToken
    if (!comparator) {
      return this.error('Expected expression but found end of line')
    }
    this.matchParenthesis(left)
    let comp = null
    let right = []

    switch (comparator.type) {
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
          if (right && right[0].type === EOF) {
            return this.error('Expected expression but found end of file', right)
          } else if (right && right[0].type === LINE) {
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

    // if (left.length == 0) {
    // this.error('Expected expression but found end of line')
    // }
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
    if (!comp) comp = EQ
    return { left, right, op:comp }
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
  taste () {
    const token = this.tokens[this.pos]
    return token
  }
  eat (type) {
    const token = this.tokens[this.pos]
    if (token) {
      if (token.type === type) {
        this.advance()
        return token
      } else {
        return this.error('Expected ' + type + ' but found ' + token.type)
      }
    }
    return this.error('Expected ' + type + ' but found end of line')
  }
  advance () {
    this.pos++
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
        // console.log(this.inferences, this.prompts)
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
      column: token ? token.column : this.col, // character index on line
      text: msg, // Error message
      raw: token, // "Missing semicolon"
    }

    this.errors.push(e)
    this.emit('error', e, this)
  }
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
  isKeyword (word, index, tokens) {
    const token = index > 0 ? tokens[index - 1] : null
    const prev = token ? token.type : null
    const history = index > 1 ? tokens[index - 2].type : null
    switch (word) {
      case AND:
      case THEN:
      case ELSE:
      case OR:
      case RULE:
      case PROMPT:
      case QUESTION:
      case DIGIT:
      case MENU:
      case NUM:
      case ARRAY:
      case ATTRIBUTE:
      case TITLE:
      case SUMMARY:
      case GOAL:
        if (prev === LINE) {
          return true
        }
        return false
      case YES:
      case TRUE:
        if (prev === LINE || prev === EQ || prev === IS) {
          return true
        }
        return false
      case NO:
        if (prev === EQ || prev === IS) {
          return true
        } else if (prev === COMMA && history === YES) {
          return true
        }
        return false
      case FALSE:
        if (prev === EQ || prev === IS) {
          return true
        } else if (prev === COMMA && history === TRUE) {
          return true
        }
        return false
      case MIN:
        if (prev === LINE) return true
        return false
      case MAX:
        if (prev === LINE) {
          return true
        }
        return false
      case IF:
        if (prev === LINE || prev === ELSE) {
          return true
        }
        return false
      case ELSEIF:
        if (prev === LINE) {
          return true
        }
        return false
      default:
        return true
    }
  }
  filterKeywords () {
    let tokens = []
    let prevToken = null
    for (let i = 0; i < this.tokens.length; i++) {
      let token = this.tokens[i]
      if (token.type === ATTR) {
        //let found = this.keyValues.findIndex(v => v.toUpperCase() === token.value.toUpperCase())
        let key = this.keyMap.find(k => this.keywords[k].toUpperCase && (this.keywords[k].toUpperCase() === token.value.toUpperCase()))
        if (key) {
          const isKeyword = this.isKeyword(key, i, tokens)
          if (isKeyword) {
            let tk = Object.assign({}, token)
            tk.type = key
            if (prevToken && prevToken.type === ELSE && key === IF) {
              tokens[i - 1].value += ' ' + tk.value
              tokens[i - 1].type = ELSEIF
              prevToken = token
              tokens.push(null)
              continue
            } else {
              token = tk
            }
            tokens.push(tk)
            continue
          }
        }
      }
      tokens.push(token)
      prevToken = token
      // history.unshift(Object.assign({}, token))
      // if (history.length > 2) history.pop()
    }
    this.tokens = tokens
    // console.log(tokens)
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
    this.tokens = finalTokens
  }
  filterComment () {
    return this.tokens.filter((token) => token.type !== REM && token.type !== COMMENT)
  }

  /**
     * Recursively go through tokens and emmit events using implementation of
     * Finite State Machine (FST)
     * @param {JSON} tokens 
     * @returns { Promise<Object> } errors if any including warning and info
     */
  async parse (text) {
   
    return new Promise(async (resolve, reject) => {
      this.init()
      this.pos = 0
      let tokenizer = new Lexer()
      let tokens = await tokenizer.tokenize(text)
      setTimeout(() => {
        this.tokens = tokens.filter(token => token.type !== SPACE && token.type !== REM)
        this.applyMaths()
        this.transform()
        this.prev = null
        this.lastToken = null

        for (this.pos = 0; this.pos < this.tokens.length; this.pos++) {
          const token = this.tokens[this.pos]
          this.lastToken = this.tokens[this.pos > 0 ? this.pos - 1 : 0]
          this.row = token.row
          this.col = token.column
          const type = token.type

          if (type === REM || type === COMMENT) {
            continue
          }

          const action = this.parseToken[type.toLowerCase()]
         
          if (action) {
            // call the method to parse token
            const result = this.parseToken[type.toLowerCase()](token)
            
            if (!result) {
              this.error('Invalid keyword: ' + token.value)
            }
          } else {

            this.error('Invalid token or keyword: ' + token.value, token)
          }
        }
        this.checkVarableDeclarations()
        // this.emit('data', { errors: this.errors, data: this.tokens })
        this.emit('done', { errors: this.errors, data: this.tokens })
        if (this.errors.length > 0) {
          // console.log(this.tokens, this.errors, this.keywords)
          resolve(this.errors)
          // 
        }
        else {
          resolve([])
        }
      }, 100)

    })
  }
}
