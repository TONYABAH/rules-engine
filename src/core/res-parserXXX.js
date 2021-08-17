// import CustomEvent from './events.js'
// import { Token } from './symbols.js'
import {
  NUM, ATTR, LINE, EOF, LPAREN, RPAREN, EQ, REM, SPACE, COMMENT,
} from './token-constants'

import Tokenizer from './res-lexer'

export default class Parser {
  constructor () {
    this.errors = []
    this.data = {}
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
  static filterComment ( tokens ) {
    return tokens.filter( ( token ) => token.type !== REM && token.type !== COMMENT )
  }
  transform ( tokens ) {
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
          if ( phrase[phrase.length - 1] === ' ' ) {
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

  eatKey ( tokens, current, row, fn ) {
    let values = []
    let count = current
    let token = tokens[count]
    let comment = false
    while ( token && token.value !== '' && token.value !== '=' && token.value !== '\n' ) {

      if ( token.type !== REM ) {
        values.push( token )
      } else {
        comment = true
      }
      count++
      token = tokens[count]
    }
    if ( values.length > 0 ) {
      if ( token.type === LINE || token.type === EOF ) {
        if ( !comment ) {
          fn( 'Key not assigned: ' + values.map( v => v.value ).join( '' ), count, token )
        }
      }
      this.checkParam( values, current )
      return [values.length - 1, values]
    } 
    let line = tokens.filter( tk => tk.row === row ).map( v => v.value ).join( '' )
    if ( !comment && line ) {
      fn( 'Key not found: ' + line, count, tokens.filter( tk => tk.row === row )[1] )
    }
    return [0, null]
    
  }
  eatValue ( tokens, current, row, fn ) {
    let values = []
    let count = current
    let token = tokens[count]
    while ( token && token.value !== '' && token.value !== '\n' ) {
      if ( token.type === EQ ) {
        fn( 'Duplicate assignment', count, token )
      }
      if ( token.type !== REM ) {
        values.push( token )
      }
      count++
      token = tokens[count]
    }

    if ( values.length > 0 ) {
      this.checkParam( values, current )
      return [values.length - 1, values]
    } else if ( token && ( token.type === LINE || token.type === EOF ) ) {
      let line = tokens.filter( tk => tk.row === row ).map( v => v.value ).join( '' )
      fn( 'Value not found: ' + line, count, token )
      return [0, null]
    } 
    return [0, null]
    
  }
  eatLeft ( tokens, index ) {
    let token = tokens[index]
    if ( token.type === LPAREN ) {
      index++
      return index
    }
    return index
  }
  eatRight ( tokens, index ) {
    let token = tokens[index]
    if ( token && token.type === RPAREN ) {
      index++
      return index
    }
    if ( !token ) {
      token = tokens[index - 1]
    }
    let msg = 'Closing parentesis expected at row: ' + token.row + ' col:' + token.col + ' in' + tokens.map( t => t.value ).join( '' )
    this.error( msg, token )
    return index
  }
  eatNumber ( tokens, index ) {
    let token = tokens[index]
    if ( token && token.type === SPACE ) {
      index++
      token = tokens[index]
    }
    let tks = []
    if ( token && token.value.toString().match( /[0-9]/ ) ) {
      do {
        tks.push( token )
        index++
        token = tokens[index]
      } while ( token && token.value.toString().match( /[0-9]/ ) )
      if ( token && token.type === SPACE ) {
        index++
        token = tokens[index]
      }
      return index
    }
    let msg = 'Integer expected at row: ' + token.row + ' col: ' + token.col + ' in' + tokens.map( t => t.value ).join( '' )
    this.error( msg, token )
    return index
  }
  checkParam ( line, current ) {
    for ( let i = 0; i < line.length; i++ ) {
      let token = line[i]
      if ( token.type === LPAREN ) {
        i = this.eatLeft( line, i, current )
        i = this.eatNumber( line, i, current )
        i = this.eatRight( line, i, current )
      } else if ( token.type === RPAREN ) {
        // No opening parenthesis
        let msg = 'Closing parenthesis has no matching opening parenthesis at row: ' + token.row + ' col: ' + token.col + ' ' + line.map( v => v.value ).join( '' )
        this.error( msg, token )
      }
    }
  }
  parse ( tokens ) {
    let row = 0
    // const errors = []
    var handleError = ( err, index, token ) => {
      // errors.push({ index, err, col: token && token.col || 0, row: token && token.row || row })
      this.error( err, token )
    }
    for ( let index = 0; index < tokens.length; index++ ) {
      let token = tokens[index]
      let type = token.type
      let value = token.value
      switch ( type ) {
      case REM: break
      case EOF: break
      case SPACE: break
      case LINE:
        index++
        row++
        //col = 0
        var [count] = this.eatKey( tokens, index, row + 1, handleError )
        index += count
        // eat key
        break
      case EQ:
        index++
        var [$count] = this.eatValue( tokens, index, row + 1, handleError )
        index += $count
        // eat value
        break
      default:

        handleError( 'Invalid character or token: ' + value, index, token )
      }
      // col++
    }
    return this.Error
  }
  tokenize ( text, fn ) {
    let tokenizer = new Tokenizer()
    let raw = tokenizer.tokenize( text )
    let tokens = this.transform( raw )
    let errors = this.parse( tokens )
    // console.log(errors)
    if ( typeof fn === 'function' ) {
      fn( errors )
    }

    return tokens
  }
}
