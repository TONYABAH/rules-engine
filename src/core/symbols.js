/* jshint esversion:8*/

/*
#############################################################################                                                                            #
#  SYMBOLS and SYMBOL TABLE                                                 #                                                                            #
#############################################################################
*/

export class Symbol {
  constructor ( name, type = 'None' ) {
    this.name = name
    this.type = type
  }
}

export class Token {
  constructor ( type, value, row, col ) {
    this.type = type
    this.value = value
    this.row = row || 0
    this.column = col || 0
    this.length = value ? value.length : 0
  }
}

/**
 * Abstract Syntax Tree (AST)
 */
export class AST {
  // pass
}

/*
###############################################################################                                                                            #
    #  AST visitors (walkers)                                                 #                                                                            #
###############################################################################
*/

export class NodeVisitor {
  constructor () {
    this.visitor = this
  }
  visit () { }
}
export class BinOp extends AST {
  constructor ( left, op, right ) {
    super()
    this.left = left
    this.token = this.op = op
    this.right = right
  }
}
export class Num extends AST {
  constructor ( token ) {
    super()
    this.token = token
    this.value = token.value
  }
}
export class Str extends AST {
  constructor ( token ) {
    super()
    this.token = token
    this.value = token.value
  }
}
export class Attr extends AST {
  constructor ( token ) {
    super()
    this.token = token
    this.value = token.value
  }
}
export class Const extends AST {
  constructor ( token ) {
    super()
    this.token = token
    this.value = token.value
  }
}
export class Func extends AST {
  constructor ( op, params ) {
    super()
    this.token = this.op = op
    this.params = [params]
  }
}
export class Expr extends AST {
  constructor ( token ) {
    super()
    this.token = token
    this.value = token.value
  }
}
export class Comma extends AST {
  constructor ( token ) {
    super()
    this.token = token
    this.value = token.value
  }
}
export class UnaryOp {
  constructor ( op, expr ) {
    this.token = this.op = op
    this.expr = expr
  }
}
export class Assign {
  constructor ( left, op, right ) {
    this.left = left
    this.token = this.op = op
    this.right = right
  }
}
export class Equal {
  constructor ( left, op, right ) {
    this.left = left
    this.token = this.op = op
    this.right = right
  }
}

export class NoOp {
  // void
}

export class Type {
  constructor ( token ) {
    this.token = token
    this.value = token.value
  }
}

