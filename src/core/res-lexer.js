// import CustomEvent from './events.js'
// import { Token } from './symbols.js'
import {
  NUM, ATTR, LINE, EOF, LPAREN, RPAREN, EQ, REM, ERROR, SPACE,
} from './token-constants'
import { Token } from './symbols'

export default class Tokenizer {
  constructor () {
    this.row = 0
    this.col = 0
    this.errors = []
  }
  get Data () {
    return this.data
  }
  get Error () {
    return this.errors
  }

  error ( msg, token, flag = 'error' ) {
    const e = {
      type: flag, // "error"|"warning"|"info"
      row: token.row || this.row, // row index
      column: token.col || this.col, // character index on line
      text: msg, // Error message
      raw: token, // "Missing semicolon"
    }
    this.errors.push( e )
  }
  tokenizeNumber ( input, current ) {
    //Return a (multidigit) integer or float consumed from the input
    var result = ''
    let consumedChars = 0
    let count = current
    let char = input[current]

    do {
      result += char
      consumedChars++
      count++
      char = input[count]
    } while ( char && char.toString().match( /[0-9]/ ) )
    if ( consumedChars > 0 ) {
      let token = [consumedChars, new Token( NUM, Number( result ), this.row, this.col )]
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
      let token = [consumedChars, new Token( SPACE, result, this.row, this.col )]
      return token
    }
    return [0, null]
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
    } while ( char && char !== '\n' && char !== ' ' )

    if ( consumedChars > 0 ) {
      let token = new Token( ATTR, value, this.row, this.col )
      // console.log([consumedChars, token])
      return [consumedChars, token]// { type, value, row, _col }];
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
  tokenize ( input ) {
    this.row = 0
    this.col = 0
    let current = 0
    let tokens = []
    while ( current < input.length ) {
      let char = input[current]
      let [consumedChars, token] = [0, null]
      let tokenized = false
      switch ( char ) {
      case '{': {
        tokens.push( new Token( LPAREN, char, this.row, this.col ) )
        current++
        this.col++
        break
      }
      case '}': {
        tokens.push( new Token( RPAREN, char, this.row, this.col ) )
        current++
        this.col++
        break
      }
      case '=': case ':': {
        tokens.push( new Token( EQ, char, this.row, this.col ) )
        current++
        this.col++
        break
      }
      case '\n': {
        tokens.push( new Token( LINE, char, this.row, this.col ) )
        current++
        this.col = 0
        this.row++
        break
      }

      default:

        if ( RegExp( /[0-9]/ ).test( char ) ) {
          //Number: tokenize number
          let [chars, tk] = this.tokenizeNumber( input, current )
          consumedChars = chars
          token = tk
        } else if ( RegExp( /\s/ ).test( char ) ) {
          let [chars, tk] = this.skipWhiteSpace( input, current )
          consumedChars = chars
          token = tk
        } else if ( '/' === char ) {
          let [chars, tk] = this.tokenizeComment( input, current )
          consumedChars = chars
          token = tk
        } else if ( RegExp( /[a-zA-Z]/ ).test( char ) ) {
          let pattern = /[a-zA-Z]/
          let [chars, tk] = this.tokenizeWord( input, current, pattern )
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

    return tokens
  }
}
