import {
  BinOp, UnaryOp, Func, Const, //Expr, Comma, Num, Str, Attr,
} from './Symbols'
import {
  TIMES, DIV, PLUS, MINUS, MOD,
} from './TokenConstants'

/**
 * Language grammer interpreter, recursively passes abstract syntax tree into algebraic output
 */

export default class Interpreter /* extends NodeVisitor*/ {
  constructor () {
    // super();
    // this.visitors = {visit_BinOp:this.visit_BinOp, visit_Num: this.visit_Num};
  }
  visit ( node ) {
    if ( node instanceof BinOp ) {
      return this.visit_BinOp( node )
    } else if ( node instanceof UnaryOp ) {
      return this.visit_UnaryOp( node )
    } else if ( node instanceof Func ) {
      return this.visit_UnaryOp( node )
    } else if ( node instanceof Const ) {
      return this.visit_Const( node )
    //} else if (node instanceof Num) {
      // return this.visit_Num( node )
    //} else if ( node instanceof Str ) {
      // return this.visit_Str( node )
    //} else if ( node instanceof Comma ) {
      // return this.visit_Attr( node )
    // } else if ( node instanceof Attr ) {
      // return this.visit_Attr( node )
    } else if ( node ) {
      return this.visit_Attr( node )
    } 
    return null
  }

  visit_BinOp ( node ) {
    if ( node.op.type == PLUS ) {
      return Number( this.visit( node.left ) ) + Number( this.visit( node.right ) )
    } else if ( node.op.type == MINUS ) {
      return this.visit( node.left ) - this.visit( node.right )
    } else if ( node.op.type == TIMES ) {
      return this.visit( node.left ) * this.visit( node.right )
    } else if ( node.op.type == DIV ) {
      return this.visit( node.left ) / this.visit( node.right )
    } else if ( node.op.type == MOD ) {
      return this.visit( node.left ) % this.visit( node.right )
    }
    return node.value
  }

  visit_UnaryOp ( node ) {
    const op = node.op.type
    if ( op == PLUS ) {
      return +( this.visit( node.expr ) )
    } else if ( op == MINUS ) {
      return -( this.visit( node.expr ) )
    } else if ( op == 'ATTR' ) {
      return this.visit( node.expr ) 
    } else if ( op === 'FUNC' ) {
      let params = []
      node.params.map( p => {
        if ( p ) {
          params.push( this.visit( p ) )
        }
      } )
      if ( params ) {
        return Math[node.op.value]( ...params )
      }
      return Math[node.op.value]( )
    }
    return null
  }
  visit_Num ( node ) {
    return node.value
  }
  visit_Str ( node ) {
    return node.value
  }
  visit_Attr ( node ) {
    return node.value
  }
  visit_Const ( node ) {
    return Math[node.value]
  }
  /**
   * Recursively passes AST into algebraic output
   * @param {AST} ast
   */
  interpret ( ast ) {
    // console.log( {ast} )
    this.ast = ast
    const result = this.visit( this.ast )
    return result
  }
}
