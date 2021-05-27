/* jshint esversion:8*/

import {
  BinOp, Num, Str, Attr, UnaryOp, Const, Comma, Func, // Expr, 
} from './symbols'
import {
  NUM, LPAREN, RPAREN, TIMES, DIV, PLUS, MINUS, STRING, MOD,
  ATTR, TRUE, FALSE, YES, NO, COMMA, LBRACKET, RBRACKET, FUNC, CONST,
} from './token-constants'
/**
 * Abstarct Syntax tree AST builder, recursively passes tokens into an abstarct syntax tree
 */

export default class Builder {
  constructor () {
    this.tokens = []
    this.pos = 0
    // set current token to the first token taken from the input
    this.current_token = null
  }
  matchCloseParenthesis ( tokens, startIndex ) {
    let $return = -1
    let left = 0
    let right = 0
    for ( let i = startIndex; i < tokens.length; i++ ) {
      const s = tokens[i].value
      if ( s === '(' ) {
        left++
      } else if ( s === ')' ) {
        right++
      }
      if ( left > 0 && left === right ) {
        $return = i
        break
      }
    }
    return $return
  }
  matchOpenParenthesis ( tokens, startIndex ) {
    let $return = -1
    let left = 0
    let right = 0
    for ( let i = startIndex; i >= 0; i-- ) {
      const s = tokens[i].value
      if ( s === '(' ) {
        left++
      } else if ( s === ')' ) {
        right++
      }
      if ( left > 0 && left === right ) {
        $return = i
        break
      }
    }
    return $return
  }

  matchParenthesis ( tokens ) {
    if ( !tokens ) return
    this.matchBrackets( tokens )
    const open = '('
    const close = ')'
    const opens = []
    const closes = []
    for ( let i = 0; i < tokens.length; i++ ) {
      const c = tokens[i].value
      if ( c === open ) {
        opens.push( [i, c] )
      } else if ( c === close ) {
        closes.push( [i, c] )
      }
    }

    for ( let i = opens.length - 1; i >= 0; i-- ) {
      const match = this.matchCloseParenthesis( tokens, opens[i][0] )
      if ( match === -1 ) {
        const msg = 'Open parenthesis \'{0}\' at column {1} has no close parenthesis'
        this.error( msg/* , open, opens[i][0]*/ )
        break
      }
    }
    for ( let i = 0; i < closes.length; i++ ) {
      // let c = closes[i][1];
      const index = closes[i][0]
      const match = this.matchOpenParenthesis( tokens, index )
      if ( match === -1 ) {
        const msg = 'Close parenthesis \'{0}\' at column {1} has no opening parenthesis'
        this.error( msg/* , close, closes[i][0]*/ )
        break
      }
    }
  }
  error () {
    return new Error( 'Invalid syntax' )
  }
  getNextToken () {
    this.pos++
    while ( this.tokens[this.pos] ) {
      this.current_token = this.tokens[this.pos]
      return this.current_token
    }
    return { type: 'EOF', value: null }
  }
  eat ( token_type ) {
    /*
      # compare the current token type with the passed token
      # type and if they match then "eat" the current token
      # and assign the next token to the this.current_token,
      # otherwise raise an exception.
    */
    if ( this.current_token.type === token_type ) {
      this.current_token = this.getNextToken()
    } else {
      this.error()
    }
  }

  factor () {
    // factor { NUM | LPAREN expr RPAREN//
    const token = this.current_token
   
    if ( token.type === PLUS ) {
      this.eat( PLUS )
      const node = new UnaryOp( token, this.factor() )
      return node
    } else if ( token.type === MINUS ) {
      this.eat( MINUS )
      const node = new UnaryOp( token, this.factor() )
      return node
    } else if ( token.type === CONST ) {
      this.eat( CONST )
      return new Const( token )
    } else if ( token.type === FUNC ) {
      this.eat( FUNC )
      const node = this.parseFunc( token ) 
      return node
    } else if ( token.type === NUM ) {
      this.eat( NUM )
      return new Num( token )
    } else if ( token.type === ATTR ) {
      this.eat( ATTR )
      if ( typeof token.value === 'object' ) {
        return this.parseExpr( token )
      } 
      return new Attr( token )
    } else if ( token.type === STRING ) {
      this.eat( STRING )
      return new Str( token )
    } else if ( token.type === TRUE ) {
      this.eat( TRUE )
      return new Attr( token )
    } else if ( token.type === FALSE ) {
      this.eat( FALSE )
      return new Attr( token )
    } else if ( token.type === YES ) {
      this.eat( YES )
      return new Attr( token )
    } else if ( token.type === NO ) {
      this.eat( NO )
      return new Attr( token )
    } else if ( token.type === COMMA ) {
      this.eat( COMMA )
      return new Comma( token )
    } else if ( token.type === LPAREN ) {
      this.eat( LPAREN )
      const node = this.expr()
      this.eat( RPAREN )
      return node
    } else if ( token.type === LBRACKET ) {
      this.eat( LBRACKET )
      const node = this.expr()
      this.eat( RBRACKET )
      return node
    }
    return null
  }
  parseExpr ( token ) {
    let attr = []
    let isAttrib = false
    token.value.forEach( v => {
      if ( v.type === 'ATTR' ) {
        isAttrib = true
      }
      attr.push( v.value )
    } )
    if ( isAttrib ) {
      token.value = attr.join( ' ' )
      let node = new Attr( token )
      return node
    }
    const node = new UnaryOp( token, this.build( token.value ) )
    return node
  }
  parseFunc ( token ) {
    let endIndex = this.matchCloseParenthesis( this.tokens, this.pos - 1 )
    this.eat( LPAREN )
    const node = new Func( token, this.expr() )
    while ( this.pos < endIndex ) {
      const token = this.current_token
      if ( token.type !== COMMA ) {
        let expr = this.expr()
        if ( expr ) node.params.push( expr )
      }
      this.getNextToken()
    }
    this.eat( RPAREN )
    return node
  }
  term () {
    // term { factor ((TIMES | DIV) factor)*//
    let node = this.factor()
    while ( this.current_token.type === TIMES || this.current_token.type === DIV || this.current_token.type === MOD ) {
      const token = this.current_token
      if ( token.type === TIMES ) {
        this.eat( TIMES )
      } else if ( token.type === DIV ) {
        this.eat( DIV )
      } else if ( token.type === MOD ) {
        this.eat( MOD )
      }
      node = new BinOp( node, token, this.factor() )
    }
    return node
  }

  expr () {
    /*
    expr   { term ((PLUS | MINUS) term)*
    term   { factor ((TIMES | DIV) factor)*
    factor { NUM | LPAREN expr RPAREN */
    let node = this.term()

    while ( this.current_token.type === PLUS || this.current_token.type === MINUS ) {
      const token = this.current_token
      if ( token.type == PLUS ) {
        this.eat( PLUS )
      } else if ( token.type == MINUS ) {
        this.eat( MINUS )
      }
      node = new BinOp( node, token, this.term() )
    }
    return node
  }

  build ( tokens ) {
    this.tokens = tokens
    this.pos = 0
    // set current token to the first token taken from the input
    this.current_token = this.tokens[this.pos]
    // set current token to the first token taken from the input
    const ast = this.expr()
    // console.log( ast )
    return ast
  }
}
