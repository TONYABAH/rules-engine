/* jshint esversion:8*/
var Constants = {
  MENU: 'MENU',
  NUMBER: 'NUMBER',
  TEXT: 'TEXT',
  VALUE: 'VALUE',
  STRING: 'STRING',
  SUM: '+',
  // addition
  MUL: 'x',
  // times
  AVE: 'AVE',
  // average
  MIN: 'MIN',
  MAX: 'MAX',
  YN: 'YN',
  TF: 'TF',
  ATTR: 'ATTR'
};

// These definitions are internally used to store tokens
// they should not affect language of production rules
var REM = 'REM';
var COMMENT = 'COMMENT';
var TITLE = 'TITLE';
var SUMMARY = 'SUMMARY';
var ATTRIBUTE = 'ATTRIBUTE';
var ARRAY = 'ARRAY';
var ATTR = 'ATTR';
var GOAL = 'GOAL';
var LINE = 'LINE';
var SUM = '+'; // addition

var MUL = 'x'; // times

var AVE = 'AVE'; // average

var TF = 'TF';
var YN = 'YN';
var RULE = 'RULE';
var ELSE = 'ELSE';
var ELSEIF = 'ELSEIF';
var THEN = 'THEN';
var AND = 'AND';
var OR = 'OR';
var IF = 'IF';
var PROMPT = 'PROMPT';
var QUESTION = 'QUESTION';
var YES = 'YES';
var NO = 'NO';
var TRUE = 'TRUE';
var FALSE = 'FALSE';
var NUMBER = 'NUMBER';
var DIGIT = 'DIGIT';
var TEXT = 'TEXT';
var MENU = 'MENU';
var NUM = 'NUM';
var MIN = 'MIN';
var MAX = 'MAX';
var EX = 'EXCLUDE';
var IN = 'INCLUDE';
var NOT = 'NOT';
var IS = 'IS'; // symbols and special characters

var LPAREN = 'LPAREN';
var RPAREN = 'RPAREN';
var LBRACKET = 'LBRACKET';
var RBRACKET = 'RBRACKET';
var CARRET = 'CARRET';
var TIMES = 'TIMES';
var DIV = 'DIV';
var PLUS = 'PLUS';
var MINUS = 'MINUS';
var STRING = 'STRING';
var MOD = 'MOD';
var EQ = 'EQ';
var GT = 'GT';
var LT = 'LT';
var COMMA = 'COMMA';
var COLON = 'COLON';
var SPACE = 'SPACE';
var ERROR = 'ERROR';
var EOF = 'EOF';
var FUNC = 'FUNC';
var CONST = 'CONST'; // Math constants
 //(x)

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

var Token = function Token(type, value, row, col) {
  this.type = type;
  this.value = value;
  this.row = row || 0;
  this.column = col || 0;
  this.length = value ? value.length : 0;
};
/**
 * Abstract Syntax Tree (AST)
 */

var AST = function AST() {};
var BinOp = /*#__PURE__*/function (_AST) {
  _inheritsLoose(BinOp, _AST);

  function BinOp(left, op, right) {
    var _this;

    _this = _AST.call(this) || this;
    _this.left = left;
    _this.token = _this.op = op;
    _this.right = right;
    return _this;
  }

  return BinOp;
}(AST);
var Num = /*#__PURE__*/function (_AST2) {
  _inheritsLoose(Num, _AST2);

  function Num(token) {
    var _this2;

    _this2 = _AST2.call(this) || this;
    _this2.token = token;
    _this2.value = token.value;
    return _this2;
  }

  return Num;
}(AST);
var Str = /*#__PURE__*/function (_AST3) {
  _inheritsLoose(Str, _AST3);

  function Str(token) {
    var _this3;

    _this3 = _AST3.call(this) || this;
    _this3.token = token;
    _this3.value = token.value;
    return _this3;
  }

  return Str;
}(AST);
var Attr = /*#__PURE__*/function (_AST4) {
  _inheritsLoose(Attr, _AST4);

  function Attr(token) {
    var _this4;

    _this4 = _AST4.call(this) || this;
    _this4.token = token;
    _this4.value = token.value;
    return _this4;
  }

  return Attr;
}(AST);
var Const = /*#__PURE__*/function (_AST5) {
  _inheritsLoose(Const, _AST5);

  function Const(token) {
    var _this5;

    _this5 = _AST5.call(this) || this;
    _this5.token = token;
    _this5.value = token.value;
    return _this5;
  }

  return Const;
}(AST);
var Func = /*#__PURE__*/function (_AST6) {
  _inheritsLoose(Func, _AST6);

  function Func(op, params) {
    var _this6;

    _this6 = _AST6.call(this) || this;
    _this6.token = _this6.op = op;
    _this6.params = [params];
    return _this6;
  }

  return Func;
}(AST);
var Comma = /*#__PURE__*/function (_AST8) {
  _inheritsLoose(Comma, _AST8);

  function Comma(token) {
    var _this8;

    _this8 = _AST8.call(this) || this;
    _this8.token = token;
    _this8.value = token.value;
    return _this8;
  }

  return Comma;
}(AST);
var UnaryOp = function UnaryOp(op, expr) {
  this.token = this.op = op;
  this.expr = expr;
};

/* jshint esversion:8*/
/**
 * Abstarct Syntax tree AST builder, recursively passes tokens into an abstarct syntax tree
 */

var Builder = /*#__PURE__*/function () {
  function Builder() {
    this.tokens = [];
    this.pos = 0; // set current token to the first token taken from the input

    this.current_token = null;
  }

  var _proto = Builder.prototype;

  _proto.matchCloseParenthesis = function matchCloseParenthesis(tokens, startIndex) {
    var $return = -1;
    var left = 0;
    var right = 0;

    for (var i = startIndex; i < tokens.length; i++) {
      var s = tokens[i].value;

      if (s === "(") {
        left++;
      } else if (s === ")") {
        right++;
      }

      if (left > 0 && left === right) {
        $return = i;
        break;
      }
    }

    return $return;
  };

  _proto.matchOpenParenthesis = function matchOpenParenthesis(tokens, startIndex) {
    var $return = -1;
    var left = 0;
    var right = 0;

    for (var i = startIndex; i >= 0; i--) {
      var s = tokens[i].value;

      if (s === "(") {
        left++;
      } else if (s === ")") {
        right++;
      }

      if (left > 0 && left === right) {
        $return = i;
        break;
      }
    }

    return $return;
  };

  _proto.matchParenthesis = function matchParenthesis(tokens) {
    if (!tokens) return;
    this.matchBrackets(tokens);
    var open = "(";
    var close = ")";
    var opens = [];
    var closes = [];

    for (var i = 0; i < tokens.length; i++) {
      var c = tokens[i].value;

      if (c === open) {
        opens.push([i, c]);
      } else if (c === close) {
        closes.push([i, c]);
      }
    }

    for (var _i = opens.length - 1; _i >= 0; _i--) {
      var match = this.matchCloseParenthesis(tokens, opens[_i][0]);

      if (match === -1) {
        var msg = "Open parenthesis '{0}' at column {1} has no close parenthesis";
        this.error(msg
        /* , open, opens[i][0]*/
        );
        break;
      }
    }

    for (var _i2 = 0; _i2 < closes.length; _i2++) {
      // let c = closes[i][1];
      var index = closes[_i2][0];

      var _match = this.matchOpenParenthesis(tokens, index);

      if (_match === -1) {
        var _msg = "Close parenthesis '{0}' at column {1} has no opening parenthesis";
        this.error(_msg
        /* , close, closes[i][0]*/
        );
        break;
      }
    }
  };

  _proto.error = function error() {
    return new Error("Invalid syntax");
  };

  _proto.getNextToken = function getNextToken() {
    this.pos++;

    while (this.tokens[this.pos]) {
      this.current_token = this.tokens[this.pos];
      return this.current_token;
    }

    return {
      type: "EOF",
      value: null
    };
  };

  _proto.eat = function eat(token_type) {
    /*
    # compare the current token type with the passed token
    # type and if they match then "eat" the current token
    # and assign the next token to the this.current_token,
    # otherwise raise an exception.
    */
    if (this.current_token.type === token_type) {
      this.current_token = this.getNextToken();
    } else {
      this.error();
    }
  };

  _proto.factor = function factor() {
    // factor { NUM | LPAREN expr RPAREN//
    var token = this.current_token;

    if (token.type === PLUS) {
      this.eat(PLUS);
      var node = new UnaryOp(token, this.factor());
      return node;
    } else if (token.type === MINUS) {
      this.eat(MINUS);

      var _node = new UnaryOp(token, this.factor());

      return _node;
    } else if (token.type === CONST) {
      this.eat(CONST);
      return new Const(token);
    } else if (token.type === FUNC) {
      this.eat(FUNC);

      var _node2 = this.parseFunc(token);

      return _node2;
    } else if (token.type === NUM) {
      this.eat(NUM);
      return new Num(token);
    } else if (token.type === ATTR) {
      this.eat(ATTR);

      if (typeof token.value === "object") {
        return this.parseExpr(token);
      }

      return new Attr(token);
    } else if (token.type === STRING) {
      this.eat(STRING);
      return new Str(token);
    } else if (token.type === TRUE) {
      this.eat(TRUE);
      return new Attr(token);
    } else if (token.type === FALSE) {
      this.eat(FALSE);
      return new Attr(token);
    } else if (token.type === YES) {
      this.eat(YES);
      return new Attr(token);
    } else if (token.type === NO) {
      this.eat(NO);
      return new Attr(token);
    } else if (token.type === COMMA) {
      this.eat(COMMA);
      return new Comma(token);
    } else if (token.type === LPAREN) {
      this.eat(LPAREN);

      var _node3 = this.expr();

      this.eat(RPAREN);
      return _node3;
    } else if (token.type === LBRACKET) {
      this.eat(LBRACKET);

      var _node4 = this.expr();

      this.eat(RBRACKET);
      return _node4;
    }

    return null;
  };

  _proto.parseExpr = function parseExpr(token) {
    var attr = [];
    var isAttrib = false;
    token.value.forEach(function (v) {
      if (v.type === "ATTR") {
        isAttrib = true;
      }

      attr.push(v.value);
    });

    if (isAttrib) {
      token.value = attr.join(" ");

      var _node5 = new Attr(token);

      return _node5;
    }

    var node = new UnaryOp(token, this.build(token.value));
    return node;
  };

  _proto.parseFunc = function parseFunc(token) {
    var endIndex = this.matchCloseParenthesis(this.tokens, this.pos - 1);
    this.eat(LPAREN);
    var node = new Func(token, this.expr());

    while (this.pos < endIndex) {
      var _token = this.current_token;

      if (_token.type !== COMMA) {
        var expr = this.expr();
        if (expr) node.params.push(expr);
      }

      this.getNextToken();
    }

    this.eat(RPAREN);
    return node;
  };

  _proto.term = function term() {
    // term { factor ((TIMES | DIV) factor)*//
    var node = this.factor();

    while (this.current_token.type === TIMES || this.current_token.type === DIV || this.current_token.type === MOD) {
      var token = this.current_token;

      if (token.type === TIMES) {
        this.eat(TIMES);
      } else if (token.type === DIV) {
        this.eat(DIV);
      } else if (token.type === MOD) {
        this.eat(MOD);
      }

      node = new BinOp(node, token, this.factor());
    }

    return node;
  };

  _proto.expr = function expr() {
    /*
    expr   { term ((PLUS | MINUS) term)*
    term   { factor ((TIMES | DIV) factor)*
    factor { NUM | LPAREN expr RPAREN */
    var node = this.term();

    while (this.current_token.type === PLUS || this.current_token.type === MINUS) {
      var token = this.current_token;

      if (token.type == PLUS) {
        this.eat(PLUS);
      } else if (token.type == MINUS) {
        this.eat(MINUS);
      }

      node = new BinOp(node, token, this.term());
    }

    return node;
  };

  _proto.build = function build(tokens) {
    this.tokens = tokens;
    this.pos = 0; // set current token to the first token taken from the input

    this.current_token = this.tokens[this.pos]; // set current token to the first token taken from the input

    var ast = this.expr(); // console.log( ast )

    return ast;
  };

  return Builder;
}();

/**
 * Language grammer interpreter, recursively passes abstract syntax tree into algebraic output
 */

var Interpreter
/* extends NodeVisitor*/
= /*#__PURE__*/function () {
  function Interpreter() {// super();
    // this.visitors = {visit_BinOp:this.visit_BinOp, visit_Num: this.visit_Num};
  }

  var _proto = Interpreter.prototype;

  _proto.visit = function visit(node) {
    if (node instanceof BinOp) {
      return this.visit_BinOp(node);
    } else if (node instanceof UnaryOp) {
      return this.visit_UnaryOp(node);
    } else if (node instanceof Func) {
      return this.visit_UnaryOp(node);
    } else if (node instanceof Const) {
      return this.visit_Const(node); //} else if (node instanceof Num) {
      // return this.visit_Num( node )
      //} else if ( node instanceof Str ) {
      // return this.visit_Str( node )
      //} else if ( node instanceof Comma ) {
      // return this.visit_Attr( node )
      // } else if ( node instanceof Attr ) {
      // return this.visit_Attr( node )
    } else if (node) {
      return this.visit_Attr(node);
    }

    return null;
  };

  _proto.visit_BinOp = function visit_BinOp(node) {
    if (node.op.type == PLUS) {
      return Number(this.visit(node.left)) + Number(this.visit(node.right));
    } else if (node.op.type == MINUS) {
      return this.visit(node.left) - this.visit(node.right);
    } else if (node.op.type == TIMES) {
      return this.visit(node.left) * this.visit(node.right);
    } else if (node.op.type == DIV) {
      return this.visit(node.left) / this.visit(node.right);
    } else if (node.op.type == MOD) {
      return this.visit(node.left) % this.visit(node.right);
    }

    return node.value;
  };

  _proto.visit_UnaryOp = function visit_UnaryOp(node) {
    var _this = this;

    var op = node.op.type;

    if (op == PLUS) {
      return +this.visit(node.expr);
    } else if (op == MINUS) {
      return -this.visit(node.expr);
    } else if (op == 'ATTR') {
      return this.visit(node.expr);
    } else if (op === 'FUNC') {
      var params = [];
      node.params.map(function (p) {
        if (p) {
          params.push(_this.visit(p));
        }
      });

      if (params) {
        return Math[node.op.value].apply(Math, params);
      }

      return Math[node.op.value]();
    }

    return null;
  };

  _proto.visit_Num = function visit_Num(node) {
    return node.value;
  };

  _proto.visit_Str = function visit_Str(node) {
    return node.value;
  };

  _proto.visit_Attr = function visit_Attr(node) {
    return node.value;
  };

  _proto.visit_Const = function visit_Const(node) {
    return Math[node.value];
  }
  /**
   * Recursively passes AST into algebraic output
   * @param {AST} ast
   */
  ;

  _proto.interpret = function interpret(ast) {
    // console.log( {ast} )
    this.ast = ast;
    var result = this.visit(this.ast);
    return result;
  };

  return Interpreter;
}();

var ErrorKeys = {
  ScriptError: "ScriptError",
  //0
  // Network errors 1 - 9
  NetworkError: 'NetworkError',
  //1
  // Security Errors 10 - 19
  TokenRequired: "TokenRequired",
  //10
  TokenExpired: "TokenExpired",
  //11
  TokenInvalid: "TokenInvalid",
  //12
  APIKeyNotFound: "APIKeyNotFound",
  //13
  APIKeyInvalid: "APIKeyInvalid",
  //14
  CredentialsInvalid: "CredentialsInvalid",
  //15
  UserNotFound: "UserNotFound",
  //16
  AccessDenied: "AccessDenied",
  //17
  // Validation Errors 20 - 40
  InvalidSelection: "InvalidSelection",
  //20
  NoSelection: "NoSelection",
  //21 
  SelectionsAboveRange: "SelectionsAboveRange",
  //22
  SelectionsBelowRange: "SelectionsBelowRange",
  //23
  CharactersAboveRange: "CharactersAboveRange",
  //24
  CharactersBelowRange: "CharactersBelowRange",
  //25
  NumberAboveRange: "NumberAboveRange",
  //26
  NumberBelowRange: "NumberBelowRange",
  //27
  NumberRequired: "NumberRequired",
  //28
  NoActiveSession: "NoActiveSession",
  //29
  NoInput: "NoInput",
  //30
  PromptNotFound: "PromptNotFound",
  //31
  KnowledgebaseNotFound: "KnowledgebaseNotFound",
  //32 
  SessionExpired: "SessionExpired",
  //33
  // Syntax Errors
  UnknownToken: 'UnknownToken',
  NoCloseParenthesis: 'NoCloseParenthesis',
  NoOpenParenthesis: 'NoOpenParenthesis',
  DuplicateOperator: 'DuplicateOperator',
  NoDefinition: 'NoDefinition',
  NoAttributeName: 'NoAttributeName',
  ExpectedEQ: 'ExpectedEQ',
  ExpectNoEOF: 'ExpectNoEOF',
  ExpectNoNewLine: 'ExpectNoNewLine',
  ExpectedArrayname: 'ExpectedArrayname',
  ExpectedOpenParenthesis: 'ExpectedOpenParenthesis',
  ExpectedNumberOrAttrib: 'ExpectedNumberOrAttrib',
  ExpectedComma: 'ExpectedComma',
  ExpectedCloseParenthesis: 'ExpectedCloseParenthesis',
  NoGoalName: 'NoGoalName',
  NoPromptText: 'NoPromptText',
  ExpectType: 'ExpectType',
  ExpectComparator: 'ExpectComparator',
  NoInputForAttrib: 'NoInputForAttrib'
};

// import CustomErrors from "./CustomErrors";

function raiseValidationError$1(code, translator, language) {
  // return CustomErrors(translator, language).ValidationError(code);
  return code;
}
/**
 *
 * @param {Array} values Values to map in the original menu
 * @param {Object} prompt The Current Prompt that has the menu
 * @param {String} language User Language (eg. en, fr, es)
 * @returns {String} Result of the map
 */


function multipleChoice(input, prompt) {
  // translator.target = language
  if (!input || input.length === 0) {
    return raiseValidationError$1(ErrorKeys.NoInput);
  }

  if (!prompt) {
    return raiseValidationError$1(ErrorKeys.NoActiveSession);
  }

  if (prompt.Type === "NUMBER" || prompt.Type === "TEXT" || prompt.Type === "VALUE") {
    return input && input instanceof Array ? input[0] : input;
  }

  var array = input.toString().trim().split(/,/g);
  var result = []; //array.map((v) => {

  for (var i = 0; i < array.length; i++) {
    var v = array[i];

    if (!prompt.Menu[v - 1]) {
      return raiseValidationError$1(ErrorKeys.InvalidSelection);
    }

    result.push(prompt.Menu[v - 1].Value);
  }

  return result.length > 0 ? result : null;
}

/* jshint esversion:8*/

function normalize(prompt) {
  switch (prompt.Type) {
    case Constants.MENU:
      if (!prompt.Max) prompt.Max = prompt.Menu.length;
      if (!prompt.Min) prompt.Min = 1;
      prompt.Min = prompt.Min < 1 ? 1 : prompt.Min;
      prompt.Max = prompt.Max > prompt.Menu.length ? prompt.Menu.length : prompt.Max; //delete MAX_CHARS // MAX_CHARS=null;

      if (!prompt.Max) prompt.Max = 1;
      break;

    case Constants.TEXT:
    case Constants.VALUE:
      if (!prompt.Max) prompt.Max = MAX_CHARS;
      if (!prompt.Min) prompt.Min = 1;
      prompt.Min = prompt.Min < 1 ? 1 : prompt.Min;
      prompt.Max = prompt.Max > MAX_CHARS ? MAX_CHARS : prompt.Max;
      break;

    case Constants.TF:
    case Constants.YN:
      prompt.Min = 1;
      prompt.Max = 1; //delete MAX_CHARS // MAX_CHARS=null;

      break;

    default:
      if (!prompt.Max) prompt.Max = Number.MAX_VALUE;
      if (!prompt.Min) prompt.Min = Number.MIN_VALUE;
      prompt.Min = prompt.Min < Number.MIN_VALUE ? Number.MIN_VALUE : prompt.Min;
      prompt.Max = prompt.Max > Number.MAX_VALUE ? Number.MAX_VALUE : prompt.Max; //delete MAX_CHARS // p.MAX_CHARS=0;

      break;
  }
} //


var Engine = /*#__PURE__*/function () {
  function Engine(kb, translator, validator) {
    if (!kb) throw new ReferenceError("kb is undefined");
    this.paused = false;
    this.CFSettings = null;
    this.done = false;
    this.knowledgebase = kb; // console.log(kb.keywords)

    this.keywords = kb.languageModule.keywords; // keywords[kb.language.toLowerCase()]

    this.CFSettings = kb.languageModule.prompts; // kb[kb.language.toLowerCase()].prompts // promptSettings[kb.language.toLowerCase()]
    // this.validator = new Validator(translator, kb.language)

    this.translator = translator;
    this.validator = validator;
  }

  var _proto = Engine.prototype;

  _proto.raiseScriptError = function raiseScriptError(e) {
    // console.log(e)

    /* return CustomErrors(
        this.translator,
        this.knowledgebase.language
    ).ScriptError(keys.ScriptError, e);*/
    return ErrorKeys.ScriptError;
  };

  _proto.raisePromptNotFoundError = function raisePromptNotFoundError() {
    // const message = this.t(keys.PromptNotFound).data

    /*return CustomErrors(
        this.translator,
        this.knowledgebase.language
    ).ValidationError(keys.PromptNotFound);*/
    return ErrorKeys.PromptNotFound;
  };

  _proto.raiseSessionExpiredError = function raiseSessionExpiredError() {
    // const message = this.t(keys.SessionExpired).data

    /* return CustomErrors(
        this.translator,
        this.knowledgebase.language
    ).ValidationError(keys.SessionExpired); */
    return ErrorKeys.SessionExpired;
  };

  _proto.getEventData = function getEventData(code, message) {
    return {
      status: "error",
      msg: message,
      code: code,
      text: this.lineText,
      // lineText,
      line: this.lineNumber,
      rule: this.knowledgebase.currentRule.Name,
      ruleNumber: this.knowledgebase.ruleIndex + 1
    };
  };

  _proto.calculateCF = function calculateCF(oldValue, newValue, mode) {
    var cf = 0; // let oldValue = this.getConditionCF()

    switch (mode) {
      case SUM:
        {
          cf = oldValue / 100 * (100 - newValue); // probability sum

          break;
        }

      case MUL:
        {
          cf = oldValue * newValue / 100; // multiply

          break;
        }

      case AVE:
        {
          cf = (oldValue + newValue) / 2; // algebraic average

          break;
        }

      case MAX:
        {
          cf = Math.max(oldValue, newValue); // maximum

          break;
        }

      case MIN:
        {
          cf = Math.min(oldValue, newValue); // minimum

          break;
        }

      default:
        cf = oldValue / 100 * (100 - newValue); // probability sum

        break;
    }

    return cf;
  };

  _proto.start = function start() {
    this.paused = false;
    this._error = null;
    this.done = false;
    this.command = null;
    if (!this.knowledgebase) return this.raiseSessionExpiredError();

    while (this.knowledgebase.ruleIndex < this.knowledgebase.rules.length) {
      this.knowledgebase.currentRule = this.knowledgebase.rules[this.knowledgebase.ruleIndex];
      this.knowledgebase.ruleIndex++;

      if (this.knowledgebase.currentRule.Fired) {
        continue;
      }

      this.knowledgebase.currentPrompt = null;
      var conditionIndex = 0;

      while (conditionIndex < this.knowledgebase.currentRule.Conditions.length) {
        this.knowledgebase.currentCondition = this.knowledgebase.currentRule.Conditions[conditionIndex];
        conditionIndex++;
        var result = this.testPremises();

        if (Boolean(result) === true) {
          var _result = this.fireRule(this.knowledgebase.currentCondition.Inferences);

          if (_result) return _result;
        } else if (this.paused) {
          this.knowledgebase.ruleIndex--;
          return this.knowledgebase.currentPrompt;
        } else if (this.knowledgebase.currentRule.Conditions.length <= conditionIndex) {
          var _result2 = this.fireRule(this.knowledgebase.currentRule.AltInferences);

          if (_result2) return _result2;
        }

        if (this.done) break;
      }

      if (this.done) break;
    }

    this.knowledgebase.ruleIndex = 0;
    return this.knowledgebase.answers;
  };

  _proto.testPremises = function testPremises() {
    var maxIndex = this.knowledgebase.currentCondition.Premises.length - 1;
    var testResult = null;

    for (var index = 0; index <= maxIndex; index++) {
      var Premise = this.knowledgebase.currentCondition.Premises[index];

      if (testResult === true && Premise.Keyword === this.keywords.OR.toUpperCase()) {
        // log(lineText + ': breaking loop...');
        continue;
      } else if (testResult === false && Premise.Keyword.toUpperCase() === this.keywords.AND.toUpperCase()) {
        // log(lineText + ': breaking loop...');
        continue;
      }

      var leftNodes = this.mapNodes(Premise.Left);
      if (this.paused) return false;
      var rightNodes = this.mapNodes(Premise.Right);
      if (this.paused) return false; // console.log(leftNodes, rightNodes)

      var left = this.solve(leftNodes) || "";
      var right = Premise.Right.length > 0 ? this.solve(rightNodes) : true;
      var cfLeft = Math.min(this.evaluateCF(Premise.Left));
      var cfRight = Math.min(this.evaluateCF(Premise.Right));
      var cf = Math.min(cfLeft, cfRight);

      if (cf < 100) {
        var mode = Premise.Keyword === this.keywords.OR.toUpperCase() ? MUL : AVE;
        var kbCF = this.knowledgebase.CF || 100;
        this.knowledgebase.CF = this.calculateCF(kbCF, cf, mode);
      }

      testResult = this.compare(left, right, Premise.Comparator);
    }

    return testResult;
  };

  _proto.solveAttribute = function solveAttribute(value, inference) {
    var nodes = this.mapNodes(value);
    var attribValue = this.solve(nodes);
    var attribute = this.knowledgebase.attributes[inference.Name.toLowerCase()];
    var newValue = attribute.CF;
    this.setAttributeValueAndCF(attribute.Name.toLowerCase(), attribValue, newValue);
    this.setAttributeValueAndCF(attribute.Name.toLowerCase(), attribValue, this.knowledgebase.prevCf);
    attribute.Value = attribValue;
    inference.Value = attribValue;

    if (this.knowledgebase.goals[attribute.Name.toLowerCase()]) {
      this.knowledgebase.answers.push({
        Name: attribute.Name,
        Value: attribValue,
        CF: Math.round(this.knowledgebase.CF)
      });

      if (this.knowledgebase.answers.length >= Object.getOwnPropertyNames(this.knowledgebase.goals).length) {
        this.fireDoneEvent();
        this.done = true;
        return this.knowledgebase.answers; // done;
      }
    }

    return false;
  };

  _proto.fireRule = function fireRule(inferences) {
    this.knowledgebase.currentCondition.isMet = true;
    this.knowledgebase.firedRules[this.knowledgebase.currentRule.Name] = this.knowledgebase.currentRule;
    if (this.knowledgebase.currentRule.Fired) return false;
    this.knowledgebase.currentRule.Fired = true;
    if (!inferences) return false;

    for (var i = 0; i < inferences.length; i++) {
      var inference = inferences[i];
      var value = inference.Value;

      if (/^fetch\s[a-zA-Z]+/i.test(inference.Name)) {
        this.command = {
          type: "command",
          cmd: "fetch",
          url: inference.Name.split(" ")[1]
        };
        return this.command;
      }

      var result = this.solveAttribute(value, inference);
      if (result) return result;
    }

    return false;
  };

  _proto.fireDoneEvent = function fireDoneEvent() {//this.publish('engine.done', this.knowledgebase.answers, this)
  }
  /**
   * Solves any mathematical expression
   * @param {*} expression Mathimatical expression nodes
   */
  ;

  _proto.solve = function solve(expression) {
    var builder = new Builder();
    var interpreter = new Interpreter();
    var ast = builder.build(expression);
    var result = interpreter.interpret(ast); // Math. + PI Random() Cos Sin TAN SQRT E

    return result;
  }
  /**
   * Compares left and right side of mathematical expression
   * @param {*} left Left hand side expression
   * @param {*} right Right hand side expression
   * @param {String} compare Comparator
   * @return {Boolean}
   */
  ;

  _proto.compare = function compare(left, right, _compare) {
    switch (_compare) {
      case "GT":
        return left > right;

      case "LT":
        return left < right;

      case "IN":
        return Engine.inArray(left, right);

      case "EX":
        return Engine.notInArray(left, right);
      // NEQ

      default:
        return left.toString().toLowerCase() === right.toString().toLowerCase();
    }
  };

  _proto.mapNodes = function mapNodes(tokens) {
    var nodes = []; //tokens.map(function (token) {

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]; // console.log( token )

      var value = token.value;

      if (token.type === "ATTR") {
        var attribute = this.knowledgebase.attributes[token.value.toLowerCase()];

        if (attribute) {
          // console.log( { attribute, token } )
          if (attribute.Value === null && this.knowledgebase.prompts[token.value.toLowerCase()]) {
            // Attribute attribute=this.knowledgebase.attributes.get(token.toLowerCase());
            // if (attribute.Value == null)
            // the attribute has no value assigned yet, then
            // prompt the user and stop processing more this.knowledgebase.rules
            // until input is obtained from user throuh setAttribute();
            this.prompt(token.value);
            this.paused = true;
            return null;
          } else if (attribute.Value === null) {
            attribute.Value = attribute.Name;
          } // we are replacing the token that matches the Atribute Name
          // with the Attribute Value for evaluation in the scripting engine


          value = attribute.Value; // this.knowledgebase.currentCondition.Confidences.push( attribute.CF )
        }
      }

      nodes.push({
        type: token.type,
        value: value
      });
    } // this.knowledgebase.currentCondition.Confidences = confidences


    return nodes;
  };

  _proto.evaluateCF = function evaluateCF(tokens) {
    var _this = this;

    // const confidences = []
    var values = tokens.map(function (token) {
      var cf = 100;

      if (token.type === "ATTR") {
        var attribute = _this.knowledgebase.attributes[token.value.toLowerCase()];

        if (attribute) {
          if (attribute.CF) {
            cf = attribute.CF;
          }
        }
      }

      return cf;
    });
    return values;
  };

  _proto.prompt = function prompt(name) {
    var _name = name.toLowerCase().trim();

    var prompt = this.knowledgebase.prompts[_name]; // console.log({ prompt, name } )

    if (!prompt) {
      return this.raisePromptNotFoundError();
    }

    this.knowledgebase.prompts[_name].Fired = true;
    normalize(this.knowledgebase.prompts[_name]);
    this.knowledgebase.currentPrompt = this.knowledgebase.prompts[_name];
    this.knowledgebase.currentPrompt.Index = this.knowledgebase.promptIndex; //this.publish('engine.prompt', this.knowledgebase.currentPrompt)

    this.knowledgebase.promptIndex++; // console.log( this.knowledgebase.currentPrompt )

    return this.knowledgebase.currentPrompt;
  };

  _proto.cfPrompt = function cfPrompt() {
    var CF_TEXTS = this.CFSettings.CF_TEXTS; // ['Absolutely','Very high','High','Good','Fair'];

    var VALUES = this.CFSettings.VALUES; // [99,95,85,70,60];

    this.knowledgebase.currentPrompt.Label = "CF";
    this.knowledgebase.currentPrompt.Question = this.CFSettings.QUES; // ('How confident are you about your response?');

    this.knowledgebase.currentPrompt.Type = MENU; // MENU

    this.knowledgebase.currentPrompt.Min = 1;
    this.knowledgebase.currentPrompt.Max = 1;
    this.knowledgebase.currentPrompt.CFMode = false;
    this.knowledgebase.currentPrompt.Menu = [];

    for (var index = 0; index < CF_TEXTS.length; index++) {
      var menu = {
        Index: index + 1,
        // index of menu item
        Name: CF_TEXTS[index],
        // menu item number
        Value: VALUES[index] // menu item value
        // Text: CFMenuText[index], //menu item number
        // CFMenuText[index]  //menu item display text

      };
      this.knowledgebase.currentPrompt.Menu.push(menu);
    }

    normalize(this.knowledgebase.currentPrompt);
    this.knowledgebase.currentPrompt.Index = this.knowledgebase.promptIndex;
    this.knowledgebase.currentPrompt.Fired = true;
    this.knowledgebase.promptIndex++;
    return this.knowledgebase.currentPrompt;
  }
  /**
   * Sets the Value of the attribute or prompt. Runs the Engine if and
   * only if the current prompt does not need confidence factor input,
   * otherwise, prompt for confidence factor input without running the Engine;
   * @param {Object} value The value of the attribute or prompt.
   * @return {JSON} Result
   * @throws ampani.engine.exception.ScriptExecutionException
   */
  ;

  _proto.setAttribute = function setAttribute(value) {
    if (!this.knowledgebase.currentPrompt) {
      return this.raiseSessionExpiredError();
    }

    var validateResult = this.validator.validate(value, this.knowledgebase.currentPrompt);

    if (validateResult && validateResult.name === "ValidationError") {
      return validateResult;
    }

    var computedValue = multipleChoice(value, this.knowledgebase.currentPrompt);

    if (computedValue && computedValue.name === "ValidationError") {
      return computedValue;
    }

    if (computedValue) {
      computedValue = computedValue instanceof Array ? computedValue.join(";") : computedValue;
    }

    if (this.knowledgebase.currentPrompt.Label === "CF") {
      this.setAttributeCF(this.knowledgebase.currentPrompt.Name, computedValue);
      this.knowledgebase.currentCondition.Confidences.push(computedValue);
      return this.start();
    }

    this.knowledgebase.attributes[this.knowledgebase.currentPrompt.Name.toLowerCase()].Value = computedValue;

    if (!this.knowledgebase.currentPrompt.CFMode) {
      this.knowledgebase.currentPrompt = null;
      return this.start();
    }

    return this.cfPrompt();
  }
  /**
   * Sets the confidence factor of the prompt/attribute if the value of CF
   * is >= 0. Run the Engine thereafter.
   * @param {String} name The name of the prompt/attribute to set.
   * @param {Number} cf The value of the confidence factor.
   */
  ;

  _proto.setAttributeCF = function setAttributeCF(name, cf) {
    this.knowledgebase.attributes[name.toLowerCase().trim()].CF = cf; // this.knowledgebase.currentCondition.Confidences.push( cf )

    this.knowledgebase.currentPrompt = null; // console.log( this.knowledgebase.currentCondition )
  }
  /**
   * Sets the attribute value and recalculates the confidence factor based
   * on the previous CF and the newly encountered CF.
   * @param {String} name The Attribute name.
   * @param {Number} value The attribute value.
   * @param {Number} cf The newly encountered CF.
   * @param {String} mode The mode to be used in calculating the CF (0-2).
   */
  ;

  _proto.setAttributeValueAndCF = function setAttributeValueAndCF(name, value, cf) {
    // alert( cf )
    var a = this.knowledgebase.attributes[name.toLowerCase().trim()];
    if (!a) return;
    this.knowledgebase.attributes[name.toLowerCase().trim()].Value = value;

    if (cf > -1 && cf < 100) {
      this.setAttributeCF(name, cf); // this.knowledgebase.attributes[name.toLowerCase().trim()].CF = cf;
    } else {
      this.knowledgebase.currentPrompt = null;
    }
  }
  /**
   * Test if an Object (value) is in Array (array)
   * @param {Array} array The array containing elemets
   * @param {Object} value The value to check if it exists in array
   * @return true if array contains value else returns false
   */
  ;

  Engine.inArray = function inArray(array, value) {
    return array.includes(value.toLowerCase().trim());
  }
  /**
   * Test if an Object (value) is NOT in Array (array)
   * @param {Array} array The array containing elemets
   * @param {Object} value The value to check if it does not exist in array
   * @return false if array contains value else returns true
   */
  ;

  Engine.notInArray = function notInArray(array, value) {
    return !array.includes(value.toLowerCase().trim());
  };

  _proto.getConditionCF = function getConditionCF() {
    var b = 100;
    this.knowledgebase.currentCondition.Confidences.forEach(function (d) {
      b = b * (d / 100);
    });
    return b;
  };

  _proto.run = function run() {
    try {
      var data = this.start();
      return data;
    } catch (e) {
      return this.raiseScriptError(e);
    }
  };

  _proto.input = function input(_input) {
    try {
      // if (kb) this.setKnowledgebase(kb)
      var data = this.setAttribute(_input); // console.log(data)

      return data;
    } catch (e) {
      return this.raiseScriptError(e);
    }
  }
  /**
   * Gets the Knowledgebase of the Engine
   * @return {JSON} Knowledgebase
   */
  ;

  _proto.getKnowledgebase = function getKnowledgebase() {
    return this.knowledgebase;
  }
  /**
   * Sets the knowledgebase for Inference Engine
   * @param {JSON} kb Knowledgebase data
   */
  ;

  _proto.setKnowledgebase = function setKnowledgebase(kb) {
    this.knowledgebase = kb; // this.knowledgebase.promptIndex = 1

    this.CFSettings = kb.keywords.prompts; // promptSettings[this.knowledgebase.language.toLowerCase()]

    this.keywords = kb.keywords.keywords; // keywords[kb.language.toLowerCase()]
    // this.validator = new Validator(kb.language)
  };

  return Engine;
}();

/* jshint esversion:8*/

var validator$1 = function () {
  /**
   * Method just returns the error code which should be handled by the consuming function.
   * Normally the code should be translated to user language based on the locale.
   * @param { String } key Error code
   * @returns the Error code
   */
  function raiseValidationError(key) {
    // return CustomErrors(translator, language).ValidationError(key)
    return key;
  }

  function validateCF(input, prompt) {
    var num = input;

    if (isNaN(num)) {
      return raiseValidationError(ErrorKeys.InvalidSelection);
    }

    if (num == 0) {
      return raiseValidationError(ErrorKeys.InvalidSelection);
    } else if (num < 1) {
      return raiseValidationError(ErrorKeys.InvalidSelection);
    } else if (num > prompt.Menu.length) {
      return raiseValidationError(ErrorKeys.InvalidSelection);
    }
  }

  function validateMenu(input, prompt) {
    if (input.length === 0) {
      return raiseValidationError(ErrorKeys.NoSelection);
    } else if (input.length < prompt.Min) {
      return raiseValidationError(ErrorKeys.SelectionsBelowRange);
    } else if (input.length > prompt.Max) {
      return raiseValidationError(ErrorKeys.SelectionsAboveRange);
    }

    input.forEach(function (num) {
      if (isNaN(num)) {
        return raiseValidationError(ErrorKeys.InvalidSelection);
      } else if (num == 0) {
        return raiseValidationError(ErrorKeys.InvalidSelection);
      } else if (num < 0) {
        return raiseValidationError(ErrorKeys.InvalidSelection);
      } else if (num > prompt.Menu.length) {
        return raiseValidationError(ErrorKeys.InvalidSelection);
      }
    });
  }

  function validateText(input, prompt) {
    if (input.length < prompt.Min) {
      return raiseValidationError(ErrorKeys.CharactersBelowRange);
    } else if (input.length > prompt.Max) {
      return raiseValidationError(ErrorKeys.CharactersAboveRange);
    }
  }

  function validateNumeric(input, prompt) {
    var num = Number(input);

    if (isNaN(num)) {
      return raiseValidationError(ErrorKeys.NumberRequired);
    }

    if (!prompt.Max && !prompt.Min) return null;

    if (num < prompt.Min) {
      return raiseValidationError(ErrorKeys.NumberBelowRange);
    } else if (num > prompt.Max) {
      return raiseValidationError(ErrorKeys.NumberAboveRange);
    }
  }

  return {
    /** *
     * Validates input to the system. This is the entry point of the validation module.
     * Depending on the type of input (menu, number, text) the input is further submmitted to
     * other methods to complete the validation and return the result.
     * @param {Object} input The input text.
     * @param {OBJECT} prompt The prompt presented to the user for response.
     * @return Error code if validation fails, or nothing.
     */
    validate: function validate(input, prompt) {
      if (!prompt.Type) {
        return raiseValidationError(ErrorKeys.NoActiveSession);
      }

      if (!input || input.toString().trim().length === 0) {
        return raiseValidationError(ErrorKeys.NoInput);
      }

      if (prompt.Label.toUpperCase() === "CF") {
        return validateCF(input, prompt);
      }

      switch (prompt.Type.toUpperCase()) {
        case "MENU":
        case "YN":
        case "TF":
          {
            var values = input.toString().split(",");
            return validateMenu(values, prompt);
          }

        case "NUMBER":
          return validateNumeric(input, prompt);

        default:
          return validateText(input, prompt);
      }
    }
  };
}();

// import en from './locales/en'
// import fr from './locales/fr'
// import keywords from '../core/keywords'
var Translator = /*#__PURE__*/function () {
  function Translator(locale, languageModule) {
    this.languageModule = languageModule;
    this.keywords = languageModule[locale];
  }

  var _proto = Translator.prototype;

  _proto.get = function get(key) {
    var data = this.keywords.errors;

    if (data) {
      return data[key];
    }

    return null;
  }
  /**
   * Formats template strings substituting placeholders with the arguments
   * @param  {...any} args String arguments
   * @returns String
   */
  ;

  _proto.format = function format(text) {
    var msg = Object.assign({}, text);
    var index = 0;
    [].slice.call(arguments, 1).forEach(function (arg) {
      msg = msg.replace("{" + index + "}", arg);
      index++;
    });
    return msg;
  }
  /**
   * Translates code into appropriate target language
   * @param {*} code String that is unique to text being translated
   * @returns the Translater object
   */
  ;

  _proto.translate = function translate(code) {
    var data = this.get(code);
    return data;
  }
  /**
   * Translates plain test into target language
   * @param {*} text Text to be translated
   * @returns the Translater object
   */
  ;

  _proto.translatePlain = function translatePlain(text, from) {
    if (from === void 0) {
      from = 'en';
    }

    if (!this.languageModule[from] || !this.languageModule[from].errors) {
      console.log(this.format('Language \'{0}\' not implemented', from));
      return text;
    }

    var source = this.languageModule[from].errors;
    var index = Object.values(source).find(function (v) {
      return v === text;
    });
    var code = Object.keys(source)[index];
    return this.translate(code);
  }
  /**
   * 
   * @param {String} code Error code to translate
   * @returns Translator object
   */
  ;

  _proto.to = function to(code) {
    return this.translate(code);
  };

  _proto.toPlain = function toPlain(text, from) {
    return this.translatePlain(text, from);
  };

  return Translator;
}();

var en = {
  keywords: {
    LANGUAGE: 'language',
    TITLE: 'title',
    SUMMARY: 'summary',
    ATTRIBUTE: 'attribute',
    ARRAY: 'array',
    OBJECT: 'object',
    GOAL: 'goal',
    REM: 'rem',
    COMMENT: 'comment',
    RULE: 'rule',
    IF: 'if',
    AND: 'and',
    OR: 'or',
    THEN: 'then',
    ELSEIF: 'else if',
    ELSE: 'else',
    PROMPT: 'prompt',
    QUESTION: 'question',
    MENU: 'menu',
    DIGIT: 'DIGIT',
    TEXT: 'text',
    CF: '%',
    LOAD: 'load',
    // IS: 'is',
    // IN: 'in',
    INCLUDE: 'include',
    EXCLUDE: 'exclude',
    TRUE: 'true',
    FALSE: 'false',
    MIN: 'min',
    MAX: 'max',
    YES: 'yes',
    NO: 'no' // FOLD_SETTING:			fold.en,
    // PROMPT_SETTING:		prompt.en

  },
  prompts: {
    CODE: 'en',
    NAME: 'English',
    QUES: 'How sure about your answer?',
    CF_TEXTS: ['Absolutely sure', 'Very sure', 'Sure', 'Not so sure', 'Not sure'],
    VALUES: [99, 95, 80, 75, 60],
    ALPHA: ['A', 'B', 'C', 'D', 'E']
  },
  errors: {
    ScriptError: "Scripting Engine Error has occured",
    //0
    // Network errors
    NetworkError: "The response was not ok",
    //1
    // Security Errors 10 - 19
    TokenRequired: "Auth token not found",
    //10
    TokenExpired: "Auth token has expired",
    //11
    TokenInvalid: "Auth token is invalid",
    //12
    APIKeyNotFound: "API key not found",
    //13
    APIKeyInvalid: "API key invalid",
    //14
    CredentialsInvalid: "Supplied credentials invalid",
    //15
    UserNotFound: "User not in database",
    //16
    AccessDenied: "Access denied",
    //17
    // Validation Errors 20 - 39
    InvalidSelection: "Selected menu item does not exist",
    //20
    NoSelection: "No selection was made",
    //21
    SelectionsAboveRange: "Selections above range",
    //22
    SelectionsBelowRange: "Selections below range",
    //23
    CharactersAboveRange: "Characters above range",
    //24
    CharactersBelowRange: "Characters below range",
    //25
    NumberAboveRange: "Number input is above range",
    //26
    NumberBelowRange: "Number input is below range",
    //27
    NumberRequired: "Number input is required",
    //28
    NoActiveSession: "No active session",
    //29
    NoInput: "No input received",
    // 30
    PromptNotFound: "No such prompt",
    //31
    KnowledgebaseNotFound: "Knowledge base was not found",
    //32 
    SessionExpired: "Session has expired",
    //33
    ValidationError: "Validation error",
    //39
    // Database Errors 40 - 49
    // Syntax Errors
    UnknownToken: 'Unknown character or token: {0}',
    NoCloseParenthesis: 'Open Parenthesis \'{0}\' at column {1} has no close Parenthesis',
    NoOpenParenthesis: 'Close Parenthesis \'{0}\' at column {1} has no opening Parenthesis',
    DuplicateOperator: 'Duplicate operator \'{0}\' \'{1}\'',
    NoDefinition: '{0} definition should have texts',
    NoAttributeName: 'Attribute definition should have Attribute Name',
    ExpectedEQ: 'Expected \'=\'',
    ExpectNoEOF: 'Expected expression but found end of file',
    ExpectNoNewLine: 'Expected expression but found new line',
    ExpectedArrayname: 'Expected array name',
    ExpectedOpenParenthesis: 'Expected \'(\'',
    ExpectedNumberOrAttrib: 'Expected number or Attribute',
    ExpectedComma: 'Expected \',\'',
    ExpectedCloseParenthesis: 'Expected ) but found new line',
    NoGoalName: 'Goal definition should have texts',
    NoPromptText: 'Prompt definition should have texts',
    ExpectType: 'Expected \'{0}\' but found \'{1}\'',
    ExpectComparator: 'Expected comparator but found \'{0}\' \'{1}\'',
    NoInputForAttrib: 'No input prompt for attribute \'{0}\''
  }
};
var languageModules = {
  en: en
};

// import Translator from './translator'
// const translator = new Translator()
function CustomErrors(translator, lang) {
  if (lang === void 0) {
    lang = 'en';
  }

  return {
    CustomError: function CustomError(code) {
      var name = "Error";
      var message = translator.to(code, lang);
      return {
        message: message,
        code: code,
        name: name
      };
    },
    ValidationError: function ValidationError(code) {
      var err = this.CustomError(code);
      err.name = 'ValidationError';
      return err;
    },
    SecurityError: function SecurityError(code) {
      var err = this.CustomError(code);
      err.name = 'SecurityError';
      return err;
    },
    DatabaseError: function DatabaseError(code) {
      var err = this.CustomError(code);
      err.name = 'DatabaseError';
      return err;
    },
    NetworkError: function NetworkError(code) {
      var err = this.CustomError(code);
      err.name = 'NetworkError';
      return err;
    },
    SyntaxError: function SyntaxError(code) {
      var err = this.CustomError(code);
      err.name = 'SyntaxError';
      return err;
    },
    ScriptError: function ScriptError(code, e) {
      var err = this.CustomError(code);
      err.name = 'ScriptError';
      err.data = e;
      return err;
    }
  };
}

var fr = {
  keywords: {
    LANGUAGE: 'langue',
    TITLE: 'titre',
    SUMMARY: 'résumé',
    ATTRIBUTE: 'attribut',
    ARRAY: 'tableau',
    OOBJECT: 'objet',
    GOAL: 'objetif',
    REM: 'rem',
    COMMENT: 'commentaire',
    RULE: 'règle',
    IF: 'si',
    AND: 'et',
    OR: 'ou',
    THEN: 'puis',
    ELSEIF: 'elseif',
    ELSE: 'autre',
    PROMPT: 'contribution',
    QUESTION: 'question',
    MENU: 'menu',
    DIGIT: 'Numéro',
    TEXT: 'texte',
    CF: '%',
    LOAD: 'charge',
    IS: 'est',
    IN: 'dans',
    INCLUDE: 'comprendre',
    EXCLUDE: 'exclure',
    TRUE: 'vrai',
    FALSE: 'faux',
    MIN: 'min',
    MAX: 'max',
    YES: 'oui',
    NO: 'pas' // FOLD_SETTING:			fold.fr,
    // PROMPT_SETTING:		prompt.fr

  },
  prompts: {
    CODE: 'fr',
    NAME: 'Français',
    QUES: 'Quelle est votre réponse?',
    CF_TEXTS: ['Absolument sûr', 'Très sûr', 'Bien sûr', 'Pas si sûr', 'Pas sûr'],
    VALUES: [99, 95, 80, 75, 60],
    ALPHA: ['A', 'B', 'C', 'D', 'E']
  },
  errors: {
    ScriptError: "Une erreur du moteur de script s'est produite",
    //0
    // Erreurs réseau
    NetworkError: "La réponse n'était pas ok",
    //1
    // Erreurs de sécurité 10 - 19
    TokenRequired: "Jeton d'authentification non trouvé",
    //10
    TokenExpired: "Le jeton d'authentification a expiré",
    //11
    TokenInvalid: "Le jeton d'authentification n'est pas valide",
    //12
    APIKeyNotFound: "Clé API non trouvée",
    //13
    APIKeyInvalid: "Clé API invalide",
    //14
    CredentialsInvalid: "Informations d'identification fournies invalides",
    //15
    UserNotFound: "Utilisateur absent de la base de données",
    //16
    AccessDenied: "Accès refusé",
    //17
    // Erreurs de validation 20 - 39
    InvalidSelection: "L'élément de menu sélectionné n'existe pas",
    //20
    NoSelection: "Aucune sélection n'a été effectuée",
    //21
    SelectionsAboveRange: "Sélections au-dessus de la plage",
    //22
    SelectionsBelowRange: "Sélections en dessous de la plage",
    //23
    CharactersAboveRange: "Caractères au-dessus de la plage",
    //24
    CharactersBelowRange: "Caractères inférieurs à la plage",
    //25
    NumberAboveRange: "Le nombre saisi est au-dessus de la plage",
    //26
    NumberBelowRange: "Le nombre saisi est inférieur à la plage",
    //27
    NumberRequired: "La saisie du numéro est requise",
    //28
    NoActiveSession: "Aucune session active",
    //29
    NoInput: "Aucune entrée reçue",
    // 30
    PromptNotFound: "Aucune telle invite",
    //31
    KnowledgebaseNotFound: "La base de connaissances n'a pas été trouvée",
    //32
    SessionExpired: "La session a expiré",
    //33
    ValidationError: "Erreur de validation",
    //39
    // Erreurs de base de données 40 - 49
    // Erreurs de syntaxe
    UnknownToken: 'Caractère ou jeton inconnu : {0}',
    NoCloseParenhesis: 'Open Parenhesis \'{0}\' à la colonne \'{1}\'a pas de parenthèse fermée',
    NoOpenParenhesis: 'Fermer la parenthèse \'{0}\' à la colonne\' {1}\'a pas de parenthèse ouvrante',
    DuplicateOperator: 'DuplicateOperator \'{0}\' \'{1}\'',
    NoDefinition: '{0} la définition doit avoir des textes',
    NoAttributeName: 'La définition d\'attribut doit avoir un nom d\'attribut',
    ExpectedEQ: 'Attendu \'=\'',
    ExpectNoEOF: 'Expression attendue mais fin de fichier trouvée',
    ExpectNoNewLine: 'Expression attendue mais nouvelle ligne trouvée',
    ExpectedArrayname: 'Nom du tableau attendu',
    AttenduOuvertParenthèse: 'attendu \'(\'',
    ExpectedNumberOrAttrib: 'Numéro ou attribut attendu',
    ExpectedComma: 'Attendu \',\'',
    ExpectedCloseParenhesis: 'Attendu ) mais nouvelle ligne trouvée',
    NoGoalName: 'La définition de l\'objectif doit avoir des textes',
    NoPromptText: 'La définition de l\'invite doit avoir des textes',
    ExpectType: 'Attendu \'{0}\' mais trouvé \'{1}\'',
    ExpectComparator: 'Comparateur attendu mais trouvé \'{0}\' \'{1}\'',
    NoInputForAttrib: 'Aucune invite de saisie pour l\'attribut \'{0}\''
  }
};

var de = {
  keywords: {
    LANGUAGE: 'Sprache',
    TITLE: 'Titel',
    SUMMARY: 'Zusammenfassung',
    ATTRIBUTE: 'Attribut',
    ARRAY: 'Array',
    OBJECT: 'Objekt',
    GOAL: 'Zeil',
    REM: 'rem',
    COMMENT: 'Kommentar',
    RULE: 'Regel',
    IF: 'wenn',
    AND: 'und',
    OR: 'oder',
    THEN: 'dann',
    ELSEIF: 'sonst wenn',
    ELSE: 'sonst',
    PROMPT: 'prompt',
    QUESTION: 'Frage',
    MENU: 'Menü',
    DIGIT: 'ZIFFER',
    TEXT: 'Text',
    CF: '%',
    LOAD: 'laden',
    // IS: 'ist',
    // IN: 'ein',
    INCLUDE: 'einschließen',
    EXCLUDE: 'ausschließen',
    TRUE: 'wahr',
    FALSE: 'falsch',
    MIN: 'min',
    MAX: 'maximal',
    YES: 'ja',
    NO: 'Nein'
  },
  prompts: {
    CODE: 'de',
    NAME: 'Deutsche',
    QUES: 'Wie sicher ist Ihre Antwort?',
    CF_TEXTS: ['Absolut sicher', 'Sehr sicher', 'Sicher', 'Nicht so sicher', 'Nicht sicher'],
    VALUES: [99, 95, 80, 75, 60],
    ALPHA: ['A', 'B', 'C', 'D', 'E']
  },
  errors: {
    ScriptError: "Fehler bei der Skript-Engine ist aufgetreten",
    //0
    // Netzwerkfehler
    NetworkError: "Die Antwort war nicht in Ordnung",
    //1
    // Sicherheitsfehler 10 - 19
    TokenRequired: "Authentifizierungstoken nicht gefunden",
    //10
    TokenExpired: "Auth-Token ist abgelaufen",
    //11
    TokenInvalid: "Auth-Token ist ungültig",
    //12
    APIKeyNotFound: "API-Schlüssel nicht gefunden",
    //13
    APIKeyInvalid: "API-Schlüssel ungültig",
    //14
    CredentialsInvalid: "Angegebene Zugangsdaten ungültig",
    //15
    UserNotFound: "Benutzer nicht in Datenbank",
    //16
    AccessDenied: "Zugriff verweigert",
    //17
    // Validierungsfehler 20 - 39
    InvalidSelection: "Ausgewählter Menüpunkt existiert nicht",
    //20
    NoSelection: "Es wurde keine Auswahl getroffen",
    //21
    SelectionsAboveRange: "Auswahl über dem Bereich",
    //22
    SelectionsBelowRange: "Auswahlen unterhalb des Bereichs",
    //23
    CharactersAboveRange: "Zeichen über dem Bereich",
    //24
    CharactersBelowRange: "Zeichen unterhalb des Bereichs",
    //25
    NumberAboveRange: "Zahleneingabe liegt über dem Bereich",
    //26
    NumberBelowRange: "Zahleneingabe liegt unterhalb des Bereichs",
    //27
    NumberRequired: "Zahleneingabe erforderlich",
    //28
    NoActiveSession: "Keine aktive Sitzung",
    //29
    NoInput: "Keine Eingabe erhalten",
    // 30
    PromptNotFound: "Keine solche Eingabeaufforderung",
    //31
    KnowledgebaseNotFound: "Wissensdatenbank wurde nicht gefunden",
    //32
    SessionExpired: "Sitzung ist abgelaufen",
    //33
    ValidationError: "Validierungsfehler",
    //39
    // Datenbankfehler 40 - 49
    // Syntaxfehler
    UnknownToken: 'Unbekanntes Zeichen oder Token: {0}',
    NoCloseParenthesis: 'Open Parenthesis \'{0}\' in Spalte {1} hat keine schließende Klammer',
    NoOpenParenthesis: 'Close Parenthesis \'{0}\' in Spalte {1} hat keine öffnende Klammer',
    DuplicateOperator: 'Doppelter Operator \'{0}\' \'{1}\'',
    NoDefinition: '{0} Definition sollte Texte haben',
    NoAttributeName: 'Attributdefinition sollte Attributnamen haben',
    ExpectedEQ: 'Erwartet \'=\'',
    ExpectNoEOF: 'Ausdruck erwartet, aber Dateiende gefunden',
    ExpectNoNewLine: 'Ausdruck erwartet, aber neue Zeile gefunden',
    ExpectedArrayname: 'Erwarteter Array-Name',
    ExpectedOpenParenthesis: 'Erwartet \'(\'',
    ExpectedNumberOrAttrib: 'Erwartete Zahl oder Attribut',
    ExpectedComma: 'Erwartet \',\'',
    ExpectedCloseParenthesis: 'Erwartet ) aber neue Zeile gefunden',
    NoGoalName: 'Zieldefinition sollte Texte haben',
    NoPromptText: 'Prompt-Definition sollte Texte haben',
    ExpectType: 'Erwartet \'{0}\', aber gefunden \'{1}\'',
    ExpectComparator: 'Komparator erwartet, aber \'{0}\' \'{1}\' gefunden',
    NoInputForAttrib: 'Keine Eingabeaufforderung für Attribut \'{0}\''
  }
};

var installedLanguagePlugins = {
  fr: fr,
  de: de
};

var channels = {};
/**
 * Sigleton class to handle application wide events.
 */

var EventEmmiter = {
  subscribe: function subscribe(topic, listener) {
    // Create the topic's object if not yet created
    if (!channels.hasOwnProperty.call(channels, topic)) channels[topic] = []; // Add the listener to queue

    var index = channels[topic].push(listener) - 1; // Provide handle back for removal of topic

    return {
      remove: function remove() {
        //delete topics[topic][index]
        channels[topic].splice(index, 1);
      }
    };
  },
  unsubscribe: function unsubscribe(topic, listener) {
    // Create the topic's object if not yet created
    if (channels.hasOwnProperty.call(channels, topic)) {
      // Add the listener to queue
      var index = channels[topic].findIndex(function (l) {
        return l === listener;
      }); //delete topics[topic][index]

      channels[topic].splice(index, 1);
    }
  },
  publish: function publish(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!channels.hasOwnProperty.call(channels, topic)) return; // Cycle through topics queue, fire!

    channels[topic].forEach(function (item) {
      item(info != undefined ? info : {});
    });
  },
  remove: function remove(topic) {
    // channel is an array of listeners
    var channel = channels[topic];

    while (channel.length > 0) {
      channel.pop();
    }

    delete channels[topic];
  },
  destroy: function destroy() {
    var _this = this;

    Object.keys(channels).forEach(function (topic) {
      _this.remove(topic);
    });
    _readOnlyError("channels");
  }
};

/* jshint esversion:8*/
// Numbers
var Zero = /0/;
var DecInt = /[1-9][0-9]*/;
var OctalInt = /0[0-7]+/;
var HexInt = /0[xX][0-9a-fA-F]+/;
var Integer = '(?:' + Zero.source + '|' + DecInt.source + '|' + OctalInt.source + '|' + HexInt.source + ')[lL]?';
var Exponent = /[eE][+-]?[0-9]/;
var Float1 = '[0-9]+.[0-9]+(' + Exponent.source + ')?';
var Float2 = '.[0-9]+(' + Exponent.source + ')?';
var Float3 = '[0-9]+.' + Exponent.source;
var Float4 = '[0-9]+' + Exponent.source;
var Float = '(?:' + Float1 + '|' + Float2 + '|' + Float3 + '|' + Float4 + ')[fFdD]?|[0-9]+[fFDd]';
var Numeric = Float + '|' + Integer; // URL

var MATH_CONSTS = {
  E: 'Math.E',
  LN2: 'Math.LN2',
  LN10: 'Math.LN10',
  LOG2E: 'Math.LOG2E',
  LOG10E: 'Math.LOG10E',
  PI: 'Math.PI',
  SQRT1_2: 'Math.SQR1_2',
  SQRT2: 'Math.SQRT2'
};
var MATH_FUNCS = {
  abs: 'Math.abs',
  acos: 'Math.acos',
  acosh: 'Math.acosh',
  asin: 'Math.asin',
  asinh: 'Math.asinh',
  atan: 'Math.atan',
  atanh: 'Math.atanh',
  atan2: 'Math.atan2',
  //(x, y)
  cbrt: 'Math.cbrt',
  ceil: 'Math.ceil',
  clz32: 'Math.clz32',
  cos: 'Math.cos',
  cosh: 'Math.cosh',
  exp: 'Math.exp',
  expm1: 'Math.expm1',
  floor: 'Math.floor',
  fround: 'Math.fround',
  hypot: 'Math.hypot',
  //([x[, [y, ...]]])
  imul: 'Math.imul',
  // (x, y)
  log: 'Math.log',
  ln: 'Math.ln',
  log1p: 'Math.log1p',
  log10: 'Math.log10',
  log2: 'Math.log2',
  max: 'Math.max',
  //([x[, [y, ...]]])
  min: 'Math.min',
  //([x[, [y, ...]]])
  pow: 'Math.pow',
  // (x, y)
  random: 'Math.random',
  round: 'Math.round',
  // (x)
  sign: 'Math.sign',
  // (x)
  sin: 'Math.sin',
  // (x)
  sinh: 'Math.sinh',
  // (x)
  sqrt: 'Math.sqrt',
  // (x)
  tan: 'Math.tan',
  tanh: 'Math.tanh',
  trunc: 'Math.trunc' //(x)

};

/**
 * Text tokenizer Lexer
 * @param {String} lang 
 */

var Tokenizer$1 = /*#__PURE__*/function () {
  function Tokenizer() {
    // this.language = language
    // this.Types = []
    // this.Keywords = Keywords[language]
    this.init();
  }

  var _proto = Tokenizer.prototype;

  _proto.init = function init() {
    this.row = 0;
    this.col = 0;
  };

  _proto.tokenizeWord = function tokenizeWord(input, current) {
    var consumedChars = 0;
    var value = '';
    var count = current;
    var _char = input[current]; //test for alphabetic sequence

    do {
      value += _char;
      consumedChars++;
      count++;
      _char = input[count];
    } while (_char && _char.match(/[^*+-/^(),![\]\s]/i));

    if (consumedChars > 0) {
      var token = new Token(ATTR, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  };

  _proto.tokenizeString = function tokenizeString(input, current) {
    if (input[current] === '"') {
      var value = '"';
      var consumedChars = 1;
      var _col = this.col; //consumedChars ++;

      var _char2 = input[current + consumedChars];

      while (_char2 !== '"' && _char2 !== undefined) {
        /*if(char === undefined) {//if production throw new TypeError("unterminated string ");}*/
        value += _char2;
        consumedChars++;
        _char2 = input[current + consumedChars];
      }

      value += '"';
      return [consumedChars + 1, new Token(STRING, value, this.row, _col)]; // { type: 'string', value, row, col }];
    } else if (input[current] === '\'') {
      var _value = '\'';
      var _consumedChars = 1;
      var _col2 = this.col; //consumedChars ++;

      var _char3 = input[current + _consumedChars];

      while (_char3 !== '\'' && _char3 !== undefined) {
        /*if(char === undefined) {//if production throw new TypeError("unterminated string ");}*/
        _value += _char3;
        _consumedChars++;
        _char3 = input[current + _consumedChars];
      }

      _value += '\'';
      return [_consumedChars + 1, new Token(STRING, _value, this.row, _col2)]; // { type: 'string', value, row, col }];
    }

    return [0, null];
  };

  _proto.tokenizeNumber = function tokenizeNumber(input, current) {
    //Return a (multidigit) integer or float consumed from the input
    var result = '';
    var consumedChars = 0;
    var count = current;
    var token = null;

    while (input[count] && input[count].toString().match(Numeric)) {
      result += input[count];
      consumedChars++;
      count++;
    }

    if (input[count] && input[count] == '.') {
      result += input[count];
      consumedChars++;
      count++;

      while (input[count] && input[count].toString().match(Numeric)) {
        result += input[count];
        consumedChars++;
        count++;
      }

      token = [consumedChars, new Token(NUM, Number(result), this.row, this.col)];
    } else {
      token = [consumedChars, new Token(NUM, Number(result), this.row, this.col)];
    }

    if (consumedChars > 0) {
      return token;
    }

    return [0, null];
  };

  _proto.skipWhiteSpace = function skipWhiteSpace(input, current) {
    var result = '';
    var consumedChars = 0;
    var count = current;
    var _char4 = input[current];

    do {
      result += _char4;
      consumedChars++;
      count++;
      _char4 = input[count];
    } while (_char4 && _char4 !== '\n' && _char4.match(/\s/));

    if (consumedChars > 0) {
      var token = new Token(SPACE, result, this.row, this.col);
      return [consumedChars, token];
    }

    return [0, null];
  };

  _proto.tokenizeComment = function tokenizeComment(input, current) {
    if (input[current + 1] === '*') {
      var value = '';
      var count = current;
      var _char5 = input[current];
      var consumedChars = 0;

      do {
        value += _char5;
        consumedChars++;
        count++;
        _char5 = input[count];

        if (_char5 === '\n') {
          this.col = 0;
          this.row++;
        } else if (_char5 === '/' && value[value.length - 1] === '*') {
          value += _char5;
          consumedChars++;
          break;
        }
      } while (_char5);

      var token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    } else if (input[current + 1] === '/') {
      return this.tokenizeLineComment(input, current);
    }

    return [0, null];
  };

  _proto.tokenizeLineComment = function tokenizeLineComment(input, current) {
    var _char6 = input[current];
    var consumedChars = 0;

    if (input[current + 1] === '/') {
      var value = '';
      var count = current;

      do {
        value += _char6;
        consumedChars++;
        count++;
        _char6 = input[count];
      } while (_char6 && _char6 !== '\n');

      var token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  };

  Tokenizer.flagComment = function flagComment(tokens) {
    var filtered = [];

    for (var index = 0; index < tokens.length; index++) {
      var token = tokens[index];

      if (token.type === DIV) {
        var next = tokens[index + 1];

        if (next) {
          var tk = Object.assign({}, token);
          var text = [];

          if (next.type === DIV) {
            // Filter line comment
            do {
              text.push(token.value);
              index++;
              token = tokens[index];
            } while (token && token.type !== LINE);
          } else if (next.type === TIMES) {
            // Filter multi line comment
            do {
              text.push(token.value);
              index++;
              token = tokens[index];

              if (token && token.type === DIV && tokens[index - 1].type === TIMES) {
                text.push(token.value);
                break;
              }
            } while (index < tokens.length);
          }

          tk.value = text.join('');
          tk.type = REM;
          filtered.push(tk);
          continue;
        }
      }

      filtered.push(token);
    }

    return filtered;
  };

  Tokenizer.filterComment = function filterComment(tokens) {
    return tokens.filter(function (token) {
      return token.type !== REM && token.type !== COMMENT;
    });
  };

  Tokenizer.filterSpace = function filterSpace(tokens) {
    return tokens.filter(function (token) {
      return token.type !== SPACE;
    });
  };

  Tokenizer.transform = function transform(tokens) {
    var transformed = [];

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (token.type === 'EOF') break;
      var phrase = [];

      if (token.type === ATTR) {
        var row = token.row;
        var col = token.column;

        do {
          phrase.push(token.value);
          i++;
          token = tokens[i];

          if (token.type === REM) {
            i++;
            token = tokens[i];
            continue;
          }
        } while (token && (token.type === ATTR || token.type == NUM || token.type === SPACE));

        i--;

        if (phrase.length > 0) {
          if (tokens[i].type === SPACE) {
            phrase.pop();
            i--;
          }

          var attr = phrase.join(' ');
          transformed.push({
            type: ATTR,
            value: attr,
            row: row,
            column: col
          });
        }
      } else {
        transformed.push(token);
      }
    }

    return transformed;
  }
  /**
   * 
   * @param {String} input Production rules in plain text
   * @returns { Promise<Object> } Tokens
   */
  ;

  _proto.tokenize = function tokenize(input) {
    try {
      var _this2 = this;

      _this2.row = 0;
      _this2.col = 0;
      var current = 0;
      var tokens = [];
      var consumedChars = 0,
          token = null; // let mathConsts = Object.keys( MATH_CONSTS )
      // let mathFuncs = Object.keys( MATH_FUNCS )

      return Promise.resolve(new Promise(function (resolve, reject) {
        setTimeout(function () {
          var _loop = function _loop() {
            var _char7 = input[current];
            var tokenized = false;

            var found = _this2.SpecialCharacters.find(function (v) {
              return v[1] === _char7;
            });

            switch (_char7) {
              case '\n':
                {
                  tokens.push(new Token(LINE, _char7, _this2.row, _this2.col));
                  current++;
                  _this2.col = 0;
                  _this2.row++;
                  break;
                }

              default:
                if ('/' === _char7 && (input[current + 1] === "*" || input[current + 1] === "/")) {
                  var _this2$tokenizeCommen = _this2.tokenizeComment(input, current),
                      chars = _this2$tokenizeCommen[0],
                      tk = _this2$tokenizeCommen[1];

                  consumedChars = chars;
                  token = tk;
                } else if ('"' === _char7) {
                  var _this2$tokenizeString = _this2.tokenizeString(input, current),
                      _chars = _this2$tokenizeString[0],
                      _tk = _this2$tokenizeString[1];

                  consumedChars = _chars;
                  token = _tk;
                } else if (found) {
                  token = new Token(found[0], _char7, _this2.row, _this2.col);
                  consumedChars = 1;
                } else if (RegExp(Numeric).test(_char7)) {
                  //Number: tokenize number
                  var _this2$tokenizeNumber = _this2.tokenizeNumber(input, current),
                      _chars2 = _this2$tokenizeNumber[0],
                      _tk2 = _this2$tokenizeNumber[1];

                  consumedChars = _chars2;
                  token = _tk2;
                } else if (RegExp(/\s/).test(_char7)) {
                  var _this2$skipWhiteSpace = _this2.skipWhiteSpace(input, current),
                      _chars3 = _this2$skipWhiteSpace[0],
                      _tk3 = _this2$skipWhiteSpace[1];

                  consumedChars = _chars3;
                  token = _tk3;
                } else if (RegExp(/[a-zA-Z]|\w/i).test(_char7)) {
                  // let pattern = /[a-zA-Z]|\w/i
                  var _this2$tokenizeWord = _this2.tokenizeWord(input, current),
                      _chars4 = _this2$tokenizeWord[0],
                      _tk4 = _this2$tokenizeWord[1];

                  consumedChars = _chars4;
                  token = _tk4;
                } else {
                  tokenized = false;
                }

                if (consumedChars !== 0) {
                  tokenized = true;
                  current += consumedChars;
                  _this2.col += consumedChars;
                  tokens.push(token);
                }

                if (!tokenized) {
                  err = new Token(ERROR, input[current], _this2.row, _this2.col); //{type:'ERROR', value:input[current], row:this.row-1,col:this.col, pos:current};

                  tokens.push(err);
                  current++; //if (production) throw new TypeError('Invalid input: '+input[current-1]);
                }

            }
          };

          while (current < input.length) {
            var err;

            _loop();
          }

          tokens.push(new Token(EOF, '', _this2.row, -1)); //{type:'EOF', value:''});

          resolve(tokens);
        }, 100);
      })); // console.log( { tokens } )
      // return tokens
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _createClass(Tokenizer, [{
    key: "SpecialCharacters",
    get: function get() {
      return [[LPAREN, '('], [RPAREN, ')'], [LBRACKET, '['], [RBRACKET, ']'], [CARRET, '^'], [TIMES, '*'], [MINUS, '-'], [PLUS, '+'], [DIV, '/'], [MOD, '%'], [EQ, '='], [GT, '>'], [LT, '<'], [COMMA, ','], [STRING, '"'], [LINE, '\n'], [EOF, '']];
    }
  }]);

  return Tokenizer;
}();

var ParseToken = function ParseToken(self) {
  return {
    rule: function rule(token) {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE || self.prev === AND) {
        self.prev = RULE;
        var r = self.scanRule();
        EventEmmiter.publish("rule", [r, self.row], this);
        return true;
      }
    },
    "if": function _if() {
      if (self.prev === RULE) {
        self.prev = IF;
        var p = self.scanPremise();
        if (!p) return;
        var left = p.left,
            right = p.right,
            op = p.op;
        EventEmmiter.publish("condition", [IF, left, right, self.row, op], this);
        return true;
      }
    },
    or: function or() {
      if (self.prev === IF || self.prev === ELSEIF || self.prev === OR || self.prev === AND) {
        self.prev = OR;
        var p = self.scanPremise();
        if (!p) return;
        var left = p.left,
            right = p.right,
            op = p.op;
        EventEmmiter.publish("premise", [OR, left, right, self.row, op], this);
        return true;
      }
    },
    and: function and() {
      if (self.prev === IF || self.prev === ELSEIF || self.prev === THEN || self.prev === ELSE || self.prev === AND) {
        self.prev = AND;

        if (self.prev === THEN) {
          var p = self.scanInference();
          if (!p) return;
          var name = p.name,
              right = p.right;
          EventEmmiter.publish("inference", [name, right, false, self.row], this);
          return true;
        } else if (self.prev === ELSE) {
          var _p = self.scanInference();

          if (!_p) return;
          var _name = _p.name,
              _right = _p.right;
          EventEmmiter.publish("inference", [_name, _right, false, self.row], this);
          return true;
        } else {
          var _p2 = self.scanPremise();

          if (!_p2) return;
          var left = _p2.left,
              _right2 = _p2.right,
              op = _p2.op;
          EventEmmiter.publish("premise", [AND, left, _right2, self.row, op], this);
          return true;
        }
      }
    },
    then: function then(token) {
      // console.log(self.prev, token)
      if (self.prev === IF || self.prev === ELSEIF || self.prev === OR || self.prev === AND) {
        self.prev = THEN;
        var p = self.scanInference();
        if (!p) return false;
        var name = p.name,
            right = p.right;
        EventEmmiter.publish("inference", [name, right, false, self.row], this);
        return true;
      }
    },
    elseif: function elseif(token) {
      if (self.prev === THEN || self.prev === AND || self.prev === ELSE) {
        self.prev = ELSEIF; // console.log(token)

        var p = self.scanPremise();
        if (!p) return;
        var left = p.left,
            right = p.right,
            op = p.op;
        EventEmmiter.publish("condition", [ELSEIF, left, right, self.row, op], this);
        return true;
      }
    },
    "else": function _else() {
      if (self.prev === THEN || self.prev === AND) {
        self.prev = ELSE;
        var f = self.scanInference();
        if (!f) return;
        var name = f.name,
            right = f.right;
        EventEmmiter.publish("inference", [name, right, true, self.row], this);
        return true;
      }
    },
    prompt: function prompt() {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
        self.prev = PROMPT;
        var p = self.scanPrompt();
        EventEmmiter.publish("prompt", [p, self.row], this);
        return true;
      }
    },
    question: function question() {
      if (self.prev === PROMPT) {
        self.prev = QUESTION;
        var q = self.scanQuestion();
        EventEmmiter.publish("question", [q, self.row], this);
        return true;
      }
    },
    menu: function menu() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        var m = self.scanMenu();
        EventEmmiter.publish("menu", [m, self.row], this);
        return this;
      }
    },
    digit: function digit() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanDigit();
        EventEmmiter.publish("digit", [self.row], this);
        return true;
      }
    },
    text: function text() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanText();
        EventEmmiter.publish("text", [self.row], this);
        return true;
      }
    },
    yes: function yes() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanYesNo();
        EventEmmiter.publish("yes-no", [self.row], this);
        return true;
      }
    },
    "true": function _true() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanTrueFalse();
        EventEmmiter.publish("true-false", [self.row], this);
        return true;
      }
    },
    min: function min() {
      if (self.prev === MENU) {
        var min = self.scanMin(); // self.pos--

        if (min) {
          EventEmmiter.publish("min", [min, self.row], this);
        }

        return true;
      }
    },
    max: function max() {
      if (self.prev === MENU) {
        var max = self.scanMax(); // self.pos--

        if (max) {
          EventEmmiter.publish("max", [max, self.row], this);
        }

        return true;
      }
    },
    cf: function cf() {
      if (self.prev === MENU) {
        EventEmmiter.publish("cf", [self.row], this);
        return true;
      }
    },
    mod: function mod() {
      if (self.prev === MENU) {
        EventEmmiter.publish("cf", [self.row], this);
        return true;
      }
    },
    attribute: function attribute() {
      var attribute = self.scanAttribute();
      EventEmmiter.publish("attribute", [attribute, self.row], this);
      return true;
    },
    goal: function goal(token) {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
        if (self.lastToken.type === LINE) {
          var goal = self.scanGoal();

          if (goal) {
            EventEmmiter.publish("goal", [goal, self.row], this);
          }

          return true;
        }
      }
    },
    array: function array() {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
        var array = self.scanArray();
        EventEmmiter.publish("array", [array, self.row], this);
        return true;
      }
    },
    title: function title() {
      if (self.prev === null) {
        var title = self.scanTitle();
        EventEmmiter.publish("title", [title, self.row], this);
        return true;
      }
    },
    summary: function summary() {
      if (self.prev === null) {
        var summary = self.scanSummary();
        EventEmmiter.publish("summary", [summary, self.row], this);
        return true;
      }
    },
    line: function line() {
      EventEmmiter.publish("line", [self.row], this);
      return true;
    },
    eof: function eof() {
      // End of file
      EventEmmiter.publish("eof", [self.row], this);
      return true;
    },
    error: function error(token) {
      self.error("Unknown character or token: " + token.value, token);
      return true;
    }
  };
};

/**
 * Laguage grammar parser. Parser is language neutral, 
 * it does not know in which language the rules are written
 */

var Parser = /*#__PURE__*/function () {
  /**
    * Constructor 
    */
  function Parser(language, languageModule) {
    // super()
    this.language = language; // this.languageModule = languageModule

    this.keywords = languageModule.keywords; // languageModule.keywords // keywords[language.toLowerCase()]

    this.keyMap = Object.keys(this.keywords);
    this.keyValues = Object.values(this.keywords);
    this.tokens = null;
    this.prev = null;
    this.errors = [];
    this.data = {};
    this.parseToken = ParseToken(this); // this.init()
  }

  var _proto = Parser.prototype;

  _proto.init = function init() {
    this.row = 0;
    this.col = 0;
    this.errors = [];
    this.attributes = {}, this.prompts = {}, this.inferences = [];
    this.knowledgebase = null;
    this.data = null;
    this.tokens = [];
  };

  _proto.matchCloseParenthesis = function matchCloseParenthesis(tokens, startIndex) {
    var $return = -1;
    var left = 0;
    var right = 0;

    for (var i = startIndex; i < tokens.length; i++) {
      var s = tokens[i].value;

      if (s === '(') {
        left++;
      } else if (s === ')') {
        right++;
      }

      if (left > 0 && left === right) {
        $return = i;
        break;
      }
    }

    return $return;
  };

  _proto.matchOpenParenthesis = function matchOpenParenthesis(tokens, startIndex) {
    var $return = -1;
    var left = 0;
    var right = 0;

    for (var i = startIndex; i >= 0; i--) {
      var s = tokens[i].value;

      if (s === '(') {
        left++;
      } else if (s === ')') {
        right++;
      }

      if (left > 0 && left === right) {
        $return = i;
        break;
      }
    }

    return $return;
  };

  _proto.matchParenthesis = function matchParenthesis(tokens) {
    if (!tokens) return;
    this.matchBrackets(tokens);
    var open = '(';
    var close = ')';
    var opens = [];
    var closes = [];

    for (var i = 0; i < tokens.length; i++) {
      var c = tokens[i].value;

      if (c === open) {
        opens.push([i, c]);
      } else if (c === close) {
        closes.push([i, c]);
      }
    }

    for (var _i = opens.length - 1; _i >= 0; _i--) {
      var match = this.matchCloseParenthesis(tokens, opens[_i][0]);

      if (match === -1) {
        var msg = 'Open parenthesis \'{0}\' at column {1} has no close parenthesis';
        this.error(msg);
        break;
      }
    }

    for (var _i2 = 0; _i2 < closes.length; _i2++) {
      // let c = closes[i][1];
      var index = closes[_i2][0];

      var _match = this.matchOpenParenthesis(tokens, index);

      if (_match === -1) {
        var _msg = 'Close parenthesis \'{0}\' at column {1} has no opening parenthesis';
        this.error(_msg);
        break;
      }
    }
  };

  _proto.matchCloseBracket = function matchCloseBracket(tokens, startIndex) {
    var $return = -1;
    var left = 0;
    var right = 0;

    for (var i = startIndex; i < tokens.length; i++) {
      var s = tokens[i].value;

      if (s === '[') {
        left++;
      } else if (s === ']') {
        right++;
      }

      if (left > 0 && left === right) {
        $return = i;
        break;
      }
    }

    return $return;
  };

  _proto.matchOpenBracket = function matchOpenBracket(tokens, startIndex) {
    var $return = -1;
    var left = 0;
    var right = 0;

    for (var i = startIndex; i >= 0; i--) {
      var s = tokens[i].value;

      if (s === '[') {
        left++;
      } else if (s === ']') {
        right++;
      }

      if (left > 0 && left === right) {
        $return = i;
        break;
      }
    }

    return $return;
  };

  _proto.matchBrackets = function matchBrackets(tokens) {
    if (!tokens) return;
    var open = '[';
    var close = ']';
    var opens = [];
    var closes = [];

    for (var i = 0; i < tokens.length; i++) {
      var c = tokens[i].value;

      if (c === open) {
        opens.push([i, c]);
      } else if (c === close) {
        closes.push([i, c]);
      }
    }

    for (var _i3 = opens.length - 1; _i3 >= 0; _i3--) {
      var match = this.matchCloseBracket(tokens, opens[_i3][0]);

      if (match === -1) {
        var msg = 'Open bracket \'{0}\' at column {1} has no close bracket';
        this.error(msg);
        break;
      }
    }

    for (var _i4 = 0; _i4 < closes.length; _i4++) {
      var index = closes[_i4][0];

      var _match2 = this.matchOpenBracket(tokens, index);

      if (_match2 === -1) {
        var _msg2 = 'Close bracket \'{0}\' at column {1} has no opening bracket';
        this.error(_msg2);
        break;
      }
    }
  };

  _proto.matchDuplicateOperator = function matchDuplicateOperator(token) {
    if (!token) return;

    if (token.value.toString().match(/[+\-*/]/)) {
      var next = this.peek();

      if (next && next.value.toString().match(/[+\-*/]/)) {
        this.error('Duplicate operator ' + token.value + ' ' + next.value, token);
        return;
      }
    }
  };

  _proto.readToEndOfLine = function readToEndOfLine() {
    var tokens = [];
    var peek = null;

    do {
      peek = this.peek();
      var token = this.tokens[this.pos];
      tokens.push(token);
      this.advance();
    } while (peek && peek.type !== LINE && peek.type !== EOF);

    var text = tokens.map(function (t) {
      return t.value;
    });

    if (!text || text.length === 0) {
      return null;
    }

    return text.join(' ');
  };

  _proto.scanRule = function scanRule() {
    var text = this.scanDefinition(RULE);

    if (!text || text.length === 0) {
      return this.error('Rule should have description');
    }

    return text;
  };

  _proto.scanDefinition = function scanDefinition(type, name) {
    var token = this.peek(type);
    if (token) this.eat(type);
    return this.readToEndOfLine();
  };

  _proto.scanTitle = function scanTitle() {
    var text = this.scanDefinition(TITLE, this.keywords.TITLE);

    if (!text || text.length === 0) {
      return this.error('Title should have description');
    }

    return text;
  };

  _proto.scanSummary = function scanSummary() {
    var text = this.scanDefinition(SUMMARY, this.keywords.SUMMARY);

    if (!text || text.length === 0) {
      return this.error('Summary should have description');
    }

    return text;
  };

  _proto.scanQuestion = function scanQuestion() {
    var text = this.scanDefinition(QUESTION, this.keywords.QUESTION);

    if (!text || text.length === 0) {
      return this.error('Question should have a statement');
    }

    return text;
  };

  _proto.scanAttribute = function scanAttribute() {
    // then attribute equal expression
    this.eat(ATTRIBUTE);
    var left = this.eat(ATTR);

    if (!left) {
      return this.error('Attribute definition should have Attribute Name');
    }

    var equal = this.eat(EQ);

    if (!equal) {
      return this.error('Expected =');
    }

    var right = this.rightNode();

    if (right.type === EOF) {
      return this.error('Expected expression but found end of file', right);
    } else if (right.type === LINE) {
      return this.error('Expected expression but found new line', right);
    }

    this.matchParenthesis(left);
    this.matchParenthesis(right);
    var rt = right.map(function (n) {
      return n.value;
    });
    this.assignGlobal(left.value, rt.join(' '), right[0].row, right[0].column, true);
    return [left.value, right];
  };

  _proto.scanArray = function scanArray() {
    var node = this.eat(ARRAY);

    if (!node) {
      return this.error('Expected array name');
    }

    var equal = this.eat(EQ);

    if (!equal) {
      return this.error('Expected =');
    } // let token=null;


    var tokens = [];
    var lparen = this.eat(LPAREN);

    if (!lparen) {
      return this.error('Expected (');
    } // tokens.push(lparen);


    while (this.peek() && this.peek().type !== LINE && this.peek().type !== EOF) {
      var token = this.tokens[this.pos];

      if (!token || token.type !== NUM && token.type !== ATTR) {
        return this.error('Expected number or Attribute');
      }

      tokens.push(token);
      token = this.eat(COMMA);

      if (!token) {
        return this.error('Expected ,');
      }

      tokens.push(token);
    }

    var rparen = tokens.pop();

    if (rparen && rparen.type !== RPAREN) {
      return this.error('Expected ) but found new line');
    }

    this.assignGlobal(node.value, node.value, node.row, node.column);
    return [node, tokens, ARRAY];
  };

  _proto.scanGoal = function scanGoal() {
    // this.eat(GOAL)
    var text = this.scanDefinition(GOAL);

    if (!text || text.length === 0) {
      return this.error('Goal definition should have texts');
    }

    return text;
  };

  _proto.scanPrompt = function scanPrompt() {
    // this.eat(PROMPT)
    var prompt = this.scanDefinition(PROMPT); // this.eat(ATTR)

    if (!prompt || prompt.length === 0) {
      return this.error('Prompt definition should have texts');
    }

    this.prompts[prompt.toLowerCase()] = prompt;
    return prompt;
  };

  _proto.scanMenu = function scanMenu() {
    this.eat(MENU);
    var tokens = [];
    var lparen = this.eat(LPAREN);

    if (!lparen) {
      return this.error('Expected (');
    }

    var token = this.tokens[this.pos];

    while (token && token.type !== RPAREN && token.type !== LINE && token.type !== EOF) {
      if (!token || token.type !== NUM && token.type !== ATTR && token.type !== YES && token.type !== NO && token.type !== TRUE && token.type !== FALSE) {
        return this.error('Expected number or Attribute');
      }

      tokens.push(token);

      if (this.peek() && this.peek().type === RPAREN) {
        this.advance();
        break;
      }

      this.advance();
      this.eat(COMMA);
      token = this.tokens[this.pos];
    }

    var menu = tokens.map(function (m) {
      return m.value;
    });
    return menu;
  };

  _proto.scanYesNo = function scanYesNo() {
    // let next = this.peek()
    this.eat(YES); // if (next && next.type === COMMA) {

    this.eat(COMMA); // }

    this.eat(NO);
  };

  _proto.scanTrueFalse = function scanTrueFalse() {
    // let next = this.peek()
    this.eat(TRUE); // if (next && next.type === COMMA) {

    this.eat(COMMA); // }

    this.eat(FALSE);
  };

  _proto.scanDigit = function scanDigit() {
    this.eat(DIGIT);
  };

  _proto.scanText = function scanText() {
    this.eat(TEXT);
  };

  _proto.scanMin = function scanMin() {
    this.eat(MIN);
    var min = this.eat(NUM);
    return min;
  };

  _proto.scanMax = function scanMax() {
    this.eat(MAX);
    var max = this.eat(NUM);
    return max;
  };

  _proto.scanCF = function scanCF() {
    if (this.peek() && this.peek().type === this.CF) {
      this.advance();
      cf = true;
    }

    if (this.peek() && this.peek().type !== LINE) {
      this.error('Expected end of line but found ' + this.peek().value);
    }
  };

  _proto.scanInference = function scanInference() {
    this.advance();
    var name = this.leftAttribute();
    var right = null;
    var nextToken = this.taste();
    var comparator = nextToken;

    if (!comparator) {
      return this.error('Expected expression but found end of line');
    }

    switch (nextToken.type) {
      case EQ:
      case GT:
      case LT:
      case NOT:
      case IS:
      case IN:
      case EX:
        this.advance();
        right = this.rightNode();

        if (comparator) {
          if (right && right[0].type === EOF) {
            return this.error('Expected expression but found end of file', right);
          } else if (right && right[0].type === LINE) {
            return this.error('Expected expression but found new line', right);
          }

          this.matchParenthesis(right);
        }

        break;

      default:
        comparator = null;
    }

    var _right = Object.assign({}, name);

    if (!right) {
      _right.type = TRUE;
      _right.value = this.keywords[TRUE];
    }

    if (!right) right = [_right];
    return {
      name: name,
      right: right
    };
  };

  _proto.scanPremise = function scanPremise() {
    var _this = this;

    this.advance();
    var left = this.leftNode();
    var nextToken = this.taste();
    var comparator = nextToken;

    if (!comparator) {
      return this.error('Expected expression but found end of line');
    }

    this.matchParenthesis(left);
    var comp = null;
    var right = [];

    switch (comparator.type) {
      case EQ:
      case GT:
      case LT:
      case NOT:
      case IS:
      case IN:
      case EX:
        this.advance();
        comp = comparator.type;
        right = this.rightNode();
        this.matchParenthesis(right);

        if (comparator) {
          if (right && right[0].type === EOF) {
            return this.error('Expected expression but found end of file', right);
          } else if (right && right[0].type === LINE) {
            return this.error('Expected expression but found new line', right);
          }

          this.matchParenthesis(right);
        }

        break;

      case AND:
      case OR:
        this.pos--;
        break;

      default:
        comparator = null;
    } // if (left.length == 0) {
    // this.error('Expected expression but found end of line')
    // }


    left.forEach(function (token) {
      if (token.type === ATTR) {
        if (!_this.attributes[token.value.toLocaleLowerCase()]) {
          _this.assignGlobal(token.value, null, token.row, token.column);
        }
      }
    });

    if (!right || right.length === 0) {
      var _right = Object.assign({}, {});

      _right.type = TRUE;
      _right.value = this.keywords[TRUE];
      right = [_right];
    }

    if (!comp) comp = EQ;
    return {
      left: left,
      right: right,
      op: comp
    };
  };

  _proto.peek = function peek() {
    var peek_pos = this.pos + 1;

    if (peek_pos > this.tokens.length - 1) {
      return null;
    }

    return this.tokens[peek_pos];
  };

  _proto.trace = function trace() {
    var trace_pos = this.pos - 1;

    if (trace_pos < 0) {
      return null;
    }

    return this.tokens[trace_pos];
  };

  _proto.taste = function taste() {
    var token = this.tokens[this.pos];
    return token;
  };

  _proto.eat = function eat(type) {
    var token = this.tokens[this.pos];

    if (token) {
      if (token.type === type) {
        this.advance();
        return token;
      } else {
        return this.error('Expected ' + type + ' but found ' + token.type);
      }
    }

    return this.error('Expected ' + type + ' but found end of line');
  };

  _proto.advance = function advance() {
    this.pos++;
  };

  _proto.rightNode = function rightNode() {
    var result = [];
    var token = this.tokens[this.pos];

    while (token && token.type !== LINE && token.type !== EOF) {
      switch (token.type) {
        case EQ:
        case GT:
        case LT:
        case NOT:
        case IS:
        case IN:
        case EX:
          return this.error('Duplicate comparator ' + token.value);

        case AND:
        case OR:
          return result;

        default:
          this.matchDuplicateOperator(token);
          result.push(token);
          this.advance();
          token = this.tokens[this.pos];
      }
    }

    return result;
  };

  _proto.leftNode = function leftNode() {
    var result = [];
    var token = this.tokens[this.pos];

    while (token && token.type !== LINE && token.type !== EOF) {
      if (token.type === ERROR) {
        this.error('Error', token);
      }

      switch (token.type) {
        case EQ:
        case GT:
        case LT:
        case NOT:
        case IS:
        case IN:
        case EX:
          return result;

        case AND:
        case OR:
          return result;

        default:
          // do nothing
          this.matchDuplicateOperator(token);
          result.push(token);
          this.advance();
          token = this.tokens[this.pos];
      }
    }

    return result; // may never be reached
  };

  _proto.leftAttribute = function leftAttribute() {
    var token = this.eat(ATTR);

    if (!token) {
      return this.error('Expected attribute');
    }

    this.inferences[token.value.toLocaleLowerCase()] = token;
    return token; // may never be reached
  };

  _proto.comparator = function comparator() {
    var token = this.tokens[this.pos];

    switch (token.type) {
      case EQ:
      case GT:
      case LT:
      case NOT:
      case IS:
      case IN:
      case EX:
        break;

      default:
        this.warn('Expected comparator but found ' + token.value + ' ' + token.row);
    }

    this.advance();
    return token;
  };

  _proto.assignGlobal = function assignGlobal(name, value, row, col, inf) {
    this.attributes[name.toLocaleLowerCase()] = {
      name: name,
      value: value,
      row: row,
      col: col
    };

    if (inf) {
      this.inferences[name.toLocaleLowerCase()] = name;
    }
  };

  _proto.checkVarableDeclarations = function checkVarableDeclarations() {
    var _this2 = this;

    Object.keys(this.attributes).forEach(function (k) {
      var a = _this2.attributes[k];

      if (!(_this2.inferences[k] || _this2.prompts[k])) {
        _this2.warn('No input prompt for attribute ' + k, a); // console.log(this.inferences, this.prompts)

      }
    });
  };

  _proto.warn = function warn(msg, token) {
    var w = {
      type: 'warning',
      // "error"|"warning"|"info"
      row: token ? token.row : this.row,
      // row index
      column: token ? token.col : this.col,
      // character index on line
      text: msg,
      // Error message
      raw: '' // "Missing semicolon"

    };
    this.errors.push(w);
    EventEmmiter.publish('warning', w);
  };

  _proto.error = function error(msg, token) {
    var e = {
      type: 'error',
      // "error"|"warning"|"info"
      row: token ? token.row : this.row,
      // row index
      column: token ? token.column : this.col,
      // character index on line
      text: msg,
      // Error message
      raw: token // "Missing semicolon"

    };
    this.errors.push(e);
    EventEmmiter.publish('error', e);
  };

  _proto.info = function info(msg, token) {
    var i = {
      type: 'info',
      // "error"|"warning"|"info"
      row: token ? token.row : this.row,
      // row index
      column: token ? token.col : this.col,
      // character index on line
      text: msg,
      // Error message
      raw: token // "Missing semicolon"

    };
    this.errors.push(i);
    EventEmmiter.publish('info', i);
  };

  _proto.isKeyword = function isKeyword(word, index, tokens) {
    var token = index > 0 ? tokens[index - 1] : null;
    var prev = token ? token.type : null;
    var history = index > 1 ? tokens[index - 2].type : null;

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
          return true;
        }

        return false;

      case YES:
      case TRUE:
        if (prev === LINE || prev === EQ || prev === IS) {
          return true;
        }

        return false;

      case NO:
        if (prev === EQ || prev === IS) {
          return true;
        } else if (prev === COMMA && history === YES) {
          return true;
        }

        return false;

      case FALSE:
        if (prev === EQ || prev === IS) {
          return true;
        } else if (prev === COMMA && history === TRUE) {
          return true;
        }

        return false;

      case MIN:
        if (prev === LINE) return true;
        return false;

      case MAX:
        if (prev === LINE) {
          return true;
        }

        return false;

      case IF:
        if (prev === LINE || prev === ELSE) {
          return true;
        }

        return false;

      case ELSEIF:
        if (prev === LINE) {
          return true;
        }

        return false;

      default:
        return true;
    }
  };

  _proto.filterKeywords = function filterKeywords() {
    var _this3 = this;

    var tokens = [];
    var prevToken = null;

    var _loop = function _loop(i) {
      var token = _this3.tokens[i];

      if (token.type === ATTR) {
        //let found = this.keyValues.findIndex(v => v.toUpperCase() === token.value.toUpperCase())
        var key = _this3.keyMap.find(function (k) {
          return _this3.keywords[k].toUpperCase && _this3.keywords[k].toUpperCase() === token.value.toUpperCase();
        });

        if (key) {
          var isKeyword = _this3.isKeyword(key, i, tokens);

          if (isKeyword) {
            var tk = Object.assign({}, token);
            tk.type = key;

            if (prevToken && prevToken.type === ELSE && key === IF) {
              tokens[i - 1].value += ' ' + tk.value;
              tokens[i - 1].type = ELSEIF;
              prevToken = token;
              tokens.push(null);
              return "continue";
            } else {
              token = tk;
            }

            tokens.push(tk);
            return "continue";
          }
        }
      }

      tokens.push(token);
      prevToken = token; // history.unshift(Object.assign({}, token))
      // if (history.length > 2) history.pop()
    };

    for (var i = 0; i < this.tokens.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    this.tokens = tokens; // console.log(tokens)
  };

  _proto.transform = function transform() {
    var transformed = [];
    this.filterKeywords();

    for (var i = 0; i < this.tokens.length; i++) {
      var token = this.tokens[i];
      if (token.type === EOF) break;
      var phrase = [];

      if (token.type === ATTR) {
        var row = token.row;
        var col = token.column;

        do {
          phrase.push(token.value);
          i++;
          token = this.tokens[i];
        } while (token && (token.type === ATTR || token.type == NUM));

        var attr = phrase.join(' ');
        transformed.push({
          type: ATTR,
          value: attr,
          row: row,
          column: col
        });
        i--; // Go back to last token (tokens[i])
      } else if (token.type === ELSE && this.tokens[i + 1] && this.tokens[i + 1].type === IF) {
        var next = this.tokens[i + 1];
        var t = Object.assign({}, token);
        t.type = ELSEIF;
        t.value = t.value + ' ' + next.value;
        transformed.push(t);
        i++; // Skip the next Token (IF)
      } else {
        transformed.push(token);
      }
    }

    this.tokens = transformed;
  };

  _proto.applyMaths = function applyMaths() {
    var _this4 = this;

    var _tokens = [];

    for (var i = 0; i < this.tokens.length; i++) {
      var math = null;
      var current = this.tokens[i];
      var t = this.tokens[i + 1];

      if (t && t.type === LPAREN && current.type === ATTR && MATH_FUNCS[current.value]) {
        math = Object.assign({}, current);
        math.type = FUNC;

        _tokens.push(math);
      } else if (current.type === ATTR && MATH_CONSTS[current.value]) {
        math = Object.assign({}, current);
        math.type = CONST;

        _tokens.push(math);
      } else {
        _tokens.push(current);
      }
    }

    var finalTokens = [];

    var _loop2 = function _loop2(_i6) {
      var math = null;
      var current = _tokens[_i6];
      var t = _tokens[_i6 + 1];
      var nextToken = _tokens[_i6 + 2];

      if ((current.type === ATTR || current.type === NUM || current.type === CONST) && (t.type === LPAREN || t.type === LBRACKET)) {
        finalTokens.push(current);

        var key = _this4.keyMap.find(function (k) {
          return _this4.keywords[k].toUpperCase() === current.value.toUpperCase();
        });

        if (!key) {
          math = Object.assign({}, current);
          math.type = TIMES;
          math.value = '*'; // finalTokens.push(current)

          finalTokens.push(math);
        }
      } else if (nextToken && (nextToken.type === ATTR || nextToken.type === NUM || nextToken.type === CONST) && (current.type === ATTR || current.type === NUM || current.type === CONST) && t.type === CARRET) {
        var pow = Object.assign({}, current);
        pow.type = 'FUNC';
        pow.value = 'pow';
        var paren = Object.assign({}, current);
        paren.type = LPAREN;
        paren.value = '(';
        var rparen = Object.assign({}, current);
        rparen.type = RPAREN;
        rparen.value = ')';
        var comma = Object.assign({}, current);
        comma.type = COMMA;
        comma.value = ',';
        finalTokens.push(pow);
        finalTokens.push(paren);
        finalTokens.push(current);
        finalTokens.push(comma);
        finalTokens.push(nextToken);
        finalTokens.push(rparen);
        _i6++;
        _i6++;
      } else {
        finalTokens.push(current);
      }

      _i5 = _i6;
    };

    for (var _i5 = 0; _i5 < _tokens.length; _i5++) {
      _loop2(_i5);
    }

    this.tokens = finalTokens;
  };

  _proto.filterComment = function filterComment() {
    return this.tokens.filter(function (token) {
      return token.type !== REM && token.type !== COMMENT;
    });
  }
  /**
     * Recursively go through tokens and emmit events using implementation of
     * Finite State Machine (FST)
     * @param {JSON} tokens 
     * @returns { Promise<Object> } errors if any including warning and info
     */
  ;

  _proto.parse = function parse(text) {
    try {
      var _this6 = this;

      return Promise.resolve(new Promise(function (resolve, reject) {
        try {
          _this6.init();

          _this6.pos = 0;
          var tokenizer = new Tokenizer$1();
          return Promise.resolve(tokenizer.tokenize(text)).then(function (tokens) {
            setTimeout(function () {
              _this6.tokens = tokens.filter(function (token) {
                return token.type !== SPACE && token.type !== REM;
              });

              _this6.applyMaths();

              _this6.transform();

              _this6.prev = null;
              _this6.lastToken = null;

              for (_this6.pos = 0; _this6.pos < _this6.tokens.length; _this6.pos++) {
                var token = _this6.tokens[_this6.pos];
                _this6.lastToken = _this6.tokens[_this6.pos > 0 ? _this6.pos - 1 : 0];
                _this6.row = token.row;
                _this6.col = token.column;
                var type = token.type;

                if (type === REM || type === COMMENT) {
                  continue;
                }

                var action = _this6.parseToken[type.toLowerCase()];

                if (action) {
                  // call the method to parse token
                  var result = _this6.parseToken[type.toLowerCase()](token);

                  if (!result) {
                    _this6.error('Invalid keyword: ' + token.value);
                  }
                } else {
                  _this6.error('Invalid token or keyword: ' + token.value, token);
                }
              }

              _this6.checkVarableDeclarations(); // pubsub.publish('data', { errors: this.errors, data: this.tokens })


              EventEmmiter.publish('done', {
                errors: _this6.errors,
                data: _this6.tokens
              });

              if (_this6.errors.length > 0) {
                // console.log(this.tokens, this.errors, this.keywords)
                resolve(_this6.errors); // 
              } else {
                resolve([]);
              }
            }, 100);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _createClass(Parser, [{
    key: "Event",
    get: function get() {
      return Object.prototype.prototype;
    }
  }, {
    key: "Data",
    get: function get() {
      return this.data;
    }
  }, {
    key: "Error",
    get: function get() {
      return this.errors;
    }
  }]);

  return Parser;
}();

var Tokenizer = /*#__PURE__*/function () {
  function Tokenizer() {
    this.row = 0;
    this.col = 0;
    this.errors = [];
  }

  var _proto = Tokenizer.prototype;

  _proto.error = function error(msg, token, flag) {
    if (flag === void 0) {
      flag = 'error';
    }

    var e = {
      type: flag,
      // "error"|"warning"|"info"
      row: token.row || this.row,
      // row index
      column: token.col || this.col,
      // character index on line
      text: msg,
      // Error message
      raw: token // "Missing semicolon"

    };
    this.errors.push(e);
  };

  _proto.tokenizeNumber = function tokenizeNumber(input, current) {
    //Return a (multidigit) integer or float consumed from the input
    var result = '';
    var consumedChars = 0;
    var count = current;
    var _char = input[current];

    do {
      result += _char;
      consumedChars++;
      count++;
      _char = input[count];
    } while (_char && _char.toString().match(/[0-9]/));

    if (consumedChars > 0) {
      var token = [consumedChars, new Token(NUM, Number(result), this.row, this.col)];
      return token;
    }

    return [0, null];
  };

  _proto.skipWhiteSpace = function skipWhiteSpace(input, current) {
    var result = '';
    var consumedChars = 0;
    var count = current;
    var _char2 = input[current];

    do {
      result += _char2;
      consumedChars++;
      count++;
      _char2 = input[count];
    } while (_char2 && _char2 !== '\n' && _char2.match(/\s/));

    if (consumedChars > 0) {
      var token = [consumedChars, new Token(SPACE, result, this.row, this.col)];
      return token;
    }

    return [0, null];
  };

  _proto.tokenizeWord = function tokenizeWord(input, current) {
    var consumedChars = 0;
    var value = '';
    var count = current;
    var _char3 = input[current]; //test for alphabetic sequence

    do {
      value += _char3;
      consumedChars++;
      count++;
      _char3 = input[count];
    } while (_char3 && _char3 !== "\n" && _char3 !== " " && _char3 !== "=" && _char3 !== ":");

    if (consumedChars > 0) {
      var token = new Token(ATTR, value, this.row, this.col); // console.log([consumedChars, token])

      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  };

  _proto.tokenizeBlockCommentXXX = function tokenizeBlockCommentXXX(input, current) {
    if (input[current + 1] === '*') {
      var value = '';
      var count = current;
      var _char4 = input[current];
      var consumedChars = 0;

      do {
        value += _char4;
        consumedChars++;
        count++;
        _char4 = input[count];

        if (_char4 === '\n') {
          this.col = 0;
          this.row++;
        } else if (_char4 === '/' && value[value.length - 1] === '*') {
          value += _char4;
          consumedChars++;
          break;
        }
      } while (_char4);

      var token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    } else if (input[current + 1] === '/') {
      return this.tokenizeLineComment(input, current);
    }

    return [0, null];
  };

  _proto.tokenizeComment = function tokenizeComment(input, current) {
    var _char5 = input[current];
    var consumedChars = 0;

    if (input[current + 1] === '/') {
      var value = '';
      var count = current;

      do {
        value += _char5;
        consumedChars++;
        count++;
        _char5 = input[count];
      } while (_char5 && _char5 !== '\n');

      var token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  };

  _proto.tokenize = function tokenize(input) {
    this.row = 0;
    this.col = 0;
    var current = 0;
    var tokens = [];

    while (current < input.length) {
      var _char6 = input[current];
      var consumedChars = 0,
          token = null;
      var tokenized = false;

      switch (_char6) {
        case "{":
          {
            tokens.push(new Token(LPAREN, _char6, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case "}":
          {
            tokens.push(new Token(RPAREN, _char6, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case "=":
          {
            // case ":": {
            tokens.push(new Token(EQ, _char6, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case ":":
          {
            tokens.push(new Token(COLON, _char6, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case "\n":
          {
            tokens.push(new Token(LINE, _char6, this.row, this.col));
            current++;
            this.col = 0;
            this.row++;
            break;
          }

        default:
          if (RegExp(/[0-9]/).test(_char6)) {
            //Number: tokenize number
            var _this$tokenizeNumber = this.tokenizeNumber(input, current),
                chars = _this$tokenizeNumber[0],
                tk = _this$tokenizeNumber[1];

            consumedChars = chars;
            token = tk;
          } else if (RegExp(/\s/).test(_char6)) {
            var _this$skipWhiteSpace = this.skipWhiteSpace(input, current),
                _chars = _this$skipWhiteSpace[0],
                _tk = _this$skipWhiteSpace[1];

            consumedChars = _chars;
            token = _tk;
          } else if ("/" === _char6) {
            var _this$tokenizeComment = this.tokenizeComment(input, current),
                _chars2 = _this$tokenizeComment[0],
                _tk2 = _this$tokenizeComment[1];

            consumedChars = _chars2;
            token = _tk2;
          } else if (RegExp(/[a-zA-Z]/).test(_char6)) {
            var pattern = /[a-zA-Z]/;

            var _this$tokenizeWord = this.tokenizeWord(input, current, pattern),
                _chars3 = _this$tokenizeWord[0],
                _tk3 = _this$tokenizeWord[1];

            consumedChars = _chars3;
            token = _tk3;
          } else {
            tokenized = false;
          }

          if (consumedChars !== 0) {
            tokenized = true;
            current += consumedChars;
            this.col += consumedChars;
            tokens.push(token);
          }

          if (!tokenized) {
            var err = new Token(ERROR, input[current], this.row, this.col); //{type:'ERROR', value:input[current], row:this.row-1,col:this.col, pos:current};

            tokens.push(err);
            current++; //if (production) throw new TypeError('Invalid input: '+input[current-1]);
          }

      }
    }

    tokens.push(new Token(EOF, '', this.row, -1)); //{type:'EOF', value:''});

    return tokens;
  };

  _createClass(Tokenizer, [{
    key: "Data",
    get: function get() {
      return this.data;
    }
  }, {
    key: "Error",
    get: function get() {
      return this.errors;
    }
  }]);

  return Tokenizer;
}();

var editText = "\n    full name: Anthony Abah\n    street address: 23 Oshipitan Storage Event\n    phone: 0989765655456\n    phone: 89646464644646\n    work email abah.a@nafdac.gov.ng:\n    your message: Please come to {0} Adeleye Street, 1} Ladilak\n  ";

function ResourceParser(lang, languageModule) {
  var errors = [];
  var data = {}; // const row = 0;

  function error(data, flag) {
    if (flag === void 0) {
      flag = "error";
    }

    var e = {
      type: flag,
      // "error"|"warning"|"info"
      row: data.row,
      // row index
      column: data.col,
      // character index on line
      text: data.msg,
      // Error message
      raw: data.raw // "Missing semicolon"

    };
    errors.push(e);
    throw new Error(e.text + " " + e.raw);
  }

  function transform(tokens) {
    var transformed = [];

    for (var i = 0; i < tokens.length; i++) {
      var _token = tokens[i];
      if (_token.type === "EOF") break;
      var phrase = [];

      if (_token.type === ATTR) {
        var _row = _token.row;
        var col = _token.column;

        do {
          phrase.push(_token.value);
          i++;
          _token = tokens[i];

          if (_token.type === REM) {
            i++;
            _token = tokens[i];
            continue;
          }
        } while (_token && (_token.type === ATTR || _token.type == NUM || _token.type === SPACE));

        i--;

        if (phrase.length > 0) {
          if (phrase[phrase.length - 1] === " ") {
            phrase.pop();
            i--;
          }

          var attr = phrase.join(" ");
          transformed.push({
            type: ATTR,
            value: attr,
            row: _row,
            column: col
          });
        }
      } else {
        transformed.push(_token);
      }
    }

    return transformed;
  }

  function eatLeft(tokens, index) {
    var token = tokens[index];

    if (token.type === LPAREN) {
      index++;
      return index;
    }

    return index;
  }

  function eatRight(tokens, index) {
    var token = tokens[index];

    if (token && token.type === RPAREN) {
      index++;
      return index;
    }

    if (!token) {
      token = tokens[index - 1];
    }

    var msg = "Expected '}' at row: " + token.row + " col:" + token.column + " but found '" + tokens.map(function (t) {
      return t.value;
    }).join("") + "'";
    error({
      row: row,
      col: token.column,
      msg: msg,
      raw: tokens.map(function (t) {
        return t.value;
      }).join(""),
      params: []
    });
    return index;
  }

  function eatNumber(tokens, index) {
    var token = tokens[index];

    if (token && token.type === SPACE) {
      index++;
      token = tokens[index];
    }

    if (token && token.value.toString().match(/[0-9]/)) {
      do {
        index++;
        token = tokens[index];
      } while (token && token.value.toString().match(/[0-9]/));

      if (token && token.type === SPACE) {
        index++;
        token = tokens[index];
      }

      return index;
    }

    var msg = "Integer expected at row: " + token.row + " col: " + token.column + " but found '" + token.value + "'";
    " in" + tokens.map(function (t) {
      return t.value;
    }).join(""); // error(msg, token);

    error({
      row: row,
      col: token.column,
      msg: msg,
      raw: tokens.map(function (t) {
        return t.value;
      }).join(""),
      params: []
    });
    return index;
  }

  function checkParam(line) {

    for (var i = 0; i < line.length; i++) {
      var _token2 = line[i]; // console.log({token})

      if (_token2.type === LPAREN) {
        i = eatLeft(line, i);
        i = eatNumber(line, i);
        i = eatRight(line, i);
      } else if (_token2.type === RPAREN) {
        // No opening parenthesis
        var msg = "'}' at " + _token2.row + " col: " + _token2.column + " has no matching opening parenthesis "; // error(msg, token);

        error({
          row: row,
          col: _token2.column,
          msg: msg,
          raw: line.map(function (v) {
            return v.value;
          }).join(""),
          params: []
        });
      }
    }
  }

  function tokenize(text) {
    var tokenizer = new Tokenizer();
    var raw = tokenizer.tokenize(text);
    var tokens = transform(raw);
    return tokens;
  }

  function parseLine(line, formattedLine, row) {
    var tokens = tokenize(line);
    var assign = tokens.find(function (t) {
      return t.type === COLON || t.type === EQ;
    }); // console.log(assign.column, formattedLine.length);

    if (!assign) {
      error({
        row: row,
        col: tokens[0].column,
        msg: formattedLine + " is not assigned",
        raw: formattedLine,
        params: []
      });
    } else if (assign.column === 0) {
      error({
        row: row,
        col: assign.column,
        msg: "No data key at row " + row,
        raw: formattedLine,
        params: []
      });
    } else if (assign.column >= formattedLine.length - 1) {
      error({
        row: row,
        col: assign.column,
        msg: "No data value at row " + row,
        raw: formattedLine,
        params: []
      });
    } // let assignIndex = tokens.indexOf(":");
    // if (assignIndex < 0) assignIndex = tokens.indexOf("=");
    // let lineParts = line.split(":");


    var leftTokens = tokens.filter(function (t) {
      return t.column <= assign.column;
    }); // substring(0, assignIndex); // lineParts[0];

    checkParam(leftTokens);
    var rightTokens = tokens.filter(function (t) {
      return t.column >= assign.column;
    });
    checkParam(rightTokens);
    var key = leftTokens.map(function (token) {
      return token.value;
    }).join("");

    if (data[key]) {
      error({
        row: row,
        col: token.column,
        msg: "Cannot add data key '" + key + "' because it already exists",
        raw: formattedLine,
        params: [key]
      });
    }

    var value = rightTokens.map(function (token) {
      return token.value;
    }).join("");
    data[key] = value.trim();
  }

  function parse(text) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        data = {};
        errors = [];
        var lines = text.split("\n");
        if (lines.length === 0) return;

        for (var _row2 = 0; _row2 < lines.length; _row2++) {
          var line = lines[_row2];
          var formattedLine = line.trim();
          if (formattedLine.length === 0) continue;
          if (formattedLine.indexOf("//") === 0) continue;

          try {
            parseLine(line, formattedLine, _row2);
          } catch (e) {
            console.log(e.message);
          }
        }

        resolve(errors);
      }, 0);
    });
  }

  function compile(text) {
    var _this = this;

    return new Promise(function (resolve) {
      setTimeout(function () {
        try {
          return Promise.resolve(_this.parse(text)).then(function () {
            // this.emit("data", { errors: errors, data: this.data });
            // data.languageModule = languageModule;
            resolve(data);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }, 0);
    });
  }

  return {
    data: data,
    errors: errors,
    parse: parse,
    compile: compile,
    test: function test() {
      this.compile(editText).then(function (data) {
        console.log({
          data: data,
          errors: errors
        });
      });
    }
  };
} // ResourceParser("en", []).test();

var Prompt = function Prompt(name) {
  // this.code = 200
  this.Line = null;
  this.Index = 0;
  this.Label = 'Prompt';
  this.Fired = false;
  this.Name = name;
  this.Question = null;
  this.CFMode = false;
  this.Type = Constants.NUMBER;
  this.Menu = [];
  this.Min = null; // = (Number.MIN_VALUE);

  this.Max = null; // = (Number.MAX_VALUE);
};

var Attribute = function Attribute(name) {
  this.Name = name;
  this.Line = 0;
  this.CF = 100;
  this.Value = null;
};

var Inference = /*#__PURE__*/function (_Attribute) {
  _inheritsLoose(Inference, _Attribute);

  function Inference(name) {
    var _this;

    _this = _Attribute.call(this, name) || this;
    _this.Action = null;
    return _this;
  }

  return Inference;
}(Attribute);

var Goal = /*#__PURE__*/function (_Attribute) {
  _inheritsLoose(Goal, _Attribute);

  function Goal(name) {
    return _Attribute.call(this, name) || this;
  }

  return Goal;
}(Attribute);

var Condition = /*#__PURE__*/function () {
  function Condition() {
    this.Inferences = [];
    this.Confidences = [];
    this.Premises = [];
    this.isMet = false;
  }

  Condition.getCF = function getCF(condition) {
    var cf = 100;
    condition.confidences.forEach(function (v) {
      cf = v / 100 * cf;
    });
    return cf;
  };

  return Condition;
}();

var Statement = function Statement(lineIndex) {
  this.line = lineIndex || 0;
  this.Index = 0;
  this.Keyword = null;
  this.Left = null;
  this.Right = null;
  this.Comparator = null;
};

var characters = ['@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

var Menu = function Menu(index, name, value) {
  this.Index = index;
  this.Name = name;
  this.Value = value;
  this.Letter = characters[index]; // this.Text=displayText||value;

  this.Line = 0;
};

var Rule = /*#__PURE__*/function () {
  function Rule(name) {
    this.Name = name;
    this.Fired = false;
    this.Texts = [];
    this.Line = 0;
    this.Index = 0;
    this.AltInferences = [];
    this.Conditions = [];
  }

  var _proto = Rule.prototype;

  _proto.addLine = function addLine(line) {
    this.Texts.push(line);
  };

  return Rule;
}();

var KnowledgebaseCompiler = /*#__PURE__*/function (_Parser) {
  _inheritsLoose(KnowledgebaseCompiler, _Parser);

  /**
   * Constructor
   * @param {String} language User language [en, fr, es, nl, de, po, ru]
   */
  function KnowledgebaseCompiler(language, languageModule) {
    var _this;

    _this = _Parser.call(this, language, languageModule) || this;
    _this.language = language;
    _this.languageModule = languageModule;
    _this.keywords = _this.languageModule.keywords;
    _this.title = "";
    _this.summary = "";
    _this.delimiter = " ";
    _this.activePrompt = null;
    _this.arrays = {};
    _this.objects = {};
    _this.goals = {};
    _this.prompts = {};
    _this.attributes = {};
    _this.firedRules = {};
    _this.answers = [];
    _this.rules = [];
    _this.subscriptions = [];

    _this.attachListeners();

    return _this;
  }

  var _proto = KnowledgebaseCompiler.prototype;

  _proto.subscribe = function subscribe(topic, listener) {
    this.subscriptions.push(EventEmmiter.subscribe(topic, listener));
  };

  _proto.unsubscribe = function unsubscribe() {
    this.subscriptions.forEach(function (subscription) {
      return subscription.remove();
    });
  };

  _proto.attachListeners = function attachListeners() {
    var _this2 = this;

    this.subscribe("rule", function (data) {
      return _this2.addRule(data[0], data[1]);
    });
    this.subscribe("inference", function (data) {
      var name = data[0],
          right = data[1],
          alt = data[2],
          row = data[3];

      _this2.addInference(name.value, right, alt, row);
    });
    this.subscribe("premise", function (data) {
      var keyword = data[0],
          left = data[1],
          right = data[2],
          row = data[3],
          op = data[4];
      return _this2.addPremise(keyword, left, right, op, row);
    });
    this.subscribe("condition", function (data) {
      var keyword = data[0],
          left = data[1],
          right = data[2],
          row = data[3],
          op = data[4];
      return _this2.addCondition(keyword, left, right, op, row // data[0], data[1][0], data[1][1], data[1][2], data[2],
      );
    });
    this.subscribe("prompt", function (data) {
      return _this2.addPrompt(data[0], data[1]);
    });
    this.subscribe("question", function (data) {
      return _this2.addQuestion(data[0], data[1]);
    });
    this.subscribe("menu", function (data) {
      return _this2.addMenu(data[0], data[1]);
    });
    this.subscribe("digit", function (data) {
      return _this2.addNumber(data[0]);
    });
    this.subscribe("text", function (data) {
      return _this2.addText(data[0]);
    });
    this.subscribe("yes-no", function (data) {
      return _this2.addYesNo(data[0]);
    });
    this.subscribe("true-false", function (data) {
      return _this2.addTrueFalse(data[0]);
    });
    this.subscribe("min", function (data) {
      return _this2.setMin(data[0], data[1]);
    });
    this.subscribe("max", function (data) {
      return _this2.setMax(data[0], data[1]);
    });
    this.subscribe("cf", function () {
      return _this2.setPromptCFMode();
    });
    this.subscribe("attribute", function (data) {
      return _this2.setAttribute(data[0][0], data[0][1], data[1]);
    });
    this.subscribe("goal", function (data) {
      return _this2.addGoal(data[0], data[1]);
    });
    this.subscribe("title", function (data) {
      return _this2.setTitle(data[0], data[1]);
    });
    this.subscribe("summary", function (data) {
      return _this2.setSummary(data[0], data[1]);
    });
    this.subscribe("line", function () {
      return _this2.addNewLine();
    });
    this.subscribe("done", function (data) {
      _this2.unsubscribe();
    }); // event.on('eof',this.eof);
    // event.on('syntax-error',this.addText);
    // event.on('char-error',this.addText);
    // event.on('error',this.addText);
    // event.on('warning',this.addText);
    // event.on('info',this.addText);
  };

  _proto.setTitle = function setTitle(text) {
    this.title = text;
  };

  _proto.setSummary = function setSummary(text) {
    this.summary = text;
  } // Public Methods
  ;

  _proto.setMin = function setMin(value) {
    if (this.ActivePrompt.Type === YN || this.ActivePrompt.Type === TF) {
      value = 1;
    }

    this.prompts[this.ActivePrompt.Name].Min = this.ActivePrompt.Min = value.value || value;
  };

  _proto.setMax = function setMax(value) {
    if (this.ActivePrompt.Type === YN || this.ActivePrompt.Type === TF) {
      value = 1;
    }

    this.prompts[this.ActivePrompt.Name].Max = this.ActivePrompt.Max = value.value || value;
  };

  _proto.setPromptType = function setPromptType(type) {
    this.ActivePrompt.Type = type;
  };

  _proto.addText = function addText() {
    this.setPromptType(TEXT);
  };

  _proto.addNumber = function addNumber() {
    this.setPromptType(NUMBER);
  };

  _proto.addMenu = function addMenu(values) {
    var _this3 = this;

    // let menus = values;
    this.ActivePrompt.Menu = [];
    var index = 1;
    values.forEach(function (value) {
      var M = new Menu(index, // index
      value, // name
      value // value
      );

      _this3.ActivePrompt.Menu.push(M);

      index++;
    });
    this.setPromptType(MENU);
  };

  _proto.addTrueFalse = function addTrueFalse() {
    var _this4 = this;

    // let menus = values;
    this.ActivePrompt.Menu = [];
    var index = 0;
    var values = [true, false];
    values.forEach(function (value) {
      var M = new Menu(index, // index
      value, // name
      value // value
      // value   //display text
      );

      _this4.ActivePrompt.Menu.push(M);

      index++;
    });
    this.ActivePrompt.Type = TF;
    this.setMin(1);
    this.setMax(1);
  };

  _proto.addYesNo = function addYesNo() {
    var _this5 = this;

    // let menus = values;
    this.ActivePrompt.Menu = [];
    var index = 0;
    var values = [this.keywords[YES], this.keywords[NO]];
    values.forEach(function (value) {
      var M = new Menu(index, // index
      value, // name
      value // value
      // value   //display text
      );

      _this5.ActivePrompt.Menu.push(M);

      index++;
    });
    this.ActivePrompt.Type = YN;
    this.setMin(1);
    this.setMax(1);
  };

  _proto.addQuestion = function addQuestion(text) {
    this.ActivePrompt.Question = text;
  };

  _proto.addPrompt = function addPrompt(name, line) {
    var prompt = new Prompt(name.toLowerCase());
    prompt.Line = line;
    this.prompts[prompt.Name] = this.activePrompt = prompt; // this.addAttribute( p.Name);
  };

  _proto.setAttribute = function setAttribute(name, value, line) {
    var a = this.addAttribute(name.toLowerCase(), line);
    a.Value = value;
  };

  _proto.addAttribute = function addAttribute(name, line) {
    // if ( !name ) return null
    var a = this.attributes[name.toLowerCase()];

    if (a) {
      return a;
    }

    this.attributes[name.toLowerCase()] = a = new Attribute(name.toLowerCase());
    a.Line = line; // this.attributes[a.Name] = a

    return a;
  };

  _proto.addInference = function addInference(name, value, alternative, line) {
    var inf = new Inference(name);
    inf.Value = value; // ( value && value.value ) ? value : [{ type: 'TRUE', value: true }]

    inf.Line = line;

    if (alternative) {
      // this.R.AltInferences.push(inf)
      this.ActiveRule.AltInferences.push(inf);
    } else {
      this.ActiveCondition.Inferences.push(inf); // this.condition.Inferences.push( inf )
    }

    this.addAttribute(name, inf.Line);
  };

  _proto.addPremise = function addPremise(keyword, left, right, op, line) {
    var _this6 = this;

    var E = new Statement(line);
    E.Left = left;
    E.Right = right;
    E.Comparator = op;
    E.Keyword = keyword;
    E.Line = line; // this.condition.Premises.push(s)

    this.ActiveCondition.Premises.push(E);
    left.forEach(function (token) {
      if (token && token.type === ATTR) {
        _this6.addAttribute(token.value, line);
      }
    });
    right.forEach(function (token) {
      if (token && token.type === ATTR) {
        _this6.addAttribute(token.value, line);
      }
    });
  };

  _proto.addCondition = function addCondition(keyword, left, right, op, line) {
    var condition = new Condition(); // this.condition = c
    //this.R.Conditions.push(c)

    this.ActiveRule.Conditions.push(condition);
    this.addPremise(keyword, left, right, op, line);
  };

  _proto.addRule = function addRule(name, line) {
    var R = new Rule(name);
    R.Line = line;
    this.rules.push(R);
  };

  _proto.addGoal = function addGoal(name, line) {
    var G = new Goal(name.toLowerCase());
    G.Line = line;
    this.goals[G.Name] = G;
  };

  _proto.setPromptCFMode = function setPromptCFMode() {
    this.ActivePrompt.CFMode = true;
  };

  _proto.addObject = function addObject(name, value) {
    this.objects[name.toLowerCase()] = value;
  };

  _proto.addArray = function addArray(name, value) {
    this.arrays[name.tolowerCase()] = value;
  };

  _proto.setGoalCF = function setGoalCF(name, value) {
    this.goals[name.toLowerCase()].CF = value;
  };

  _proto.addNewLine = function addNewLine() {// do nothing
  }
  /**
   *
   * @param { String } text Pruduction rules in plain text
   * @returns { Promise<Object> } Knowledgebase Data
   */
  ;

  _proto.compile = function compile(text) {
    var _this7 = this;

    return new Promise(function (resolve, reject) {
      try {
        // let knowledgebase = new Knowledgebase(this);
        return Promise.resolve(_this7.parse(text)).then(function (errors) {
          EventEmmiter.publish("done-compile-knowledgebase-data", {
            errors: _this7.errors,
            data: _this7.Data
          });
          resolve({
            errors: errors,
            data: _this7.Data
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  _createClass(KnowledgebaseCompiler, [{
    key: "Data",
    get: function get() {
      return {
        language: this.language,
        // keywords: this.keywords,
        languageModule: this.languageModule,
        line: 0,
        promptIndex: 1,
        ruleIndex: 0,
        title: this.title,
        summary: this.summary,
        delimiter: this.delimiter,
        arrays: this.arrays,
        objects: this.objects,
        goals: this.goals,
        prompts: this.prompts,
        attributes: this.attributes,
        firedRules: this.firedRules,
        answers: this.answers,
        rules: this.rules
      };
    }
  }, {
    key: "Keywords",
    get: function get() {
      return this.keywords;
    }
  }, {
    key: "Rules",
    get: function get() {
      return this.rules;
    }
    /* get Delimeters () {
      return /Math\.[a-z]+|Math\.(E|PI)/
    }*/

  }, {
    key: "ActiveRule",
    get: function get() {
      return this.rules[this.rules.length - 1];
    }
  }, {
    key: "ActiveCondition",
    get: function get() {
      var R = this.ActiveRule;
      var condition = R.Conditions[R.Conditions.length - 1];
      return condition;
    }
  }, {
    key: "ActivePrompt",
    get: function get() {
      return this.activePrompt;
    },
    set: function set(p) {
      this.activePrompt = p;
    }
  }]);

  return KnowledgebaseCompiler;
}(Parser);

var defaults = {
  lang: "en",
  mode: "ace/mode/kbf"
};

var ParserFactory = /*#__PURE__*/function () {
  function ParserFactory() {}

  ParserFactory.createParser = function createParser(language, languageModule, mode) {
    if (mode === void 0) {
      mode = defaults.mode;
    }

    // const ext = mode && mode.substring(mode.indexOf(".") + 1);
    switch (mode) {
      case "ace/mode/res":
        return new ResourceParser(language, languageModule);

      case "ace/mode/kbf":
        return new Parser(language, languageModule);

      default:
        throw new Error("No parser for current mode: " + mode);
    }
  };

  ParserFactory.createCompiler = function createCompiler(language, languageModule, mode) {
    if (mode === void 0) {
      mode = defaults.mode;
    }

    switch (mode) {
      case "ace/mode/res":
        return new ResourceParser(language, languageModule);
      // throw new Error("Compiler for this Mode is not yet supported");

      case "ace/mode/kbf":
        return new KnowledgebaseCompiler(language, languageModule);

      default:
        throw new Error("No compiler for current mode: " + mode);
    }
  };

  return ParserFactory;
}();

function process(response) {
  if (response) return response;

  if (response.Label === "Prompt" || response.Label === "CF") {
    //Prompting for input
    return {
      type: "prompt",
      data: response
    };
  } else if (response instanceof Array) {
    //answers are ready
    return {
      type: "answers",
      data: response
    };
  } else {
    return response;
  }
}

function raiseValidationError(code, translator, systemLanguage) {
  var err = CustomErrors(translator, systemLanguage).ValidationError(code);
  return err;
}

var Rules = /*#__PURE__*/function () {
  function Rules(systemLanguage, mode) {
    this.systemLanguage = systemLanguage;
    this.languageModule = languageModules[systemLanguage];
    this.compiler = ParserFactory.createCompiler(systemLanguage, this.languageModule, mode);
    this.parser = ParserFactory.createParser(systemLanguage, this.languageModule, mode);
    this.translator = new Translator(systemLanguage, this.languageModule); //  = new InputValidator(systemLanguage, this.translator);
  }

  Rules.registerLanguage = function registerLanguage(lang, data) {
    if (!arguments) {
      throw new Error("Language name required");
    }

    if (typeof lang !== "string") {
      throw new Error("Expected language code as first argument");
    }

    if (typeof data !== "object") {
      throw new Error("Expected language data as second argument");
    }

    var language = lang.toLocaleLowerCase();

    if (arguments.length < 2) {
      throw new Error("Two arguments expected: Language name and data are required");
    }

    if (!data) {
      throw new Error("Language data required");
    }

    if (typeof language !== "string") {
      throw new Error("Language name should be a String");
    }

    if (language.length > 2) {
      throw new Error("Language code should contain only two characters");
    }

    if (!language.match(/[a-z][a-z]/)) {
      throw new Error("Unknown character in language code");
    }

    if (languageModules[language]) {
      throw new Error(language + " Language already installed");
    }

    languageModules[language] = data;
  };

  Rules.init = function init(installLanguageModules) {
    try {
      installLanguageModules && installLanguageModules.forEach(function (l) {
        var data = installedLanguagePlugins[l];

        if (data) {
          Rules.registerLanguage(l, data);
          console.log("Enabled language: " + l);
        } else {
          throw new Error("Locale not installed: " + l);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  var _proto = Rules.prototype;

  _proto.getKeywords = function getKeywords() {
    return this.languageModule.keywords;
  };

  _proto.parse = function parse(codes) {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.parser.parse(codes));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.compile = function compile(codes) {
    try {
      var _this4 = this;

      return Promise.resolve(_this4.compiler.compile(codes)).then(function (_ref) {
        var errors = _ref.errors,
            data = _ref.data;
        return {
          errors: errors,
          data: data
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.run = function run(freshData) {
    if (!freshData) {
      return raiseValidationError(ErrorKeys.KnowledgebaseNotFound, this.translator, this.systemLanguage);
    }

    var response = new Engine(freshData, this.translator).run();
    return process(response);
  };

  _proto.reply = function reply(modifiedData, input) {
    if (!modifiedData) {
      return raiseValidationError(ErrorKeys.KnowledgebaseNotFound, this.translator, this.systemLanguage);
    }

    if (!input || input.toString().trim().length === 0) {
      return raiseValidationError(ErrorKeys.NoInput, this.translator, this.systemLanguage);
    }

    var response = new Engine(modifiedData, this.translator, validator).input(input);
    return process(response);
  };

  _proto.validate = function validate(input, prompt) {
    return validator$1.validate(input, prompt);
  };

  _proto.choice = function choice(input, prompt) {
    return multipleChoice(input, prompt);
  };

  _proto.translate = function translate(code, to) {
    return this.translator.translate(code, to);
  };

  _proto.translatePlain = function translatePlain(text, to, from) {
    return this.translator.translatePlain(text, to, from);
  };

  return Rules;
}();

function attachCSS(css, id, name, toggle) {
  if (toggle === void 0) {
    toggle = false;
  }

  if (id) {
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].id === id) {
        if (!toggle) {
          return null;
        }
      }
    }
  }

  if (toggle) {
    if (document.getElementById(id)) {
      document.head.removeChild(document.getElementById(id));
      return;
    }
  }

  var head = document.head;
  var link = document.createElement("style");
  link.setAttribute('id', id || Math.random().slice(2).toString(36));
  link.setAttribute('name', name || 'css');
  link.type = "text/css";
  link.rel = "stylesheet";
  link.innerHTML = css;
  head.appendChild(link);
  return id;
}
// var sheet = DynamicStyleSheet()
// sheet.insertRule("header { float: left; opacity: 0.8; }", 1);
// Replacing default console.log with syntax highlighting substitute 
// const probe = require('console-probe')
// let data = {count:100000}
// const prober = probe.get()
// console.log = prober
// prober(data)
// collaboration
// <script src="https://togetherjs.com/togetherjs-min.js"></script>
// <button onclick="TogetherJS(this); return false;">Start TogetherJS</button>

var Clipboard = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {String} selector The query selector for element(s) to attach event: 
   * should be in format #xxx or .xxx
   */
  function Clipboard(selector) {
    var styles = "\n      " + selector + ":before {\n        content: '';\n        display: none;\n        position: absolute;\n        z-index: 9998;\n        top: 35px;\n        left: 15px;\n        width: 0;\n        height: 0;\n        border-left: 5px solid transparent;\n        border-right: 5px solid transparent;\n        border-bottom: 5px solid rgba(0, 0, 0, .72);\n      }\n      " + selector + ":after {\n        content: 'Copy to Clipboard';\n        display: none;\n        position: absolute;\n        z-index: 9999;\n        top: 40px;\n        right: 1px;\n        width: 114px;\n        height: 36px;\n        color: #fff;\n        font-size: 10px;\n        line-height: 36px;\n        text-align: center;\n        background: #111;\n        background: rgba(0, 0, 0, .72);\n        border-radius: 3px;\n      }\n      " + selector + ":hover:before, \n      " + selector + ":hover:after {\n        display: block;\n      }\n      " + selector + ":active, \n      " + selector + ":focus {\n          outline: none;\n      }\n      " + selector + ":active:after, \n      " + selector + ":focus:after {\n          content: 'Copied!';\n      }";
    attachCSS(styles, 'clipboard_css', 'clipboard-css');
  }

  var _proto = Clipboard.prototype;

  _proto.copyToClipboard = function copyToClipboard(str) {
    var el = document.createElement('textarea'); // Create a <textarea> element

    el.value = str; // Set its value to the string that you want copied

    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof

    el.style.position = 'absolute';
    el.style.left = '-9999px'; // Move outside the screen to make it invisible

    document.body.appendChild(el); // Append the <textarea> element to the HTML document

    var selected = document.getSelection().rangeCount > 0 // Check if there is any content selected previously
    ? document.getSelection().getRangeAt(0) // Store selection if found
    : false; // Mark as false to know no selection existed before

    el.select(); // Select the <textarea> content

    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)

    document.body.removeChild(el); // Remove the <textarea> element

    if (selected) {
      // If a selection existed before copying
      document.getSelection().removeAllRanges(); // Unselect everything on the HTML document

      document.getSelection().addRange(selected); // Restore the original selection
    }
  };

  return Clipboard;
}();

var PrintButton = /*#__PURE__*/function () {
  function PrintButton(color, source, options) {
    var _this = this;

    this.color = color;
    this.source = source;
    this.winOptions = 'resizable=yes,scrollbars=yes,left=0,top=0,width=960,height=450';
    this.openSvg = "\n    <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 18 18\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->\n        <title>open in new window</title>\n        <desc>Created with Sketch.</desc>\n        <g id=\"Icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <g id=\"Two-Tone\" transform=\"translate(-647.000000, -333.000000)\">\n                <g id=\"Action\" transform=\"translate(100.000000, 100.000000)\">\n                    <g id=\"Two-Tone-/-Action-/-open_in_new\" transform=\"translate(544.000000, 230.000000)\">\n                        <g>\n                            <polygon id=\"Path\" points=\"0 0 24 0 24 24 0 24\"></polygon>\n                            <path d=\"M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z\" id=\"\uD83D\uDD39-Primary-Color\" fill=\"" + this.color + "\"></path>\n                        </g>\n                    </g>\n                </g>\n            </g>\n        </g>\n    </svg>";
    this.printSvg = "\n    <?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n      width=\"16px\" height=\"16px\" viewBox=\"0 0 212.795 220.59\" enable-background=\"new 0 0 212.795 220.59\"\n        xml:space=\"preserve\">\n        <title>Print out</title>\n    <path fill=\"" + this.color + "\" d=\"M189.209,175.581h-27.186c-1.104,0-2-0.896-2-2v-29.808H55.505v29.808c0,1.104-0.895,2-2,2H26.094\n      c-5.101,0-9.25-4.148-9.25-9.249v-67.82c0-5.101,4.149-9.25,9.25-9.25h163.116c5.101,0,9.25,4.149,9.25,9.25v67.82\n      C198.459,171.432,194.311,175.581,189.209,175.581 M164.023,171.581h25.186c2.895,0,5.25-2.354,5.25-5.249v-67.82\n      c0-2.895-2.355-5.25-5.25-5.25H26.094c-2.895,0-5.25,2.355-5.25,5.25v67.82c0,2.896,2.355,5.249,5.25,5.249h25.412v-29.808\n      c0-1.104,0.896-2,2-2h108.518c1.104,0,2,0.896,2,2V171.581z\"/>\n    <path fill=\"" + this.color + "\" d=\"M53.279,93.261H34.702c-1.104,0-2-0.896-2-2V73.427c0-3.602,2.93-6.531,6.531-6.531h14.046\n      c1.105,0,2,0.896,2,2v22.365C55.279,92.366,54.384,93.261,53.279,93.261 M36.702,89.261h14.577V70.896H39.233\n      c-1.396,0-2.531,1.137-2.531,2.531V89.261z\"/>\n    <path fill=\"" + this.color + "\" d=\"M180.601,93.261h-18.577c-1.104,0-2-0.896-2-2V68.896c0-1.104,0.896-2,2-2h14.046\n      c3.601,0,6.531,2.93,6.531,6.531v17.834C182.601,92.366,181.706,93.261,180.601,93.261 M164.023,89.261h14.577V73.427\n      c0-1.395-1.135-2.531-2.531-2.531h-12.046V89.261z\"/>\n    <path fill=\"" + this.color + "\" d=\"M162.023,93.261H53.279c-1.104,0-2-0.896-2-2V8.951c0-1.104,0.896-2,2-2h88.581\n      c0.579,0,1.129,0.251,1.509,0.688l20.163,23.172c0.317,0.363,0.491,0.83,0.491,1.313v59.139\n      C164.023,92.366,163.128,93.261,162.023,93.261 M55.279,89.261h104.744V32.871l-19.074-21.92h-85.67V89.261z\"/>\n    <path fill=\"" + this.color + "\" d=\"M171.085,143.773H44.217c-1.105,0-2-0.896-2-2c0-1.104,0.895-2,2-2h126.868c1.104,0,2,0.896,2,2\n      C173.085,142.877,172.189,143.773,171.085,143.773\"/>\n    <path fill=\"" + this.color + "\" d=\"M162.023,214.757H53.506c-1.105,0-2-0.896-2-2v-70.984c0-1.104,0.895-2,2-2h108.517c1.105,0,2,0.896,2,2\n      v70.984C164.023,213.861,163.128,214.757,162.023,214.757 M55.506,210.757h104.518v-66.983H55.506V210.757z\"/>\n    <path fill=\"" + this.color + "\" d=\"M143.673,175.581H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2\n      C145.673,174.685,144.777,175.581,143.673,175.581\"/>\n    <path fill=\"" + this.color + "\" d=\"M143.673,157.457H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2\n      C145.673,156.561,144.777,157.457,143.673,157.457\"/>\n    <path fill=\"" + this.color + "\" d=\"M143.673,193.705H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2\n      C145.673,192.809,144.777,193.705,143.673,193.705\"/>\n    <path fill=\"" + this.color + "\" d=\"M47.955,115.681h-7.929c-4.038,0-7.324-3.285-7.324-7.324s3.286-7.324,7.324-7.324h7.929\n      c4.039,0,7.324,3.285,7.324,7.324S51.994,115.681,47.955,115.681 M40.026,105.033c-1.833,0-3.324,1.491-3.324,3.324\n      s1.491,3.324,3.324,3.324h7.929c1.833,0,3.324-1.491,3.324-3.324s-1.491-3.324-3.324-3.324H40.026z\"/>\n    <path fill=\"" + this.color + "\" d=\"M68.571,115.681c-4.038,0-7.324-3.285-7.324-7.324s3.286-7.324,7.324-7.324c4.039,0,7.324,3.285,7.324,7.324\n      S72.61,115.681,68.571,115.681 M68.571,105.033c-1.833,0-3.324,1.491-3.324,3.324s1.491,3.324,3.324,3.324s3.324-1.491,3.324-3.324\n      S70.404,105.033,68.571,105.033\"/>\n    </svg>";
    this.copySvg = "\n    <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?> \n    <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 3C6 1.34315 7.34315 0 9 0H14C14.2652 0 14.5196 0.105357 14.7071 0.292893L21.7071 7.29289C21.8946 7.48043 22 7.73478 22 8V17C22 18.6569 20.6569 20 19 20H18V21C18 22.6569 16.6569 24 15 24H5C3.34315 24 2 22.6569 2 21V7C2 5.34315 3.34315 4 5 4H6V3ZM6 6H5C4.44772 6 4 6.44772 4 7V21C4 21.5523 4.44772 22 5 22H15C15.5523 22 16 21.5523 16 21V20H9C7.34315 20 6 18.6569 6 17V6ZM9 2C8.44772 2 8 2.44772 8 3V17C8 17.5523 8.44771 18 9 18H19C19.5523 18 20 17.5523 20 17V9H16C14.3431 9 13 7.65685 13 6V2H9ZM15 3.41421L18.5858 7H16C15.4477 7 15 6.55228 15 6V3.41421Z\" fill=\"" + color + "\"/>\n    </svg>";
    this.OpenButton = this.createButton(color, this.openSvg, options);
    this.OpenButton.addEventListener('click', function () {
      _this.openInWindow();
    });
    this.PrintButton = this.createButton(color, this.printSvg, options);
    this.PrintButton.addEventListener('click', function () {
      _this.printToPrinter();
    });
    this.ClipboardButton = this.createButton(color, this.copySvg, options);
    this.ClipboardButton.classList.add('copy-to-clipboard-button');
    this.clipboard = new Clipboard(".copy-to-clipboard-button");
    this.ClipboardButton.addEventListener('click', function () {
      _this.clipboard.copyToClipboard(_this.Text);
    });
  }

  var _proto = PrintButton.prototype;

  _proto.createButton = function createButton(color, html, options) {
    if (options === void 0) {
      options = {};
    }

    var button = document.createElement('button');
    button.style.width = options.width || '32px';
    button.style.height = options.height || '32px';
    button.style.color = color || 'white';
    button.style.padding = 2 + 'px';
    button.style.margin = 1 + 'px';
    button.style.borderRadius = 2 + 'px';
    button.style.background = options.background || 'transparent';
    button.style.border = options.border || 'none';
    button.style.cursor = 'pointer';
    button.innerHTML = html;
    return button;
  };

  _proto.openInWindow = function openInWindow() {
    try {
      var printWindow = window.open('', '', this.winOptions);
      var str = "\n        <html>\n            <head><title>Print Window</title></head>\n            <body>\n                <div  \n                    style=\"width:100%; \n                    padding:1rem 2rem; \n                    font-size:1.1rem;\n                    font-family: 'Courier New';\n                    letter-spacing: 1px;\n                \">\n                    " + this.Html + "\n                </div>\n            </body>\n        </html>";
      printWindow.document.writeln(str);
      return printWindow;
    } catch (ex) {
      //alert(ex);
      console.error('Error: ' + ex.message);
    }
  };

  _proto.printToPrinter = function printToPrinter() {
    try {
      var printWindow = this.openInWindow();
      printWindow.print();
      printWindow.close();
    } catch (ex) {
      //alert(ex);
      console.error('Error: ' + ex.message);
    }
  };

  _createClass(PrintButton, [{
    key: "Html",
    get: function get() {
      return this.source.innerHTML;
    }
  }, {
    key: "Text",
    get: function get() {
      return this.source.innerText;
    }
  }]);

  return PrintButton;
}();

var Viewer = /*#__PURE__*/function () {
  /**
   * 
   * @param {Object} view The HTML element to attach highlighter
   * @param {String} title Name of the script language: default is kbf
   */
  function Viewer(view, container, title) {
    if (!view || !view.tagName && !document.getElementById(view)) {
      console.error('Invalid Document Viewer Id', view);
      return;
    }

    if (!container || !container.tagName && !document.getElementById(container)) {
      console.error('Invalid Container Element Id', contaianer);
      return;
    }

    this.div = view.tagName ? view : document.getElementById(view);
    this.container = container.tagName ? container : document.getElementById(container);
    this.id = null;
    this.banner = null;
    this.title = title;
    this.color = view.style.color || container.style.color || 'green';
    this.printButton = new PrintButton(this.color, this.div);
    this.view();
  }

  var _proto = Viewer.prototype;

  _proto.view = function view() {
    this.text = this.div.innerHTML;
    this.id = Math.random().toString(36).slice(2); // let btn = new ToggleButton(null, 'ios')

    var banner = document.createElement('div');
    banner.setAttribute('id', "banner" + this.id);
    banner.style["float"] = 'right';
    banner.append(this.printButton.ClipboardButton);
    banner.append(this.printButton.OpenButton);
    banner.append(this.printButton.PrintButton);
    this.container.append(banner);
  };

  _proto.getContentBlock = function getContentBlock() {
    return document.querySelector('.pr-display');
  };

  _createClass(Viewer, [{
    key: "Text",
    get: function get() {
      return this.getContentBlock().innerText;
    }
  }, {
    key: "html",
    get: function get() {
      return this.getContentBlock().innerHTML;
    }
  }]);

  return Viewer;
}();

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var Ux = /*#__PURE__*/function () {
  function Ux(el, options) {
    if (options === void 0) {
      options = {};
    }

    // super();
    this.language = options.language || "en";
    if (!el) throw "Missing Element ID to attach UX";
    var node = el instanceof HTMLElement ? el : typeof el === "string" ? document.getElementById(el) : el;
    if (!node || !node instanceof HTMLElement) throw "ID not a valid Node";
    this.el = node;
    this.el.style.overflow = "hidden";
    this.text = options.text || null;
    this.data = null;
    this.widgets = [];
    this.prompt = {};
    this.error = null;
    this.display = null;
    this.buttons = null;
    this.container = null;
    this.toolbar = null;
    this.rules = Rules(this.language, ["fr", "de", "cn"], "ace/mode/res");
    this.init();
  }

  var _proto = Ux.prototype;

  _proto.run = function run(text) {
    try {
      var _this2 = this;

      return Promise.resolve(_catch(function () {
        _this2.text = text;
        return Promise.resolve(_this2.rules.compile(text)).then(function (_ref) {
          var errors = _ref.errors,
              data = _ref.data;
          _this2.data = data;
          _this2.errors = errors;

          if (errors.length && errors.length > 0) {
            return _this2.processParserErrors(errors);
          }

          _this2.start();
        });
      }, function (e) {
        console.trace(e);
        var response = {
          name: "ScriptError",
          code: "ScriptError",
          message: e
        };

        _this2.processError(response);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.start = function start() {
    var response = this.rules.run(this.data);
    this.process(response);
  };

  _proto.repeat = function repeat() {
    try {
      var _this4 = this;

      return Promise.resolve(_this4.run(_this4.text)).then(function () {}); // this.start()
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.reply = function reply(input) {
    var response = this.rules.reply(this.data, input);
    this.process(response);
  };

  _proto.send = function send() {
    if (!this.data) {
      return console.info("No language defined in kb", console.trace);
    }

    var msg = null;

    if (this.prompt.Type === "NUMBER" || this.prompt.Type === "TEXT") {
      msg = this.input.value;
    } else {
      msg = this.composeReply();
    }

    if (!msg) return;
    this.setMargin();
    this.input.value = "";
    this.reply(msg);
  };

  _proto.why = function why() {//ps.publish( 'why' )
  };

  _proto.stop = function stop() {//ps.publish( 'stop' )
  };

  _proto.explain = function explain() {//ps.publish( 'explain' )
  };

  _proto.cancel = function cancel() {
    this.display.innerHTML = "";
  };

  _proto.print = function print() {
    var html = this.display.innerHTML;
    var win = window.open("about:blank", "self", "width=600; height=450;");
    win.document.writeln(html);
    win.print();
    win.close();
  };

  _proto.copy = function copy() {};

  _proto.process = function process(response) {
    // console.log({ response })
    if (response.Label === "Prompt" || response.Label === "CF") {
      //Prompting for input
      return this.processPrompt(response);
    } else if (response instanceof Array) {
      //answers are ready
      return this.processAnswers(response);
    } else {
      // console.log(response.name)
      switch (response.name) {
        case "ValidationError":
          return this.processValidationError(response);

        case "SyntaxError":
          return this.processParserErrors(response);

        case "ScriptError":
          return this.processError(response);

        default:
          return this.processError(response);
      }
    }
  };

  _proto.attachScripts = function attachScripts(scr, id, name) {
    var head = document.body;
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.id = id || Math.random().slice(2).toString(36);
    link.name = name || "script" + link.id;
    link.append(scr);
    head.appendChild(link);
  };

  _proto.init = function init() {
    try {
      var _this6 = this;

      _this6.el.classList.add("pr-parent");

      _this6.theme = "dark";
      _this6.display = document.getElementById("console-display");
      _this6.input = document.getElementById("console-input");
      _this6.buttons = document.getElementById("console-btpanel");
      _this6.banner = document.getElementById("console-banner");
      _this6.toolbar = document.getElementById("console-toolbar");
      new Viewer(_this6.display, _this6.toolbar);

      _this6.input.focus();

      _this6.container = document.getElementById("console-container");

      _this6.attachListeners(_this6.el, _this6.toolbar, _this6.buttons);

      _this6.addListeners(); // let doc = document.createDocumentFragment()
      // let runpanel = doc.getElementById( container )
      // let input = doc.getElementById( inputId )
      // this.stylePanel( runpanel )
      // this.styleDisplay( display )
      // this.styleInput( input )
      // this.styleLinks( doc )
      // console.log( document.getElementsByClassName( 'gold' )[0].style.background='lavender' )


      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.toggleTheme = function toggleTheme() {
    this.el.classList.toggle(this.Theme);
  };

  _proto.attachListeners = function attachListeners(el, toolbar, buttons) {
    var _this7 = this;

    el.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        if (e.target.type === "radio" || e.target.type === "checkbox") {
          _this7.send();
        } else if (e.target.type === "text") {
          _this7.send();
        } else {
          e.target.click();
        }
      }

      e.preventDefault();
      e.stopPropagation();
    });
    toolbar.addEventListener("click", function (e) {
      switch (e.target.id) {
        case "pr-print":
          _this7.print();

          break;

        case "pr-copy":
          _this7.copy();

          break;
      }

      e.stopPropagation();
      e.preventDefault();
    });
    buttons.addEventListener("click", function (e) {
      switch (e.target.innerText) {
        case "✓":
          _this7.send();

          break;

        case "?":
          _this7.why();

          break;

        case "!":
          _this7.explain();

          break;

        case "×":
          _this7.cancel();

          break;

        case "‣":
          _this7.repeat();

          break;

        case "⛔":
          _this7.stop();

          break;

        default:
          //do nothing
          return;
      }

      _this7.input.focus();

      e.preventDefault();
      e.stopPropagation();
    });
  };

  _proto.addListeners = function addListeners() {
    var _this8 = this;

    this.on("error", function (e) {
      _this8.processError(e);
    });
    this.on("syntax-error", function (e) {// this.processParserErrors(e.msg )
      // this.processError( e )
      // console.log(e)
      // this.processError(e)
    });
    this.on("system-error", function (e) {
      // this.processError( e )
      _this8.processError(e); // console.log(e)

    });
    this.on("validation-error", function (e) {
      _this8.processValidationError(e);
    });
    this.on("prompt", function (e) {
      _this8.processPrompt(e);
    });
    this.on("answers", function (e) {
      _this8.display.innerHTML = "";

      _this8.processAnswers(e);
    });
    this.on("message", function (e) {
      _this8.appendToContent("<h6>" + e.msg || e + "</h6>");
    });
    this.on("done", function () {
      _this8.display.innerHTML = "";
    });
  };

  _proto.processPrompt = function processPrompt(prompt) {
    this.prompt = prompt;
    var id = Math.floor(Math.random() * 99999999999999).toString(36);
    this.disableInputs();
    this.appendToContent('<div ><span id = "' + id + '" contentEditable="true">' + prompt.Index + ". " + prompt.Question + "</span></div>", true);

    switch (prompt.Type) {
      case "MENU":
      case "CF":
      case "YN":
      case "TF":
        this.showMenu(prompt, false);
        break;
    }

    this.input.focus(); // let el = document.getElementById( id )
    // el.scrollIntoView()
  };

  _proto.processValidationError = function processValidationError(error) {
    this.input.value = "";
    this.input.focus(); // this.appendToContent("<div>" + error + "</div>")

    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>");
  };

  _proto.processError = function processError(error) {
    // console.log(JSON.stringify(error))
    this.input.value = "";
    this.input.focus();
    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>"); // this.display.innerHTML += "<br/>" + ( error.msg || error )
  };

  _proto.processParserErrors = function processParserErrors(errors) {
    var _this9 = this;

    if (!errors) {
      this.appendToContent("<div>System error</div>");
      return;
    } // alert(JSON.stringify(errors))


    errors.forEach(function (e) {
      var x = e.x === undefined ? e.column : e.x;
      var y = e.y === undefined ? e.row : e.y;
      var s = "<br/><i style='color:red;' class='fa fa-times'></i> '" + e.text + "'<br/> <i style='color:blue;' class='fa fa-anchor'></i> <a href='javascript:void()' onclick='selectLine(" + y + ")'>" + "Line: " + (y * 1 + 1) + " Column: " + (x + 1) + "</a> <br/><i class='fa fa-code'></i> <a href ='javascript:void()' onclick='selectLine(" + y + ")'>" + e.text + "</a>";
      _this9.display.innerHTML += s + "<br/>";

      _this9.scrollDown("Error");
    });
  };

  _proto.processScriptError = function processScriptError(error) {
    if (!error) {
      this.appendToContent("<div>System error</div>");
      return;
    }

    var code = error.code; //var lang='en';

    var msg = error.message; //var expr='';

    var line = error.details.line;
    var lineIndex = error.details.index;
    var rIndex = error.details.rIndex;
    var rule = error.details.rule;

    try {
      var s = "<br/><strong>" + code + "<br/>Row:&Tab; <a href='javascript:selectLine(" + lineIndex + ")'>" + lineIndex + "</a><br/>Details:&Tab;<strong>" + msg + "</strong>" + "<br/>Code:&Tab;&Tab;<a href ='javascript:selectLine(" + lineIndex + ")'>" + line + "</a>" + "<br/>Rule number:&Tab;<strong>" + rIndex + "</strong>" + "<br/>Rule:&Tab;&Tab;<a href ='javascript:selectLine(" + lineIndex + ")'>" + rule + "</a><br/><hr/><p><p>";
      this.display.append(s);
      window.setTimeout(function () {
        window.Editor.resize();
        window.setTimeout(function () {
          this.scrollDown("content");
        }, 200);
      }, 200);
    } catch (ex) {
      console.log(ex);
    }
  };

  _proto.processAnswers = function processAnswers(answers) {
    this.disableInputs();
    if (answers.length === 0) return;
    var display = ["<div class='conclusion'>"];
    display.push("<span>Conclusion</span>");
    answers.forEach(function (goal) {
      display.push("<br/>" + goal.Name);
      display.push(": " + goal.Value);
      display.push(" - confidence: " + (goal.CF === NaN ? 100 : goal.CF) + "%");
    });
    display.push("</div>");
    this.appendToContent(display.join(" ")); //  this.setMargin()
    // this.scrollDown()
  };

  _proto.processInfo = function processInfo(data) {
    //content.append("<hr/>");
    var rand2 = Math.random().slice(2).toString(36);
    this.appendToContent("<div><b>" + data.msg + "</b></div>");

    if (data.msg.indexOf("Session expired") > -1 || data.msg.indexOf("No session") > -1) {
      var link1 = "<a href='javascript:void (0)'  id='" + rand2 + "' class='active-link opensocket'>Click here to start new session</a>";
      this.appendToContent("<div><b>" + link1 + "</b></div>");
      document.getElementById(rand2).onclick(function () {
        this.open();
      });
    }
  };

  _proto.addClickListener = function addClickListener(fn) {
    var tags = this.el.getElementsByTagName("ul");
    var last = tags[tags.length - 1];

    for (var i = 0; i < last.childNodes.length; i++) {
      var node = last.children[i];

      if (node && node.children) {
        var el = node.children[0].firstChild;
        el.addEventListener("click", fn);
      }
    }
  };

  _proto.disableInputs = function disableInputs() {
    var tags = this.el.getElementsByTagName("ul");
    var last = tags[tags.length - 1];
    if (!last) return;
    this.widgets.forEach(function (w) {
      w.setAttribute("checked", true);
    });
    this.widgets = [];

    for (var i = 0; i < last.childNodes.length; i++) {
      var node = last.children[i];

      if (node && node.children) {
        var el = node.children[0].firstChild;
        el.disabled = true;
      }
    }
  };

  _proto.composeReply = function composeReply() {
    var tags = this.el.getElementsByTagName("ul");
    var last = tags[tags.length - 1];
    if (!last) return null;
    var resp = {};
    var index = 0;

    for (var i = 0; i < last.childNodes.length; i++) {
      var node = last.children[i];

      if (node && node.children) {
        var el = node.children[0].firstChild;
        index++;

        if (el.checked) {
          resp[el.value] = index;
          this.widgets.push(el);
        } else {
          delete resp[el.value];
        }
      }
    }

    return Object.values(resp).join(",");
  };

  _proto.composeMenuWidget = function composeMenuWidget(prompt) {
    var name = Math.floor(Math.random() * 9999999999999).toString(36);
    var array = [];

    if (prompt.Max > 1) {
      array = this.composeCheckBoxes(prompt, name);
    } else {
      array = this.composeRadioButtons(prompt, name);
    }

    var ol = "<ul>" + array.join(" ") + "</ul>";
    this.appendToContent(ol, true);
  };

  _proto.composeCheckBoxes = function composeCheckBoxes(prompt, name) {
    return prompt.Menu.map(function (m) {
      return '<li><label><input type = "checkbox" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  };

  _proto.composeRadioButtons = function composeRadioButtons(prompt, name) {
    return prompt.Menu.map(function (m) {
      return '<li><label><input type = "radio" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  };

  _proto.showMenu = function showMenu(prompt, commandline) {
    if (!commandline) return this.composeMenuWidget(prompt);
    var array = prompt.Menu.map(function (m) {
      return "<li>" + m.Name + "</li>";
    });
    var ol = "<ol >" + array.join(" ") + "</ol>";
    this.appendToContent(ol, true);
    return null;
  };

  _proto.appendToContent = function appendToContent(node, scroll) {
    if (scroll === void 0) {
      scroll = true;
    }

    if (node && node.classList) {
      node.classList.add("pr-console-line");
    }

    this.display.innerHTML += node;
    if (scroll) this.scrollDown("content");
  };

  _proto.setMargin = function setMargin() {
    var el = this.display;
    var child = el.lastChild;

    if (child && child.classList) {
      child.classList.add("pr-margin-bottom"); //child.style.borderBottom = "1px solid #777"
      //child.style.paddingTop = "6px"
      //child.style.marginBottom = "8px"
    }
  };

  _proto.scroll = function scroll(direction) {
    var el = this.display;

    if (direction === "up") {
      el.scrollTop = 0;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  _proto.scrollDown = function scrollDown() {
    var el = this.display;
    var child = el.lastChild;

    try {
      if (child) {
        child.scrollIntoView();
      } else {
        el.scrollTop = el.scrollHeight;
      }
    } catch (e) {
    }
  };

  _proto.scrollUp = function scrollUp() {
    var el = this.display;
    var child = el.firstChild;

    if (child) {
      child.scrollIntoView();
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  _proto.showInputBar = function showInputBar() {
    //var a0="<input type='text' class='input'/><br/> ";
    //var a1=(' <a href=\'javascript:void(0)\' onclick=\'ui.send()\'>Send</a> ');
    var a2 = " <a href='javascript:void(0)'onclick='disconnect()' >Disconnect</a> ";
    var a3 = " <a href='javascript:void(0)'onclick='open()' >Restart</a>  ";
    var a4 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = " <div id='input-bar'><input type='text' class='input'/>" + a2 + a3 + a4 + "</div></br/>";
    this.appendToContent(ol);
  };

  _proto.showTaskBar = function showTaskBar() {
    //ol.append("<input type='text' class='input' onkeyUp='inputKeyup("+event+")'/> ");
    //ol.append(" <a href='javascript:void(0)' onclick='submmitClick'>Send</a> ");
    //ol.append(" <a href='javascript:void(0)' onclick='disconnect'>Disconnect</a> ");
    var a1 = " <a href='javascript:void(0)' onclick='connectClick()'>Restart</a> ";
    var a2 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = "<div id='input-bar'>" + a1 + a2 + "</div>";
    this.appendToContent(ol);
  };

  _createClass(Ux, [{
    key: "Text",
    get: function get() {
      return this.text;
    },
    set: function set(text) {
      this.text = text;
    }
  }, {
    key: "URL",
    get: function get() {
      return this.url;
    },
    set: function set(url) {
      this.url = url;
    }
  }, {
    key: "Theme",
    get: function get() {
      return this._theme;
    },
    set: function set(color) {
      // dark themes: green, blue, red, purple, indigo, orange
      // light themes: white, silver, gold, lavendar
      if (color) {
        color = color.toLowerCase();
      }

      if (this.theme === color) {
        this.el.classList.remove(this.theme);
        return;
      }

      this.el.classList.add(color);
      this._theme = color;
    }
  }]);

  return Ux;
}();

var Ui = /*#__PURE__*/function () {
  function Ui(el, options) {
    if (options === void 0) {
      options = {};
    }

    // super();
    this.language = options.language || "en";
    if (!el) throw "Missing Element ID to attach UX";
    var node = el instanceof HTMLElement ? el : typeof el === "string" ? document.getElementById(el) : el;
    if (!node || !node instanceof HTMLElement) throw "ID not a valid Node";
    this.el = node;
    this.el.style.overflow = "hidden";
    this.text = options.text || null;
    this.data = null;
    this.widgets = [];
    this.prompt = {};
    this.error = null;
    this.display = null;
    this.buttons = null;
    this.container = null;
    this.rules = new Rules(this.language);
    this.loadConsolePanel();
    this.attachListeners();
    this.attachCSS();
    this.addListeners(); // if (this.text) this.start(this.text)
  }

  var _proto = Ui.prototype;

  _proto.run = function run(codes) {
    try {
      var _this2 = this;

      _this2.codes = codes;
      return Promise.resolve(_this2.rules.compile(codes)).then(function (_this$rules$compile) {
        _this2.data = _this$rules$compile;

        // localStorage.setItem('engine-kb-data', JSON.stringify(this.data))
        _this2.start();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.start = function start() {
    var response = this.rules.run(this.data);
    this.process(response);
  };

  _proto.repeat = function repeat() {
    try {
      var _this4 = this;

      // let data = localStorage.getItem('engine-kb-data')
      // this.data = JSON.parse(data)
      return Promise.resolve(_this4.run(_this4.codes)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.reply = function reply(input) {
    var response = this.rules.reply(this.data, input);
    this.process(response);
  };

  _proto.send = function send() {
    if (!this.data) {
      return console.info("No language defined in kb", console.trace);
    }

    var msg = null;

    if (this.prompt.Type === "NUMBER" || this.prompt.Type === "TEXT") {
      msg = this.input.value;
    } else {
      msg = this.composeReply();
    }

    if (!msg) return;
    this.setMargin();
    this.input.value = "";
    this.reply(msg);
  };

  _proto.why = function why() {//ps.publish( 'why' )
  };

  _proto.stop = function stop() {//ps.publish( 'stop' )
  };

  _proto.explain = function explain() {//ps.publish( 'explain' )
  };

  _proto.cancel = function cancel() {
    this.display.innerHTML = "";
  };

  _proto.print = function print() {
    var html = this.display.innerHTML;
    var win = window.open("about:blank", "self", "width=600; height=450;");
    win.document.writeln(html);
    win.print();
    win.close();
  };

  _proto.copy = function copy() {};

  _proto.process = function process(response) {
    // console.log({ response })
    if (response.Label === "Prompt" || response.Label === "CF") {
      //Prompting for input
      return this.processPrompt(response);
    } else if (response instanceof Array) {
      //answers are ready
      return this.processAnswers(response);
    } else {
      // console.log(response.name)
      switch (response.name) {
        case "ValidationError":
          return this.processValidationError(response);

        case "SyntaxError":
          return this.processError(response);

        case "ScriptError":
          return this.processError(response);

        default:
          return this.processError(response);
      }
    }
  };

  _proto.attachScripts = function attachScripts(scr, id, name) {
    var head = document.body;
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.id = id || Math.random().slice(2).toString(36);
    link.name = name || "script" + link.id;
    link.append(scr);
    head.appendChild(link);
  };

  _proto.attachListeners = function attachListeners() {
    var _this5 = this;

    this.el.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        if (e.target.type === "radio" || e.target.type === "checkbox") {
          _this5.send();
        } else if (e.target.type === "text") {
          _this5.send();
        } else {
          e.target.click();
        }
      }

      e.preventDefault();
      e.stopPropagation();
    });
    this.toolbar.addEventListener("click", function (e) {
      switch (e.target.id) {
        case "pr-print":
          _this5.print();

          break;

        case "pr-copy":
          _this5.copy();

          break;
      }

      e.stopPropagation();
      e.preventDefault();
    });
    this.buttons.addEventListener("click", function (e) {
      switch (e.target.innerText) {
        case "✓":
          _this5.send();

          break;

        case "?":
          _this5.why();

          break;

        case "!":
          _this5.explain();

          break;

        case "×":
          _this5.cancel();

          break;

        case "‣":
          _this5.repeat();

          break;

        case "⛔":
          _this5.stop();

          break;

        default:
          //do nothing
          return;
      }

      _this5.input.focus();

      e.preventDefault();
      e.stopPropagation();
    });
  };

  _proto.attachCSS = function attachCSS() {
    var head = document.head;
    var link = document.createElement("style");
    link.rel = "stylesheet";
    var css = "\n    .pr-copy, \n    .pr-print {\n      cursor: pointer;\n      padding: 2px 0;\n      margin-left: 8px;\n      margin-bottom: 4px;\n      height: 22px;\n      margin-right: 4px;\n      background: white;\n      border-radius: 5px 5px 5px 5px;\n    }\n    .pr-toggle {\n       cursor: pointer;\n    }\n    .pr-copy {\n        padding-right: 0px;\n        padding-left: 4px;\n     }\n     .pr-print {\n        padding-left: 4px;\n        padding-right: 4px;\n     }\n    .pr-parent {\n        border: 0;\n        min-width: 240px;\n        padding: 2px;\n        transition: background 1.8s;\n    }\n    .pr-container {\n        position:absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        overflow: hidden;\n        border: 1px solid none;\n        color: white;\n        background: #222;\n    }\n    .pr-banner, \n    .pr-banner {\n        height: 1.8rem;\n        font-weight: 400;\n        margin-bottom:0;\n        padding-top: 2px;\n        font-variant: small-caps;\n    }\n    .pr-toolbar {\n        position: relative;\n        display: flex;\n        align-items: center;\n        letter-spacing: 1.4px;\n        font-size: 14px;\n        align-items: center;\n        height: 100%;\n        width: 160px;\n        text-align: right;\n        float: right;\n        border-radius:50px;\n        padding-left: 1rem;\n        padding-right: 17px;\n        padding-top: 1px;\n        opacity: 0;\n        justify-content: flex-end;\n    }\n    .pr-banner:hover > .pr-toolbar {\n        transition: all 0.7s;\n        opacity: 100%;\n    }\n    .pr-display {\n        position: absolute;\n        overflow: auto;\n        padding: 4px;\n        top: 36px;\n        bottom: 36px;\n        left: 0;\n        right: 0;\n        background: #111;\n        border-top: 1px solid transparent;\n        border-bottom: 1px solid transparent;\n        font-size: 16px;\n        letter-spacing: 1.2px;\n        color: cadetblue;\n        text-shadow: none;\n    }\n    .pr-display ul {list-style-type:none; border-bottom:0px solid #555;}\n    .pr-dispaly ol {border-bottom:0px solid #555; list-style:upper-latin;}\n    .pr-display .pr-margin-bottom {border-bottom: 1px solid cadetblue;margin-bottom:5px; padding:5px}\n    .pr-input-panel {\n        position: absolute;\n        left: 0;\n        right: 0;\n        bottom: 4px;\n        padding-top: 0;\n        padding-left: 7px;\n        height: 32px;\n    }\n    .pr-input-buttons {\n      display:inline-block;\n      font-weight:bold;\n      margin-bottom: 2px;\n      font-size: 1.4em;\n    }\n    .pr-text-input-container {\n      padding: 0;\n      background: transparent;\n      border: none;\n    }\n    .pr-text-input {\n        width: auto;\n        max-width: 80px;\n        outline: none;\n        background: slateblue;\n        color: white;\n        font-size: 18px;\n        height: 100%;\n        width: 100%;\n        border: none;\n    }\n    .pr-link-btn {\n        padding: 4px 4px 4px 4px;\n        text-decoration: none;\n        margin: 1px;\n        border-radius: px 2px 2px;\n    }\n    .pr-char {\n        font-size: 1em;\n        font-weight: bold;\n        color: white;\n    }\n    .pr-margin-bottom {\n       border-bottom: 1px solid transparent;\n       padding-top: 6px;\n       margin-bottom: 8px;\n    }\n    .gold .pr-container {\n        background: blanchedalmond;\n        color: green;\n    }\n\n    .gold .pr-char, .gold .pr-banner {\n      color: green;\n    }\n    .blue .pr-container {\n      background: navy;\n    }\n    .indigo .pr-container {\n      background: slateblue;\n    } \n    .green .pr-container {\n      background: lightgreen;\n    }\n    .red .pr-container {\n      background: #b00000;\n    }\n    .orange .pr-container {\n      background: orange;\n    }\n    .light .pr-container {\n      background: #eee;\n      color: blue;\n    }\n    .light .pr-char, .light .pr-banner {\n      color: blue;\n    }\n    ";
    link.append(css);
    head.appendChild(link);
  };

  _proto.loadConsolePanel = function loadConsolePanel() {
    try {
      var _this7 = this;

      var num = Math.random().toString(36).slice(2).toString(36);
      var display_id = "display" + num,
          inputId = "text" + num,
          btpanel = "btPanel" + num,
          container = "container" + num,
          toolbar = "tb" + num,
          banner = "banner" + num;
      var panel = "\n    <div id = '" + container + "' class ='pr-container'>\n      <div id ='" + banner + "' class ='pr-banner'>\n        <span class=\"pr-banner-title\">Rules Interface</span>\n        <div id ='" + toolbar + "' class ='pr-toolbar'></div>\n      </div>\n      <div id ='" + display_id + "' class ='pr-display'></div>\n      <div id ='" + btpanel + "' class ='pr-input-panel'>\n      <span class='pr-text-input-container'>\n        <input id ='" + inputId + "' class ='pr-text-input' type='text'/>\n      </span> \n      <span class='pr-input-buttons'>\n          <a href='javascript:void(0)' title='Send' class='pr-link-btn'><span class='pr-char'>&check;</span></a>\n          <a href='javascript:void(0)' title='Why ask?' class='pr-link-btn'><span class='pr-char'>&quest;</span></a>\n          <a href='javascript:void(0)' title='Explain' class='pr-link-btn'><span class='pr-char'>&excl;</span></a>\n          <a href='javascript:void(0)' title='Disconnect' class='pr-link-btn'><span class='pr-char'>&times;</span></a>\n          <a href='javascript:void(0)' title='Repeat' class='pr-link-btn'><span class='pr-char' style=\"font-size:1.5rem\">&#8227;</span></a>\n      </span>\n    </div></div>";
      _this7.el.innerHTML = panel;

      _this7.el.classList.add("pr-parent");

      _this7.theme = "dark";
      _this7.display = document.getElementById(display_id);
      _this7.input = document.getElementById(inputId);
      _this7.buttons = document.getElementById(btpanel);
      _this7.banner = document.getElementById(banner);
      _this7.toolbar = document.getElementById(toolbar);
      new Viewer(_this7.display, _this7.toolbar);

      _this7.input.focus();

      _this7.container = document.getElementById(container); // let doc = document.createDocumentFragment()
      // let runpanel = doc.getElementById( container )
      // let input = doc.getElementById( inputId )
      // this.stylePanel( runpanel )
      // this.styleDisplay( display )
      // this.styleInput( input )
      // this.styleLinks( doc )
      // console.log( document.getElementsByClassName( 'gold' )[0].style.background='lavender' )

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.toggleTheme = function toggleTheme() {
    // console.log(this.theme, this.el)
    this.el.classList.toggle(this.Theme);
  };

  _proto.stylePanel = function stylePanel(runpanel) {
    runpanel.style.position = "absolute";
    runpanel.style.top = "0";
    runpanel.style.left = "0";
    runpanel.style.right = "0";
    runpanel.style.bottom = "0";
    runpanel.style.overflow = "auto";
    runpanel.style.paddingLeft = runpanel.style.paddingRight = "5px";
    runpanel.style.background = "inherit";
  };

  _proto.styleDisplay = function styleDisplay(display) {
    display.style.position = "absolute";
    display.style.top = "4px";
    display.style.left = "0";
    display.style.right = "0";
    display.style.bottom = "48px";
    display.style.overflow = "auto";
    display.style.paddingLeft = display.style.paddingRight = "16px";
  };

  _proto.styleInput = function styleInput(input) {
    input.style.color = "#000";
    input.style.background = "#999";
    input.style.border = "1px solid #333";
    input.style.marginRight = "7px";
    input.style.borderRadius = "15px";
    input.style.padding = "4px 4px 4px 12px";
  };

  _proto.styleLinks = function styleLinks(doc) {
    var links = doc.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.style.padding = "4px 8px 4px 8px";
      link.style.textDecoration = "none";
      link.style.color = "inherit";
      link.style.margin = "1px";
      link.style.borderRadius = "2px 2px";
    }

    var btns = doc.getElementsByClassName("char");

    for (var _i = 0; _i < btns.length; _i++) {
      var _link = links[_i];
      _link.style.fontSize = "2em";
      _link.style.fontWeight = "bold";
    }

    return doc;
  };

  _proto.addListeners = function addListeners() {
    var _this8 = this;

    this.on("error", function (e) {
      _this8.processError(e);
    });
    this.on("syntax-error", function (e) {
      // this.processParserErrors(e.msg )
      // this.processError( e )
      // console.log(e)
      _this8.processError(e);
    });
    this.on("system-error", function (e) {
      // this.processError( e )
      _this8.processError(e); // console.log(e)

    });
    this.on("validation-error", function (e) {
      _this8.processValidationError(e);
    });
    this.on("prompt", function (e) {
      _this8.processPrompt(e);
    });
    this.on("answers", function (e) {
      _this8.display.innerHTML = "";

      _this8.processAnswers(e);
    });
    this.on("message", function (e) {
      _this8.appendToContent("<h6>" + e.msg || e + "</h6>");
    });
    this.on("done", function () {
      _this8.display.innerHTML = "";
    });
  };

  _proto.processPrompt = function processPrompt(prompt) {
    this.prompt = prompt;
    var id = Math.floor(Math.random() * 99999999999999).toString(36);
    this.disableInputs();
    this.appendToContent('<div ><span id = "' + id + '" contentEditable="true">' + prompt.Index + ". " + prompt.Question + "</span></div>", true);

    switch (prompt.Type) {
      case "MENU":
      case "CF":
      case "YN":
      case "TF":
        this.showMenu(prompt, false);
        break;
    }

    this.input.focus(); // let el = document.getElementById( id )
    // el.scrollIntoView()
  };

  _proto.processValidationError = function processValidationError(error) {
    this.input.value = "";
    this.input.focus(); // this.appendToContent("<div>" + error + "</div>")

    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>");
  };

  _proto.processError = function processError(error) {
    // console.log(JSON.stringify(error))
    this.input.value = "";
    this.input.focus();
    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>"); // this.display.innerHTML += "<br/>" + ( error.msg || error )
  };

  _proto.processParserErrors = function processParserErrors(errors) {
    var _this9 = this;

    if (!errors) {
      this.appendToContent("<div>System error</div>");
      return;
    }

    errors.forEach(function (e) {
      var x = e.x === undefined ? e.column : e.x;
      var y = e.y === undefined ? e.row : e.y;
      var s = "<br/><i style='color:red;' class='fa fa-times'></i> '" + e.text + "'<br/> <i style='color:blue;' class='fa fa-anchor'></i> <a href='javascript:void()' onclick='selectLine(" + y + ")'>" + "Line: " + (y * 1 + 1) + " Column: " + (x + 1) + "</a> <br/><i class='fa fa-code'></i> <a href ='javascript:void()' onclick='selectLine(" + y + ")'>" + e.text + "</a>";
      _this9.display.innerHTML += s + "<br/>";

      _this9.scrollDown("Error");
    });
  };

  _proto.processScriptError = function processScriptError(error) {
    if (!error) {
      this.appendToContent("<div>System error</div>");
      return;
    }

    var code = error.code; //var lang='en';

    var msg = error.message; //var expr='';

    var line = error.details.line;
    var lineIndex = error.details.index;
    var rIndex = error.details.rIndex;
    var rule = error.details.rule;

    try {
      var s = "<br/><strong>" + code + "<br/>Row:&Tab; <a href='javascript:selectLine(" + lineIndex + ")'>" + lineIndex + "</a><br/>Details:&Tab;<strong>" + msg + "</strong>" + "<br/>Code:&Tab;&Tab;<a href ='javascript:selectLine(" + lineIndex + ")'>" + line + "</a>" + "<br/>Rule number:&Tab;<strong>" + rIndex + "</strong>" + "<br/>Rule:&Tab;&Tab;<a href ='javascript:selectLine(" + lineIndex + ")'>" + rule + "</a><br/><hr/><p><p>";
      this.display.append(s);
      window.setTimeout(function () {
        window.Editor.resize();
        window.setTimeout(function () {
          this.scrollDown("content");
        }, 200);
      }, 200);
    } catch (ex) {
      console.log(ex);
    }
  };

  _proto.processAnswers = function processAnswers(answers) {
    this.disableInputs();
    if (answers.length === 0) return;
    var display = ["<div class='conclusion'>"];
    display.push("<span>Conclusion</span>");
    answers.forEach(function (goal) {
      display.push("<br/>" + goal.Name);
      display.push(": " + goal.Value);
      display.push(" - confidence: " + goal.CF + "%");
    });
    display.push("</div>");
    this.appendToContent(display.join(" ")); //  this.setMargin()
    // this.scrollDown()
  };

  _proto.processInfo = function processInfo(data) {
    //content.append("<hr/>");
    var rand2 = Math.random().slice(2).toString(36);
    this.appendToContent("<div><b>" + data.msg + "</b></div>");

    if (data.msg.indexOf("Session expired") > -1 || data.msg.indexOf("No session") > -1) {
      var link1 = "<a href='javascript:void (0)'  id='" + rand2 + "' class='active-link opensocket'>Click here to start new session</a>";
      this.appendToContent("<div><b>" + link1 + "</b></div>");
      document.getElementById(rand2).onclick(function () {
        this.open();
      });
    }
  };

  _proto.addClickListener = function addClickListener(fn) {
    var tags = this.el.getElementsByTagName("ul");
    var last = tags[tags.length - 1];

    for (var i = 0; i < last.childNodes.length; i++) {
      var node = last.children[i];

      if (node && node.children) {
        var el = node.children[0].firstChild;
        el.addEventListener("click", fn);
      }
    }
  };

  _proto.disableInputs = function disableInputs() {
    var tags = this.el.getElementsByTagName("ul");
    var last = tags[tags.length - 1];
    if (!last) return;
    this.widgets.forEach(function (w) {
      w.setAttribute("checked", true);
    });
    this.widgets = [];

    for (var i = 0; i < last.childNodes.length; i++) {
      var node = last.children[i];

      if (node && node.children) {
        var el = node.children[0].firstChild;
        el.disabled = true;
      }
    }
  };

  _proto.composeReply = function composeReply() {
    var tags = this.el.getElementsByTagName("ul");
    var last = tags[tags.length - 1];
    if (!last) return null;
    var resp = {};
    var index = 0;

    for (var i = 0; i < last.childNodes.length; i++) {
      var node = last.children[i];

      if (node && node.children) {
        var el = node.children[0].firstChild;
        index++;

        if (el.checked) {
          resp[el.value] = index;
          this.widgets.push(el);
        } else {
          delete resp[el.value];
        }
      }
    }

    return Object.values(resp).join(",");
  };

  _proto.composeMenuWidget = function composeMenuWidget(prompt) {
    var name = Math.floor(Math.random() * 9999999999999).toString(36);
    var array = [];

    if (prompt.Max > 1) {
      array = this.composeCheckBoxes(prompt, name);
    } else {
      array = this.composeRadioButtons(prompt, name);
    }

    var ol = "<ul>" + array.join(" ") + "</ul>";
    this.appendToContent(ol, true);
  };

  _proto.composeCheckBoxes = function composeCheckBoxes(prompt, name) {
    return prompt.Menu.map(function (m) {
      return '<li><label><input type = "checkbox" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  };

  _proto.composeRadioButtons = function composeRadioButtons(prompt, name) {
    return prompt.Menu.map(function (m) {
      return '<li><label><input type = "radio" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  };

  _proto.showMenu = function showMenu(prompt, commandline) {
    if (!commandline) return this.composeMenuWidget(prompt);
    var array = prompt.Menu.map(function (m) {
      return "<li>" + m.Name + "</li>";
    });
    var ol = "<ol >" + array.join(" ") + "</ol>";
    this.appendToContent(ol, true);
    return null;
  };

  _proto.appendToContent = function appendToContent(node, scroll) {
    if (scroll === void 0) {
      scroll = true;
    }

    if (node && node.classList) {
      node.classList.add("pr-console-line");
    }

    this.display.innerHTML += node;
    if (scroll) this.scrollDown("content");
  };

  _proto.setMargin = function setMargin() {
    var el = this.display;
    var child = el.lastChild;

    if (child && child.classList) {
      child.classList.add("pr-margin-bottom"); //child.style.borderBottom = "1px solid #777"
      //child.style.paddingTop = "6px"
      //child.style.marginBottom = "8px"
    }
  };

  _proto.scroll = function scroll(direction) {
    var el = this.display;

    if (direction === "up") {
      el.scrollTop = 0;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  _proto.scrollDown = function scrollDown() {
    var el = this.display;
    var child = el.lastChild;

    try {
      if (child) {
        child.scrollIntoView();
      } else {
        el.scrollTop = el.scrollHeight;
      }
    } catch (e) {
    }
  };

  _proto.scrollUp = function scrollUp() {
    var el = this.display;
    var child = el.firstChild;

    if (child) {
      child.scrollIntoView();
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  _proto.showInputBar = function showInputBar() {
    //var a0="<input type='text' class='input'/><br/> ";
    //var a1=(' <a href=\'javascript:void(0)\' onclick=\'ui.send()\'>Send</a> ');
    var a2 = " <a href='javascript:void(0)'onclick='disconnect()' >Disconnect</a> ";
    var a3 = " <a href='javascript:void(0)'onclick='open()' >Restart</a>  ";
    var a4 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = " <div id='input-bar'><input type='text' class='input'/>" + a2 + a3 + a4 + "</div></br/>";
    this.appendToContent(ol);
  };

  _proto.showTaskBar = function showTaskBar() {
    //ol.append("<input type='text' class='input' onkeyUp='inputKeyup("+event+")'/> ");
    //ol.append(" <a href='javascript:void(0)' onclick='submmitClick'>Send</a> ");
    //ol.append(" <a href='javascript:void(0)' onclick='disconnect'>Disconnect</a> ");
    var a1 = " <a href='javascript:void(0)' onclick='connectClick()'>Restart</a> ";
    var a2 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = "<div id='input-bar'>" + a1 + a2 + "</div>";
    this.appendToContent(ol);
  };

  _createClass(Ui, [{
    key: "Text",
    get: function get() {
      return this.text;
    },
    set: function set(text) {
      this.text = text;
    }
  }, {
    key: "URL",
    get: function get() {
      return this.url;
    },
    set: function set(url) {
      this.url = url;
    }
  }, {
    key: "Theme",
    get: function get() {
      return this._theme;
    },
    set: function set(color) {
      // dark themes: green, blue, red, purple, indigo, orange
      // light themes: white, silver, gold, lavendar
      if (color) {
        color = color.toLowerCase();
      }

      if (this.theme === color) {
        this.el.classList.remove(this.theme);
        return;
      }

      this.el.classList.add(color);
      this._theme = color;
    }
  }]);

  return Ui;
}();

exports.Rules = Rules;
exports.Ui = Ui;
exports.Ux = Ux;
//# sourceMappingURL=rules-engine.js.map
