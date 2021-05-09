import {
  /*YES, NO, TRUE, FALSE, RULE, ELSE, ELSEIF, THEN, AND, OR, IF, CF, PROMPT, QUESTION, COMMENT,
  MIN, MAX, ARRAY, ATTRIBUTE, TITLE, SUMMARY, GOAL, TEXT, NOT, IN, EX, IS, DIGIT, MENU, */
  ATTR, LINE, ERROR, EOF, LPAREN, RPAREN, COMMA, GT, LT, EQ, SPACE,
  TIMES, MINUS, PLUS, DIV, MOD, STRING, REM, NUM, COMMENT, LBRACKET, RBRACKET, CARRET,
} from './token-constants'
import { Numeric} from './regex'
import { Token } from './symbols'

/**
 * Text tokenizer Lexer
 * @param {String} lang 
 */
export default class Tokenizer {
  constructor ( lang ) {
    this.init()
  }
  get SpecialCharacters () {
    return [
      [LPAREN, '('],
      [RPAREN, ')'],
      [LBRACKET, '['],
      [RBRACKET, ']'],
      [CARRET, '^'],
      [TIMES, '*'],
      [MINUS, '-'],
      [PLUS, '+'],
      [DIV, '/'],
      [MOD, '%'],
      [EQ, '='],
      [GT, '>'],
      [LT, '<'],
      [COMMA, ','],
      [STRING, '"'],
      [LINE, '\n'],
      [EOF, ''],
    ]
  }
  init () {
    this.row = 0
    this.col = 0
  }
  tokenizeWord ( input, current ) {
    let consumedChars = 0
    let value = ''
    let count = current
    let char = input[current]
    //test for alphabetic sequence
    do {
      value += char
      consumedChars++
      count++
      char = input[count]
    } while ( char && char.match( /[^*+-/^(),![\]\s]/i ) )

    if ( consumedChars > 0 ) {
      let token = new Token( ATTR, value, this.row, this.col )
      return [consumedChars, token]// { type, value, row, _col }];
    }
    return [0, null]
  }
  tokenizeString ( input, current ) {
    if ( input[current] === '"' ) {
      let value = '"'
      let consumedChars = 1
      let _col = this.col
      //consumedChars ++;
      let char = input[current + consumedChars]
      while ( char !== '"' && char !== undefined ) {
        /*if(char === undefined) {//if production throw new TypeError("unterminated string ");}*/
        value += char
        consumedChars++
        char = input[current + consumedChars]
      }
      value += '"'
      return [consumedChars + 1, new Token( STRING, value, this.row, _col )]// { type: 'string', value, row, col }];
    } else if ( input[current] === '\'' ) {
      let value = '\''
      let consumedChars = 1
      let _col = this.col
      //consumedChars ++;
      let char = input[current + consumedChars]
      while ( char !== '\'' && char !== undefined ) {
        /*if(char === undefined) {//if production throw new TypeError("unterminated string ");}*/
        value += char
        consumedChars++
        char = input[current + consumedChars]
      }
      value += '\''
      return [consumedChars + 1, new Token( STRING, value, this.row, _col )]// { type: 'string', value, row, col }];
    }
    return [0, null]
  }
  tokenizeNumber ( input, current ) {
    //Return a (multidigit) integer or float consumed from the input
    var result = ''
    let consumedChars = 0
    let count = current
    let token = null

    while ( input[count] && input[count].toString().match( Numeric ) ) {
      result += input[count]
      consumedChars++
      count++
    }
    if ( input[count] && input[count] == '.' ) {
      result += input[count]
      consumedChars++
      count++
      while ( input[count] && input[count].toString().match( Numeric ) ) {
        result += input[count]
        consumedChars++
        count++
      }
      token = [consumedChars, new Token( NUM, Number( result ), this.row, this.col )]
    } else {
      token = [consumedChars, new Token( NUM, Number( result ), this.row, this.col )]
    }
    if ( consumedChars > 0 ) {
      return token
    }
    return [0, null]
  }
  skipWhiteSpace ( input, current ) {
    var result = ''
    let consumedChars = 0
    let count = current
    let char = input[current]
    do {
      result += char
      consumedChars++
      count++
      char = input[count]
    } while ( char && char !== '\n' && char.match( /\s/ ) ) 
    
    if ( consumedChars > 0 ) {
      let token = new Token( SPACE, result, this.row, this.col )
      return [consumedChars, token]
    }
    return [0, null]
  }
  tokenizeComment ( input, current ) {
    if ( input[current + 1] === '*' ) {
      let value = ''
      let count = current
      let char = input[current]
      let consumedChars = 0
      do {
        value += char
        consumedChars++
        count++
        char = input[count]
        if ( char === '\n' ) {
          this.col = 0
          this.row++
        } else if ( char === '/' && value[value.length - 1] === '*' ) {
          value += char
          consumedChars++
          break
        }
      } while ( char )

      let token = new Token( REM, value, this.row, this.col )

      return [consumedChars, token]// { type, value, row, _col }];
    } else if ( input[current + 1] === '/' ) {
      return this.tokenizeLineComment( input, current )
    }
    return [0, null]
  }
  tokenizeLineComment ( input, current ) {
    let char = input[current]
    let consumedChars = 0
    if ( input[current + 1] === '/' ) {
      let value = ''
      let count = current
      do {
        value += char
        consumedChars++
        count++
        char = input[count]
      } while ( char && char !== '\n' )

      let token = new Token( REM, value, this.row, this.col )
      return [consumedChars, token]// { type, value, row, _col }];
    }
    return [0, null]
  }
  static flagComment ( tokens ) {
    let filtered = []
    for ( let index = 0; index < tokens.length; index++ ) {
      let token = tokens[index]
      if ( token.type === DIV ) {
        let next = tokens[index + 1]
        if ( next ) {
          let tk = Object.assign( {}, token )
          let text = []
          if ( next.type === DIV ) {
            // Filter line comment
            do {
              text.push( token.value )
              index++
              token = tokens[index]
            } while ( token && token.type !== LINE )
          } else if ( next.type === TIMES ) {
            // Filter multi line comment
            do {
              text.push( token.value )
              index++
              token = tokens[index]
              if ( token && token.type === DIV && tokens[index - 1].type === TIMES ) {
                text.push( token.value )
                break
              }
            } while ( index < tokens.length )
          }
          tk.value = text.join( '' )
          tk.type = REM
          filtered.push( tk )
          continue
        }
      }
      filtered.push( token )
    }
    return filtered
  }
  static filterComment ( tokens ) {

    return tokens.filter( ( token ) => token.type !== REM && token.type !== COMMENT )
  }
  static filterSpace ( tokens ) {

    return tokens.filter( ( token ) => token.type !== SPACE )
  }
  static transform ( tokens ) {
    let transformed = []
    for ( let i = 0; i < tokens.length; i++ ) {
      let token = tokens[i]
      if ( token.type === 'EOF' ) break
      let phrase = []
      if ( token.type === ATTR ) {
        let row = token.row
        let col = token.column
        do {
          phrase.push( token.value )
          i++
          token = tokens[i]
          if ( token.type === REM ) {
            i++
            token = tokens[i]
            continue
          }
        } while ( token && ( token.type === ATTR || token.type == NUM || token.type === SPACE ) )
        i--
        if ( phrase.length > 0 ) {
          if ( tokens[i].type === SPACE ) {
            phrase.pop()
            i--
          }
          let attr = phrase.join( ' ' )
          transformed.push( { type: ATTR, value: attr, row: row, column: col } )
        }
      } else {
        transformed.push( token )
      }
    }
    return transformed
  }
  tokenize ( input ) {
    this.row = 0
    this.col = 0
    let current = 0
    let tokens = []
    let [consumedChars, token] = [0, null]
    // let mathConsts = Object.keys( MATH_CONSTS )
    // let mathFuncs = Object.keys( MATH_FUNCS )
    while ( current < input.length ) {
      let char = input[current]
      let tokenized = false
      let found = this.SpecialCharacters.find( v => v[1] === char )
      switch ( char ) {
      case '\n': {
        tokens.push( new Token( LINE, char, this.row, this.col ) )
        current++
        this.col = 0
        this.row++
        break
      }
      default:
        if ( '/' === char && ( input[current + 1] === "*" || input[current + 1] === "/" ) ) {
          let [chars, tk] = this.tokenizeComment( input, current )
          consumedChars = chars
          token = tk
        } else if ( '"' === char ) {
          let [chars, tk] = this.tokenizeString( input, current )
          consumedChars = chars
          token = tk
        } else if ( found ) {
          token = new Token( found[0], char, this.row, this.col )
          consumedChars = 1
        } else if ( RegExp( Numeric ).test( char ) ) {
          //Number: tokenize number
          let [chars, tk] = this.tokenizeNumber( input, current )
          consumedChars = chars
          token = tk
        } else if ( RegExp( /\s/ ).test( char ) ) {
          let [chars, tk] = this.skipWhiteSpace( input, current )
          consumedChars = chars
          token = tk
        } else if ( RegExp( /[a-zA-Z]|\w/i ).test( char ) ) {
          // let pattern = /[a-zA-Z]|\w/i
          let [chars, tk] = this.tokenizeWord( input, current )
          consumedChars = chars
          token = tk
        } else {
          tokenized = false
        }
        if ( consumedChars !== 0 ) {
          tokenized = true
          current += consumedChars
          this.col += consumedChars
          tokens.push( token )
        }
        if ( !tokenized ) {
          var err = new Token( ERROR, input[current], this.row, this.col )//{type:'ERROR', value:input[current], row:this.row-1,col:this.col, pos:current};
          tokens.push( err )
          current++
          //if (production) throw new TypeError('Invalid input: '+input[current-1]);
        }
      }
    }
    tokens.push( new Token( EOF, '', this.row, -1 ) )//{type:'EOF', value:''});
    // console.log( { tokens } )
    return tokens
  }
}
