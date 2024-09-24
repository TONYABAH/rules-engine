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

const ErrorKeys = {
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

/* jshint esversion:8*/

const validator = function () {
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
    const num = input;

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

    input.forEach(num => {
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
    const num = Number(input);

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
    validate(input, prompt) {
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
            const values = input.toString().split(",");
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

// These definitions are internally used to store tokens
// they should not affect language of production rules
const REM = 'REM';
const COMMENT = 'COMMENT';
const TITLE = 'TITLE';
const SUMMARY = 'SUMMARY';
const ATTRIBUTE = 'ATTRIBUTE';
const ARRAY = 'ARRAY';
const ATTR = 'ATTR';
const GOAL = 'GOAL';
const LINE = 'LINE';
const SUM = '+'; // addition

const MUL = 'x'; // times

const AVE = 'AVE'; // average

const TF = 'TF';
const YN = 'YN';
const RULE = 'RULE';
const ELSE = 'ELSE';
const ELSEIF = 'ELSEIF';
const THEN = 'THEN';
const AND = 'AND';
const OR = 'OR';
const IF = 'IF';
const PROMPT = 'PROMPT';
const QUESTION = 'QUESTION';
const YES = 'YES';
const NO = 'NO';
const TRUE = 'TRUE';
const FALSE = 'FALSE';
const NUMBER = 'NUMBER';
const DIGIT = 'DIGIT';
const TEXT = 'TEXT';
const MENU = 'MENU';
const NUM = 'NUM';
const MIN = 'MIN';
const MAX = 'MAX';
const EX = 'EXCLUDE';
const IN = 'INCLUDE';
const NOT = 'NOT';
const IS = 'IS'; // symbols and special characters

const LPAREN = 'LPAREN';
const RPAREN = 'RPAREN';
const LBRACKET = 'LBRACKET';
const RBRACKET = 'RBRACKET';
const CARRET = 'CARRET';
const TIMES = 'TIMES';
const DIV = 'DIV';
const PLUS = 'PLUS';
const MINUS = 'MINUS';
const STRING = 'STRING';
const MOD = 'MOD';
const EQ = 'EQ';
const GT = 'GT';
const LT = 'LT';
const COMMA = 'COMMA';
const COLON = 'COLON';
const SPACE = 'SPACE';
const ERROR = 'ERROR';
const EOF = 'EOF';
const FUNC = 'FUNC';
const CONST = 'CONST'; // Math constants
 //(x)

/* jshint esversion:8*/
class Token {
  constructor(type, value, row, col) {
    this.type = type;
    this.value = value;
    this.row = row || 0;
    this.column = col || 0;
    this.length = value ? value.length : 0;
  }

}
/**
 * Abstract Syntax Tree (AST)
 */

class AST {// pass
}
class BinOp extends AST {
  constructor(left, op, right) {
    super();
    this.left = left;
    this.token = this.op = op;
    this.right = right;
  }

}
class Num extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }

}
class Str extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }

}
class Attr extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }

}
class Const extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }

}
class Func extends AST {
  constructor(op, params) {
    super();
    this.token = this.op = op;
    this.params = [params];
  }

}
class Comma extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }

}
class UnaryOp {
  constructor(op, expr) {
    this.token = this.op = op;
    this.expr = expr;
  }

}

/* jshint esversion:8*/
/**
 * Abstarct Syntax tree AST builder, recursively passes tokens into an abstarct syntax tree
 */

class Builder {
  constructor() {
    this.tokens = [];
    this.pos = 0; // set current token to the first token taken from the input

    this.current_token = null;
  }

  matchCloseParenthesis(tokens, startIndex) {
    let $return = -1;
    let left = 0;
    let right = 0;

    for (let i = startIndex; i < tokens.length; i++) {
      const s = tokens[i].value;

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
  }

  matchOpenParenthesis(tokens, startIndex) {
    let $return = -1;
    let left = 0;
    let right = 0;

    for (let i = startIndex; i >= 0; i--) {
      const s = tokens[i].value;

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
  }

  matchParenthesis(tokens) {
    if (!tokens) return;
    this.matchBrackets(tokens);
    const open = "(";
    const close = ")";
    const opens = [];
    const closes = [];

    for (let i = 0; i < tokens.length; i++) {
      const c = tokens[i].value;

      if (c === open) {
        opens.push([i, c]);
      } else if (c === close) {
        closes.push([i, c]);
      }
    }

    for (let i = opens.length - 1; i >= 0; i--) {
      const match = this.matchCloseParenthesis(tokens, opens[i][0]);

      if (match === -1) {
        const msg = "Open parenthesis '{0}' at column {1} has no close parenthesis";
        this.error(msg
        /* , open, opens[i][0]*/
        );
        break;
      }
    }

    for (let i = 0; i < closes.length; i++) {
      // let c = closes[i][1];
      const index = closes[i][0];
      const match = this.matchOpenParenthesis(tokens, index);

      if (match === -1) {
        const msg = "Close parenthesis '{0}' at column {1} has no opening parenthesis";
        this.error(msg
        /* , close, closes[i][0]*/
        );
        break;
      }
    }
  }

  error() {
    return new Error("Invalid syntax");
  }

  getNextToken() {
    this.pos++;

    while (this.tokens[this.pos]) {
      this.current_token = this.tokens[this.pos];
      return this.current_token;
    }

    return {
      type: "EOF",
      value: null
    };
  }

  eat(token_type) {
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
  }

  factor() {
    // factor { NUM | LPAREN expr RPAREN//
    const token = this.current_token;

    if (token.type === PLUS) {
      this.eat(PLUS);
      const node = new UnaryOp(token, this.factor());
      return node;
    } else if (token.type === MINUS) {
      this.eat(MINUS);
      const node = new UnaryOp(token, this.factor());
      return node;
    } else if (token.type === CONST) {
      this.eat(CONST);
      return new Const(token);
    } else if (token.type === FUNC) {
      this.eat(FUNC);
      const node = this.parseFunc(token);
      return node;
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
      const node = this.expr();
      this.eat(RPAREN);
      return node;
    } else if (token.type === LBRACKET) {
      this.eat(LBRACKET);
      const node = this.expr();
      this.eat(RBRACKET);
      return node;
    }

    return null;
  }

  parseExpr(token) {
    let attr = [];
    let isAttrib = false;
    token.value.forEach(v => {
      if (v.type === "ATTR") {
        isAttrib = true;
      }

      attr.push(v.value);
    });

    if (isAttrib) {
      token.value = attr.join(" ");

      let _node = new Attr(token);

      return _node;
    }

    const node = new UnaryOp(token, this.build(token.value));
    return node;
  }

  parseFunc(token) {
    let endIndex = this.matchCloseParenthesis(this.tokens, this.pos - 1);
    this.eat(LPAREN);
    const node = new Func(token, this.expr());

    while (this.pos < endIndex) {
      const _token = this.current_token;

      if (_token.type !== COMMA) {
        let expr = this.expr();
        if (expr) node.params.push(expr);
      }

      this.getNextToken();
    }

    this.eat(RPAREN);
    return node;
  }

  term() {
    // term { factor ((TIMES | DIV) factor)*//
    let node = this.factor();

    while (this.current_token.type === TIMES || this.current_token.type === DIV || this.current_token.type === MOD) {
      const token = this.current_token;

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
  }

  expr() {
    /*
    expr   { term ((PLUS | MINUS) term)*
    term   { factor ((TIMES | DIV) factor)*
    factor { NUM | LPAREN expr RPAREN */
    let node = this.term();

    while (this.current_token.type === PLUS || this.current_token.type === MINUS) {
      const token = this.current_token;

      if (token.type == PLUS) {
        this.eat(PLUS);
      } else if (token.type == MINUS) {
        this.eat(MINUS);
      }

      node = new BinOp(node, token, this.term());
    }

    return node;
  }

  build(tokens) {
    this.tokens = tokens;
    this.pos = 0; // set current token to the first token taken from the input

    this.current_token = this.tokens[this.pos]; // set current token to the first token taken from the input

    const ast = this.expr(); // console.log( ast )

    return ast;
  }

}

/**
 * Language grammer interpreter, recursively passes abstract syntax tree into algebraic output
 */

class Interpreter
/* extends NodeVisitor*/
{
  constructor() {// super();
    // this.visitors = {visit_BinOp:this.visit_BinOp, visit_Num: this.visit_Num};
  }

  visit(node) {
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
  }

  visit_BinOp(node) {
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
  }

  visit_UnaryOp(node) {
    const op = node.op.type;

    if (op == PLUS) {
      return +this.visit(node.expr);
    } else if (op == MINUS) {
      return -this.visit(node.expr);
    } else if (op == 'ATTR') {
      return this.visit(node.expr);
    } else if (op === 'FUNC') {
      let params = [];
      node.params.map(p => {
        if (p) {
          params.push(this.visit(p));
        }
      });

      if (params) {
        return Math[node.op.value](...params);
      }

      return Math[node.op.value]();
    }

    return null;
  }

  visit_Num(node) {
    return node.value;
  }

  visit_Str(node) {
    return node.value;
  }

  visit_Attr(node) {
    return node.value;
  }

  visit_Const(node) {
    return Math[node.value];
  }
  /**
   * Recursively passes AST into algebraic output
   * @param {AST} ast
   */


  interpret(ast) {
    // console.log( {ast} )
    this.ast = ast;
    const result = this.visit(this.ast);
    return result;
  }

}

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

  const array = input.toString().trim().split(/,/g);
  const result = []; //array.map((v) => {

  for (let i = 0; i < array.length; i++) {
    const v = array[i];

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


class Engine {
  constructor(kb, translator) {
    if (!kb) throw new ReferenceError("kb is undefined");
    this.paused = false;
    this.CFSettings = null;
    this.done = false;
    this.knowledgebase = kb;
    this.keywords = kb.languageModule.keywords; // keywords[kb.language.toLowerCase()]

    this.CFSettings = kb.languageModule.prompts; // kb[kb.language.toLowerCase()].prompts // promptSettings[kb.language.toLowerCase()]
    // this.validator = new Validator(translator, kb.language)

    this.translator = translator; // this.validator = validator;
  }

  raiseScriptError(e) {
    // console.log(e)

    /* return CustomErrors(
        this.translator,
        this.knowledgebase.language
    ).ScriptError(keys.ScriptError, e);*/
    console.log(e);
    return ErrorKeys.ScriptError;
  }

  raisePromptNotFoundError() {
    // const message = this.t(keys.PromptNotFound).data

    /*return CustomErrors(
        this.translator,
        this.knowledgebase.language
    ).ValidationError(keys.PromptNotFound);*/
    return ErrorKeys.PromptNotFound;
  }

  raiseSessionExpiredError() {
    // const message = this.t(keys.SessionExpired).data

    /* return CustomErrors(
        this.translator,
        this.knowledgebase.language
    ).ValidationError(keys.SessionExpired); */
    return ErrorKeys.SessionExpired;
  }

  getEventData(code, message) {
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
  }

  calculateCF(oldValue, newValue, mode) {
    let cf = 0; // let oldValue = this.getConditionCF()

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
  }

  start() {
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
      let conditionIndex = 0;

      while (conditionIndex < this.knowledgebase.currentRule.Conditions.length) {
        this.knowledgebase.currentCondition = this.knowledgebase.currentRule.Conditions[conditionIndex];
        conditionIndex++;
        const result = this.testPremises();

        if (Boolean(result) === true) {
          const _result = this.fireRule(this.knowledgebase.currentCondition.Inferences);

          if (_result) return _result;
        } else if (this.paused) {
          this.knowledgebase.ruleIndex--;
          return this.knowledgebase.currentPrompt;
        } else if (this.knowledgebase.currentRule.Conditions.length <= conditionIndex) {
          const _result2 = this.fireRule(this.knowledgebase.currentRule.AltInferences);

          if (_result2) return _result2;
        }

        if (this.done) break;
      }

      if (this.done) break;
    }

    this.knowledgebase.ruleIndex = 0;
    return this.knowledgebase.answers;
  }

  testPremises() {
    const maxIndex = this.knowledgebase.currentCondition.Premises.length - 1;
    let testResult = null;

    for (let index = 0; index <= maxIndex; index++) {
      const Premise = this.knowledgebase.currentCondition.Premises[index];

      if (testResult === true && Premise.Keyword === this.keywords.OR.toUpperCase()) {
        // log(lineText + ': breaking loop...');
        continue;
      } else if (testResult === false && Premise.Keyword.toUpperCase() === this.keywords.AND.toUpperCase()) {
        // log(lineText + ': breaking loop...');
        continue;
      }

      const leftNodes = this.mapNodes(Premise.Left);
      if (this.paused) return false;
      const rightNodes = this.mapNodes(Premise.Right);
      if (this.paused) return false; // console.log(leftNodes, rightNodes)

      const left = this.solve(leftNodes) || "";
      const right = Premise.Right.length > 0 ? this.solve(rightNodes) : true;
      const cfLeft = Math.min(this.evaluateCF(Premise.Left));
      const cfRight = Math.min(this.evaluateCF(Premise.Right));
      const cf = Math.min(cfLeft, cfRight);

      if (cf < 100) {
        const mode = Premise.Keyword === this.keywords.OR.toUpperCase() ? MUL : AVE;
        let kbCF = this.knowledgebase.CF || 100;
        this.knowledgebase.CF = this.calculateCF(kbCF, cf, mode);
      }

      testResult = this.compare(left, right, Premise.Comparator);
    }

    return testResult;
  }

  solveAttribute(value, inference) {
    const nodes = this.mapNodes(value);
    const attribValue = this.solve(nodes);
    const attribute = this.knowledgebase.attributes[inference.Name.toLowerCase()];
    let newValue = attribute.CF;
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
  }

  fireRule(inferences) {
    this.knowledgebase.currentCondition.isMet = true;
    this.knowledgebase.firedRules[this.knowledgebase.currentRule.Name] = this.knowledgebase.currentRule;
    if (this.knowledgebase.currentRule.Fired) return false;
    this.knowledgebase.currentRule.Fired = true;
    if (!inferences) return false;

    for (let i = 0; i < inferences.length; i++) {
      const inference = inferences[i];
      const value = inference.Value;

      if (/^fetch\s[a-zA-Z]+/i.test(inference.Name)) {
        this.command = {
          type: "command",
          cmd: "fetch",
          url: inference.Name.split(" ")[1]
        };
        return this.command;
      }

      const result = this.solveAttribute(value, inference);
      if (result) return result;
    }

    return false;
  }

  fireDoneEvent() {//this.publish('engine.done', this.knowledgebase.answers, this)
  }
  /**
   * Solves any mathematical expression
   * @param {*} expression Mathimatical expression nodes
   */


  solve(expression) {
    const builder = new Builder();
    const interpreter = new Interpreter();
    const ast = builder.build(expression);
    const result = interpreter.interpret(ast); // Math. + PI Random() Cos Sin TAN SQRT E

    return result;
  }
  /**
   * Compares left and right side of mathematical expression
   * @param {*} left Left hand side expression
   * @param {*} right Right hand side expression
   * @param {String} compare Comparator
   * @return {Boolean}
   */


  compare(left, right, compare) {
    switch (compare) {
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
  }

  mapNodes(tokens) {
    const nodes = []; //tokens.map(function (token) {

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]; // console.log(token);

      let value = token.value;

      if (token.type === "ATTR") {
        const attribute = this.knowledgebase.attributes[token.value.toLowerCase()];

        if (attribute) {
          if (!attribute.Value && this.knowledgebase.prompts[token.value.toLowerCase()]) {
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
  }

  evaluateCF(tokens) {
    // const confidences = []
    const values = tokens.map(token => {
      let cf = 100;

      if (token.type === "ATTR") {
        const attribute = this.knowledgebase.attributes[token.value.toLowerCase()];

        if (attribute) {
          if (attribute.CF) {
            cf = attribute.CF;
          }
        }
      }

      return cf;
    });
    return values;
  }

  prompt(name) {
    const _name = name.toLowerCase().trim();

    const prompt = this.knowledgebase.prompts[_name]; // console.log({ prompt, name });

    if (!prompt) {
      return this.raisePromptNotFoundError();
    }

    this.knowledgebase.prompts[_name].Fired = true;
    normalize(this.knowledgebase.prompts[_name]);
    this.knowledgebase.currentPrompt = this.knowledgebase.prompts[_name];
    this.knowledgebase.currentPrompt.Index = this.knowledgebase.promptIndex; //this.publish('engine.prompt', this.knowledgebase.currentPrompt)

    this.knowledgebase.promptIndex++; // console.log(this.knowledgebase.currentPrompt);

    return this.knowledgebase.currentPrompt;
  }

  cfPrompt() {
    const CF_TEXTS = this.CFSettings.CF_TEXTS; // ['Absolutely','Very high','High','Good','Fair'];

    const VALUES = this.CFSettings.VALUES; // [99,95,85,70,60];

    this.knowledgebase.currentPrompt.Label = "CF";
    this.knowledgebase.currentPrompt.Question = this.CFSettings.QUES; // ('How confident are you about your response?');

    this.knowledgebase.currentPrompt.Type = MENU; // MENU

    this.knowledgebase.currentPrompt.Min = 1;
    this.knowledgebase.currentPrompt.Max = 1;
    this.knowledgebase.currentPrompt.CFMode = false;
    this.knowledgebase.currentPrompt.Menu = [];

    for (let index = 0; index < CF_TEXTS.length; index++) {
      const menu = {
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


  setAttribute(value) {
    if (!this.knowledgebase.currentPrompt) {
      return this.raiseSessionExpiredError();
    }

    const validateResult = validator.validate(value, this.knowledgebase.currentPrompt);

    if (validateResult && validateResult.name === "ValidationError") {
      return validateResult;
    }

    let computedValue = multipleChoice(value, this.knowledgebase.currentPrompt);

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


  setAttributeCF(name, cf) {
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


  setAttributeValueAndCF(name, value, cf) {
    // alert( cf )
    const a = this.knowledgebase.attributes[name.toLowerCase().trim()];
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


  static inArray(array, value) {
    return array.includes(value.toLowerCase().trim());
  }
  /**
   * Test if an Object (value) is NOT in Array (array)
   * @param {Array} array The array containing elemets
   * @param {Object} value The value to check if it does not exist in array
   * @return false if array contains value else returns true
   */


  static notInArray(array, value) {
    return !array.includes(value.toLowerCase().trim());
  }

  getConditionCF() {
    let b = 100;
    this.knowledgebase.currentCondition.Confidences.forEach(function (d) {
      b = b * (d / 100);
    });
    return b;
  }

  run() {
    try {
      let data = this.start();
      return data;
    } catch (e) {
      return this.raiseScriptError(e);
    }
  }

  input(input) {
    try {
      // if (kb) this.setKnowledgebase(kb)
      let data = this.setAttribute(input); // console.log(data)

      return data;
    } catch (e) {
      return this.raiseScriptError(e);
    }
  }
  /**
   * Gets the Knowledgebase of the Engine
   * @return {JSON} Knowledgebase
   */


  getKnowledgebase() {
    return this.knowledgebase;
  }
  /**
   * Sets the knowledgebase for Inference Engine
   * @param {JSON} kb Knowledgebase data
   */


  setKnowledgebase(kb) {
    this.knowledgebase = kb; // this.knowledgebase.promptIndex = 1

    this.CFSettings = kb.keywords.prompts; // promptSettings[this.knowledgebase.language.toLowerCase()]

    this.keywords = kb.keywords.keywords; // keywords[kb.language.toLowerCase()]
    // this.validator = new Validator(kb.language)
  }

}

// import en from './locales/en'
// import fr from './locales/fr'
// import keywords from '../core/keywords'
class Translator {
  constructor(locale, languageModule) {
    this.languageModule = languageModule;
    this.keywords = languageModule[locale];
  }

  get(key) {
    const data = this.keywords.errors;

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


  format(text, ...args) {
    let msg = Object.assign({}, text);
    let index = 0;
    args.forEach(arg => {
      msg = msg.replace(`{${index}}`, arg);
      index++;
    });
    return msg;
  }
  /**
   * Translates code into appropriate target language
   * @param {*} code String that is unique to text being translated
   * @returns the Translater object
   */


  translate(code) {
    const data = this.get(code);
    return data;
  }
  /**
   * Translates plain test into target language
   * @param {*} text Text to be translated
   * @returns the Translater object
   */


  translatePlain(text, from = 'en') {
    if (!this.languageModule[from] || !this.languageModule[from].errors) {
      console.log(this.format('Language \'{0}\' not implemented', from));
      return text;
    }

    let source = this.languageModule[from].errors;
    const index = Object.values(source).find(v => {
      return v === text;
    });
    const code = Object.keys(source)[index];
    return this.translate(code);
  }
  /**
   * 
   * @param {String} code Error code to translate
   * @returns Translator object
   */


  to(code) {
    return this.translate(code);
  }

  toPlain(text, from) {
    return this.translatePlain(text, from);
  }

}

const en = {
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
  en
};

// import Translator from './translator'
// const translator = new Translator()
function CustomErrors(translator, lang = 'en') {
  return {
    CustomError: function (code) {
      const name = "Error";
      const message = translator.to(code, lang);
      return {
        message,
        code,
        name
      };
    },
    ValidationError: function (code) {
      let err = this.CustomError(code);
      err.name = 'ValidationError';
      return err;
    },
    SecurityError: function (code) {
      const err = this.CustomError(code);
      err.name = 'SecurityError';
      return err;
    },
    DatabaseError: function (code) {
      const err = this.CustomError(code);
      err.name = 'DatabaseError';
      return err;
    },
    NetworkError: function (code) {
      const err = this.CustomError(code);
      err.name = 'NetworkError';
      return err;
    },
    SyntaxError: function (code) {
      const err = this.CustomError(code);
      err.name = 'SyntaxError';
      return err;
    },
    ScriptError: function (code, e) {
      const err = this.CustomError(code);
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
  fr,
  de
};

const channels = {};
/**
 * Sigleton class to handle application wide events.
 */

const EventEmmiter = {
  subscribe(topic, listener) {
    // Create the topic's object if not yet created
    if (!channels.hasOwnProperty.call(channels, topic)) channels[topic] = []; // Add the listener to queue

    let index = channels[topic].push(listener) - 1; // Provide handle back for removal of topic

    return {
      remove: function () {
        //delete topics[topic][index]
        channels[topic].splice(index, 1);
      }
    };
  },

  unsubscribe(topic, listener) {
    // Create the topic's object if not yet created
    if (channels.hasOwnProperty.call(channels, topic)) {
      // Add the listener to queue
      let index = channels[topic].findIndex(l => l === listener); //delete topics[topic][index]

      channels[topic].splice(index, 1);
    }
  },

  publish(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!channels.hasOwnProperty.call(channels, topic)) return; // Cycle through topics queue, fire!

    channels[topic].forEach(item => {
      item(info != undefined ? info : {});
    });
  },

  remove(topic) {
    // channel is an array of listeners
    let channel = channels[topic];

    while (channel.length > 0) {
      channel.pop();
    }

    delete channels[topic];
  },

  destroy() {
    Object.keys(channels).forEach(topic => {
      this.remove(topic);
    });
    channels = {};
  }

};

/* jshint esversion:8*/
// Numbers
const Zero = /0/;
const DecInt = /[1-9][0-9]*/;
const OctalInt = /0[0-7]+/;
const HexInt = /0[xX][0-9a-fA-F]+/;
const Integer = '(?:' + Zero.source + '|' + DecInt.source + '|' + OctalInt.source + '|' + HexInt.source + ')[lL]?';
const Exponent = /[eE][+-]?[0-9]/;
const Float1 = '[0-9]+.[0-9]+(' + Exponent.source + ')?';
const Float2 = '.[0-9]+(' + Exponent.source + ')?';
const Float3 = '[0-9]+.' + Exponent.source;
const Float4 = '[0-9]+' + Exponent.source;
const Float = '(?:' + Float1 + '|' + Float2 + '|' + Float3 + '|' + Float4 + ')[fFdD]?|[0-9]+[fFDd]';
const Numeric = Float + '|' + Integer; // URL

const MATH_CONSTS = {
  E: 'Math.E',
  LN2: 'Math.LN2',
  LN10: 'Math.LN10',
  LOG2E: 'Math.LOG2E',
  LOG10E: 'Math.LOG10E',
  PI: 'Math.PI',
  SQRT1_2: 'Math.SQR1_2',
  SQRT2: 'Math.SQRT2'
};
const MATH_FUNCS = {
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

class Tokenizer$1 {
  constructor() {
    // this.language = language
    // this.Types = []
    // this.Keywords = Keywords[language]
    this.init();
  }

  get SpecialCharacters() {
    return [[LPAREN, '('], [RPAREN, ')'], [LBRACKET, '['], [RBRACKET, ']'], [CARRET, '^'], [TIMES, '*'], [MINUS, '-'], [PLUS, '+'], [DIV, '/'], [MOD, '%'], [EQ, '='], [GT, '>'], [LT, '<'], [COMMA, ','], [STRING, '"'], [LINE, '\n'], [EOF, '']];
  }

  init() {
    this.row = 0;
    this.col = 0;
  }

  tokenizeWord(input, current) {
    let consumedChars = 0;
    let value = '';
    let count = current;
    let char = input[current]; //test for alphabetic sequence

    do {
      value += char;
      consumedChars++;
      count++;
      char = input[count];
    } while (char && char.match(/[^*+-/^(),![\]\s]/i));

    if (consumedChars > 0) {
      let token = new Token(ATTR, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  }

  tokenizeString(input, current) {
    if (input[current] === '"') {
      let value = '"';
      let consumedChars = 1;
      let _col = this.col; //consumedChars ++;

      let char = input[current + consumedChars];

      while (char !== '"' && char !== undefined) {
        /*if(char === undefined) {//if production throw new TypeError("unterminated string ");}*/
        value += char;
        consumedChars++;
        char = input[current + consumedChars];
      }

      value += '"';
      return [consumedChars + 1, new Token(STRING, value, this.row, _col)]; // { type: 'string', value, row, col }];
    } else if (input[current] === '\'') {
      let value = '\'';
      let consumedChars = 1;
      let _col = this.col; //consumedChars ++;

      let char = input[current + consumedChars];

      while (char !== '\'' && char !== undefined) {
        /*if(char === undefined) {//if production throw new TypeError("unterminated string ");}*/
        value += char;
        consumedChars++;
        char = input[current + consumedChars];
      }

      value += '\'';
      return [consumedChars + 1, new Token(STRING, value, this.row, _col)]; // { type: 'string', value, row, col }];
    }

    return [0, null];
  }

  tokenizeNumber(input, current) {
    //Return a (multidigit) integer or float consumed from the input
    var result = '';
    let consumedChars = 0;
    let count = current;
    let token = null;

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
  }

  skipWhiteSpace(input, current) {
    var result = '';
    let consumedChars = 0;
    let count = current;
    let char = input[current];

    do {
      result += char;
      consumedChars++;
      count++;
      char = input[count];
    } while (char && char !== '\n' && char.match(/\s/));

    if (consumedChars > 0) {
      let token = new Token(SPACE, result, this.row, this.col);
      return [consumedChars, token];
    }

    return [0, null];
  }

  tokenizeComment(input, current) {
    if (input[current + 1] === '*') {
      let value = '';
      let count = current;
      let char = input[current];
      let consumedChars = 0;

      do {
        value += char;
        consumedChars++;
        count++;
        char = input[count];

        if (char === '\n') {
          this.col = 0;
          this.row++;
        } else if (char === '/' && value[value.length - 1] === '*') {
          value += char;
          consumedChars++;
          break;
        }
      } while (char);

      let token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    } else if (input[current + 1] === '/') {
      return this.tokenizeLineComment(input, current);
    }

    return [0, null];
  }

  tokenizeLineComment(input, current) {
    let char = input[current];
    let consumedChars = 0;

    if (input[current + 1] === '/') {
      let value = '';
      let count = current;

      do {
        value += char;
        consumedChars++;
        count++;
        char = input[count];
      } while (char && char !== '\n');

      let token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  }

  static flagComment(tokens) {
    let filtered = [];

    for (let index = 0; index < tokens.length; index++) {
      let token = tokens[index];

      if (token.type === DIV) {
        let next = tokens[index + 1];

        if (next) {
          let tk = Object.assign({}, token);
          let text = [];

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
  }

  static filterComment(tokens) {
    return tokens.filter(token => token.type !== REM && token.type !== COMMENT);
  }

  static filterSpace(tokens) {
    return tokens.filter(token => token.type !== SPACE);
  }

  static transform(tokens) {
    let transformed = [];

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (token.type === 'EOF') break;
      let phrase = [];

      if (token.type === ATTR) {
        let row = token.row;
        let col = token.column;

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

          let attr = phrase.join(' ');
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


  async tokenize(input) {
    this.row = 0;
    this.col = 0;
    let current = 0;
    let tokens = [];
    let [consumedChars, token] = [0, null]; // let mathConsts = Object.keys( MATH_CONSTS )
    // let mathFuncs = Object.keys( MATH_FUNCS )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        while (current < input.length) {
          let char = input[current];
          let tokenized = false;
          let found = this.SpecialCharacters.find(v => v[1] === char);

          switch (char) {
            case '\n':
              {
                tokens.push(new Token(LINE, char, this.row, this.col));
                current++;
                this.col = 0;
                this.row++;
                break;
              }

            default:
              if ('/' === char && (input[current + 1] === "*" || input[current + 1] === "/")) {
                let [chars, tk] = this.tokenizeComment(input, current);
                consumedChars = chars;
                token = tk;
              } else if ('"' === char) {
                let [chars, tk] = this.tokenizeString(input, current);
                consumedChars = chars;
                token = tk;
              } else if (found) {
                token = new Token(found[0], char, this.row, this.col);
                consumedChars = 1;
              } else if (RegExp(Numeric).test(char)) {
                //Number: tokenize number
                let [chars, tk] = this.tokenizeNumber(input, current);
                consumedChars = chars;
                token = tk;
              } else if (RegExp(/\s/).test(char)) {
                let [chars, tk] = this.skipWhiteSpace(input, current);
                consumedChars = chars;
                token = tk;
              } else if (RegExp(/[a-zA-Z]|\w/i).test(char)) {
                // let pattern = /[a-zA-Z]|\w/i
                let [chars, tk] = this.tokenizeWord(input, current);
                consumedChars = chars;
                token = tk;
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

        resolve(tokens);
      }, 100);
    }); // console.log( { tokens } )
    // return tokens
  }

}

const ParseToken = function ParseToken(self) {
  return {
    rule(token) {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE || self.prev === AND) {
        self.prev = RULE;
        const r = self.scanRule();
        EventEmmiter.publish("rule", [r, self.row], this);
        return true;
      }
    },

    if() {
      if (self.prev === RULE) {
        self.prev = IF;
        const p = self.scanPremise();
        if (!p) return;
        const {
          left,
          right,
          op
        } = p;
        EventEmmiter.publish("condition", [IF, left, right, self.row, op], this);
        return true;
      }
    },

    or() {
      if (self.prev === IF || self.prev === ELSEIF || self.prev === OR || self.prev === AND) {
        self.prev = OR;
        const p = self.scanPremise();
        if (!p) return;
        const {
          left,
          right,
          op
        } = p;
        EventEmmiter.publish("premise", [OR, left, right, self.row, op], this);
        return true;
      }
    },

    and() {
      if (self.prev === IF || self.prev === ELSEIF || self.prev === THEN || self.prev === ELSE || self.prev === AND) {
        self.prev = AND;

        if (self.prev === THEN) {
          const p = self.scanInference();
          if (!p) return;
          const {
            name,
            right
          } = p;
          EventEmmiter.publish("inference", [name, right, false, self.row], this);
          return true;
        } else if (self.prev === ELSE) {
          const p = self.scanInference();
          if (!p) return;
          const {
            name,
            right
          } = p;
          EventEmmiter.publish("inference", [name, right, false, self.row], this);
          return true;
        } else {
          const p = self.scanPremise();
          if (!p) return;
          const {
            left,
            right,
            op
          } = p;
          EventEmmiter.publish("premise", [AND, left, right, self.row, op], this);
          return true;
        }
      }
    },

    then(token) {
      // console.log(self.prev, token)
      if (self.prev === IF || self.prev === ELSEIF || self.prev === OR || self.prev === AND) {
        self.prev = THEN;
        const p = self.scanInference();
        if (!p) return false;
        const {
          name,
          right
        } = p;
        EventEmmiter.publish("inference", [name, right, false, self.row], this);
        return true;
      }
    },

    elseif(token) {
      if (self.prev === THEN || self.prev === AND || self.prev === ELSE) {
        self.prev = ELSEIF; // console.log(token)

        const p = self.scanPremise();
        if (!p) return;
        const {
          left,
          right,
          op
        } = p;
        EventEmmiter.publish("condition", [ELSEIF, left, right, self.row, op], this);
        return true;
      }
    },

    else() {
      if (self.prev === THEN || self.prev === AND) {
        self.prev = ELSE;
        const f = self.scanInference();
        if (!f) return;
        const {
          name,
          right
        } = f;
        EventEmmiter.publish("inference", [name, right, true, self.row], this);
        return true;
      }
    },

    prompt() {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
        self.prev = PROMPT;
        const p = self.scanPrompt();
        EventEmmiter.publish("prompt", [p, self.row], this);
        return true;
      }
    },

    question() {
      if (self.prev === PROMPT) {
        self.prev = QUESTION;
        const q = self.scanQuestion();
        EventEmmiter.publish("question", [q, self.row], this);
        return true;
      }
    },

    menu() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        const m = self.scanMenu();
        EventEmmiter.publish("menu", [m, self.row], this);
        return this;
      }
    },

    digit() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanDigit();
        EventEmmiter.publish("digit", [self.row], this);
        return true;
      }
    },

    text() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanText();
        EventEmmiter.publish("text", [self.row], this);
        return true;
      }
    },

    yes() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanYesNo();
        EventEmmiter.publish("yes-no", [self.row], this);
        return true;
      }
    },

    true() {
      if (self.prev === QUESTION) {
        self.prev = MENU;
        self.scanTrueFalse();
        EventEmmiter.publish("true-false", [self.row], this);
        return true;
      }
    },

    min() {
      if (self.prev === MENU) {
        const min = self.scanMin(); // self.pos--

        if (min) {
          EventEmmiter.publish("min", [min, self.row], this);
        }

        return true;
      }
    },

    max() {
      if (self.prev === MENU) {
        const max = self.scanMax(); // self.pos--

        if (max) {
          EventEmmiter.publish("max", [max, self.row], this);
        }

        return true;
      }
    },

    cf() {
      if (self.prev === MENU) {
        EventEmmiter.publish("cf", [self.row], this);
        return true;
      }
    },

    mod() {
      if (self.prev === MENU) {
        EventEmmiter.publish("cf", [self.row], this);
        return true;
      }
    },

    attribute() {
      const attribute = self.scanAttribute();
      EventEmmiter.publish("attribute", [attribute, self.row], this);
      return true;
    },

    goal(token) {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
        if (self.lastToken.type === LINE) {
          const goal = self.scanGoal();

          if (goal) {
            EventEmmiter.publish("goal", [goal, self.row], this);
          }

          return true;
        }
      }
    },

    array() {
      if (self.prev === null || self.prev === MENU || self.prev === THEN || self.prev === ELSE) {
        const array = self.scanArray();
        EventEmmiter.publish("array", [array, self.row], this);
        return true;
      }
    },

    title() {
      if (self.prev === null) {
        const title = self.scanTitle();
        EventEmmiter.publish("title", [title, self.row], this);
        return true;
      }
    },

    summary() {
      if (self.prev === null) {
        const summary = self.scanSummary();
        EventEmmiter.publish("summary", [summary, self.row], this);
        return true;
      }
    },

    line() {
      EventEmmiter.publish("line", [self.row], this);
      return true;
    },

    eof() {
      // End of file
      EventEmmiter.publish("eof", [self.row], this);
      return true;
    },

    error(token) {
      self.error("Unknown character or token: " + token.value, token);
      return true;
    }

  };
};

/* jshint esversion:8 */
/**
 * Laguage grammar parser. Parser is language neutral, 
 * it does not know in which language the rules are written
 */

class Parser {
  /**
    * Constructor 
    */
  constructor(language, languageModule) {
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

  get Event() {
    return super.prototype;
  }

  get Data() {
    return this.data;
  }

  get Error() {
    return this.errors;
  }

  init() {
    this.row = 0;
    this.col = 0;
    this.errors = [];
    this.attributes = {}, this.prompts = {}, this.inferences = [];
    this.knowledgebase = null;
    this.data = null;
    this.tokens = [];
  }

  matchCloseParenthesis(tokens, startIndex) {
    let $return = -1;
    let left = 0;
    let right = 0;

    for (let i = startIndex; i < tokens.length; i++) {
      const s = tokens[i].value;

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
  }

  matchOpenParenthesis(tokens, startIndex) {
    let $return = -1;
    let left = 0;
    let right = 0;

    for (let i = startIndex; i >= 0; i--) {
      const s = tokens[i].value;

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
  }

  matchParenthesis(tokens) {
    if (!tokens) return;
    this.matchBrackets(tokens);
    const open = '(';
    const close = ')';
    const opens = [];
    const closes = [];

    for (let i = 0; i < tokens.length; i++) {
      const c = tokens[i].value;

      if (c === open) {
        opens.push([i, c]);
      } else if (c === close) {
        closes.push([i, c]);
      }
    }

    for (let i = opens.length - 1; i >= 0; i--) {
      const match = this.matchCloseParenthesis(tokens, opens[i][0]);

      if (match === -1) {
        const msg = 'Open parenthesis \'{0}\' at column {1} has no close parenthesis';
        this.error(msg);
        break;
      }
    }

    for (let i = 0; i < closes.length; i++) {
      // let c = closes[i][1];
      const index = closes[i][0];
      const match = this.matchOpenParenthesis(tokens, index);

      if (match === -1) {
        const msg = 'Close parenthesis \'{0}\' at column {1} has no opening parenthesis';
        this.error(msg);
        break;
      }
    }
  }

  matchCloseBracket(tokens, startIndex) {
    let $return = -1;
    let left = 0;
    let right = 0;

    for (let i = startIndex; i < tokens.length; i++) {
      const s = tokens[i].value;

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
  }

  matchOpenBracket(tokens, startIndex) {
    let $return = -1;
    let left = 0;
    let right = 0;

    for (let i = startIndex; i >= 0; i--) {
      const s = tokens[i].value;

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
  }

  matchBrackets(tokens) {
    if (!tokens) return;
    const open = '[';
    const close = ']';
    const opens = [];
    const closes = [];

    for (let i = 0; i < tokens.length; i++) {
      const c = tokens[i].value;

      if (c === open) {
        opens.push([i, c]);
      } else if (c === close) {
        closes.push([i, c]);
      }
    }

    for (let i = opens.length - 1; i >= 0; i--) {
      const match = this.matchCloseBracket(tokens, opens[i][0]);

      if (match === -1) {
        const msg = 'Open bracket \'{0}\' at column {1} has no close bracket';
        this.error(msg);
        break;
      }
    }

    for (let i = 0; i < closes.length; i++) {
      const index = closes[i][0];
      const match = this.matchOpenBracket(tokens, index);

      if (match === -1) {
        const msg = 'Close bracket \'{0}\' at column {1} has no opening bracket';
        this.error(msg);
        break;
      }
    }
  }

  matchDuplicateOperator(token) {
    if (!token) return;

    if (token.value.toString().match(/[+\-*/]/)) {
      const next = this.peek();

      if (next && next.value.toString().match(/[+\-*/]/)) {
        this.error('Duplicate operator ' + token.value + ' ' + next.value, token);
        return;
      }
    }
  }

  readToEndOfLine() {
    const tokens = [];
    let peek = null;

    do {
      peek = this.peek();
      let token = this.tokens[this.pos];
      tokens.push(token);
      this.advance();
    } while (peek && peek.type !== LINE && peek.type !== EOF);

    const text = tokens.map(t => t.value);

    if (!text || text.length === 0) {
      return null;
    }

    return text.join(' ');
  }

  scanRule() {
    const text = this.scanDefinition(RULE);

    if (!text || text.length === 0) {
      return this.error('Rule should have description');
    }

    return text;
  }

  scanDefinition(type, name) {
    let token = this.peek(type);
    if (token) this.eat(type);
    return this.readToEndOfLine();
  }

  scanTitle() {
    const text = this.scanDefinition(TITLE, this.keywords.TITLE);

    if (!text || text.length === 0) {
      return this.error('Title should have description');
    }

    return text;
  }

  scanSummary() {
    const text = this.scanDefinition(SUMMARY, this.keywords.SUMMARY);

    if (!text || text.length === 0) {
      return this.error('Summary should have description');
    }

    return text;
  }

  scanQuestion() {
    const text = this.scanDefinition(QUESTION, this.keywords.QUESTION);

    if (!text || text.length === 0) {
      return this.error('Question should have a statement');
    }

    return text;
  }

  scanAttribute() {
    // then attribute equal expression
    this.eat(ATTRIBUTE);
    const left = this.eat(ATTR);

    if (!left) {
      return this.error('Attribute definition should have Attribute Name');
    }

    const equal = this.eat(EQ);

    if (!equal) {
      return this.error('Expected =');
    }

    const right = this.rightNode();

    if (right.type === EOF) {
      return this.error('Expected expression but found end of file', right);
    } else if (right.type === LINE) {
      return this.error('Expected expression but found new line', right);
    }

    this.matchParenthesis(left);
    this.matchParenthesis(right);
    const rt = right.map(n => n.value);
    this.assignGlobal(left.value, rt.join(' '), right[0].row, right[0].column, true);
    return [left.value, right];
  }

  scanArray() {
    const node = this.eat(ARRAY);

    if (!node) {
      return this.error('Expected array name');
    }

    const equal = this.eat(EQ);

    if (!equal) {
      return this.error('Expected =');
    } // let token=null;


    const tokens = [];
    const lparen = this.eat(LPAREN);

    if (!lparen) {
      return this.error('Expected (');
    } // tokens.push(lparen);


    while (this.peek() && this.peek().type !== LINE && this.peek().type !== EOF) {
      let token = this.tokens[this.pos];

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

    const rparen = tokens.pop();

    if (rparen && rparen.type !== RPAREN) {
      return this.error('Expected ) but found new line');
    }

    this.assignGlobal(node.value, node.value, node.row, node.column);
    return [node, tokens, ARRAY];
  }

  scanGoal() {
    // this.eat(GOAL)
    const text = this.scanDefinition(GOAL);

    if (!text || text.length === 0) {
      return this.error('Goal definition should have texts');
    }

    return text;
  }

  scanPrompt() {
    // this.eat(PROMPT)
    const prompt = this.scanDefinition(PROMPT); // this.eat(ATTR)

    if (!prompt || prompt.length === 0) {
      return this.error('Prompt definition should have texts');
    }

    this.prompts[prompt.toLowerCase()] = prompt;
    return prompt;
  }

  scanMenu() {
    this.eat(MENU);
    const tokens = [];
    const lparen = this.eat(LPAREN);

    if (!lparen) {
      return this.error('Expected (');
    }

    let token = this.tokens[this.pos];

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

    const menu = tokens.map(m => m.value);
    return menu;
  }

  scanYesNo() {
    // let next = this.peek()
    this.eat(YES); // if (next && next.type === COMMA) {

    this.eat(COMMA); // }

    this.eat(NO);
  }

  scanTrueFalse() {
    // let next = this.peek()
    this.eat(TRUE); // if (next && next.type === COMMA) {

    this.eat(COMMA); // }

    this.eat(FALSE);
  }

  scanDigit() {
    this.eat(DIGIT);
  }

  scanText() {
    this.eat(TEXT);
  }

  scanMin() {
    this.eat(MIN);
    const min = this.eat(NUM);
    return min;
  }

  scanMax() {
    this.eat(MAX);
    const max = this.eat(NUM);
    return max;
  }

  scanCF() {
    if (this.peek() && this.peek().type === this.CF) {
      this.advance();
      cf = true;
    }

    if (this.peek() && this.peek().type !== LINE) {
      this.error('Expected end of line but found ' + this.peek().value);
    }
  }

  scanInference() {
    this.advance();
    const name = this.leftAttribute();
    let right = null;
    let nextToken = this.taste();
    let comparator = nextToken;

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

    let _right = Object.assign({}, name);

    if (!right) {
      _right.type = TRUE;
      _right.value = this.keywords[TRUE];
    }

    if (!right) right = [_right];
    return {
      name,
      right
    };
  }

  scanPremise() {
    this.advance();
    const left = this.leftNode();
    let nextToken = this.taste();
    let comparator = nextToken;

    if (!comparator) {
      return this.error('Expected expression but found end of line');
    }

    this.matchParenthesis(left);
    let comp = null;
    let right = [];

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


    left.forEach(token => {
      if (token.type === ATTR) {
        if (!this.attributes[token.value.toLocaleLowerCase()]) {
          this.assignGlobal(token.value, null, token.row, token.column);
        }
      }
    });

    if (!right || right.length === 0) {
      let _right = Object.assign({}, {});

      _right.type = TRUE;
      _right.value = this.keywords[TRUE];
      right = [_right];
    }

    if (!comp) comp = EQ;
    return {
      left,
      right,
      op: comp
    };
  }

  peek() {
    const peek_pos = this.pos + 1;

    if (peek_pos > this.tokens.length - 1) {
      return null;
    }

    return this.tokens[peek_pos];
  }

  trace() {
    const trace_pos = this.pos - 1;

    if (trace_pos < 0) {
      return null;
    }

    return this.tokens[trace_pos];
  }

  taste() {
    const token = this.tokens[this.pos];
    return token;
  }

  eat(type) {
    const token = this.tokens[this.pos];

    if (token) {
      if (token.type === type) {
        this.advance();
        return token;
      } else {
        return this.error('Expected ' + type + ' but found ' + token.type);
      }
    }

    return this.error('Expected ' + type + ' but found end of line');
  }

  advance() {
    this.pos++;
  }

  rightNode() {
    const result = [];
    let token = this.tokens[this.pos];

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
  }

  leftNode() {
    const result = [];
    let token = this.tokens[this.pos];

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
  }

  leftAttribute() {
    const token = this.eat(ATTR);

    if (!token) {
      return this.error('Expected attribute');
    }

    this.inferences[token.value.toLocaleLowerCase()] = token;
    return token; // may never be reached
  }

  comparator() {
    const token = this.tokens[this.pos];

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
  }

  assignGlobal(name, value, row, col, inf) {
    this.attributes[name.toLocaleLowerCase()] = {
      name: name,
      value: value,
      row: row,
      col: col
    };

    if (inf) {
      this.inferences[name.toLocaleLowerCase()] = name;
    }
  }

  checkVarableDeclarations() {
    Object.keys(this.attributes).forEach(k => {
      const a = this.attributes[k];

      if (!(this.inferences[k] || this.prompts[k])) {
        this.warn('No input prompt for attribute ' + k, a); // console.log(this.inferences, this.prompts)
      }
    });
  }

  warn(msg, token) {
    const w = {
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
  }

  error(msg, token) {
    const e = {
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
  }

  info(msg, token) {
    const i = {
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
  }

  isKeyword(word, index, tokens) {
    const token = index > 0 ? tokens[index - 1] : null;
    const prev = token ? token.type : null;
    const history = index > 1 ? tokens[index - 2].type : null;

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
  }

  filterKeywords() {
    let tokens = [];
    let prevToken = null;

    for (let i = 0; i < this.tokens.length; i++) {
      let token = this.tokens[i];

      if (token.type === ATTR) {
        //let found = this.keyValues.findIndex(v => v.toUpperCase() === token.value.toUpperCase())
        let key = this.keyMap.find(k => this.keywords[k].toUpperCase && this.keywords[k].toUpperCase() === token.value.toUpperCase());

        if (key) {
          const isKeyword = this.isKeyword(key, i, tokens);

          if (isKeyword) {
            let tk = Object.assign({}, token);
            tk.type = key;

            if (prevToken && prevToken.type === ELSE && key === IF) {
              tokens[i - 1].value += ' ' + tk.value;
              tokens[i - 1].type = ELSEIF;
              prevToken = token;
              tokens.push(null);
              continue;
            } else {
              token = tk;
            }

            tokens.push(tk);
            continue;
          }
        }
      }

      tokens.push(token);
      prevToken = token; // history.unshift(Object.assign({}, token))
      // if (history.length > 2) history.pop()
    }

    this.tokens = tokens; // console.log(tokens)
  }

  transform() {
    let transformed = [];
    this.filterKeywords();

    for (let i = 0; i < this.tokens.length; i++) {
      let token = this.tokens[i];
      if (token.type === EOF) break;
      let phrase = [];

      if (token.type === ATTR) {
        let row = token.row;
        let col = token.column;

        do {
          phrase.push(token.value);
          i++;
          token = this.tokens[i];
        } while (token && (token.type === ATTR || token.type == NUM));

        let attr = phrase.join(' ');
        transformed.push({
          type: ATTR,
          value: attr,
          row: row,
          column: col
        });
        i--; // Go back to last token (tokens[i])
      } else if (token.type === ELSE && this.tokens[i + 1] && this.tokens[i + 1].type === IF) {
        let next = this.tokens[i + 1];
        let t = Object.assign({}, token);
        t.type = ELSEIF;
        t.value = t.value + ' ' + next.value;
        transformed.push(t);
        i++; // Skip the next Token (IF)
      } else {
        transformed.push(token);
      }
    }

    this.tokens = transformed;
  }

  applyMaths() {
    let _tokens = [];

    for (let i = 0; i < this.tokens.length; i++) {
      let math = null;
      let current = this.tokens[i];
      const t = this.tokens[i + 1];

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

    let finalTokens = [];

    for (let i = 0; i < _tokens.length; i++) {
      let math = null;
      let current = _tokens[i];
      const t = _tokens[i + 1];
      const nextToken = _tokens[i + 2];

      if ((current.type === ATTR || current.type === NUM || current.type === CONST) && (t.type === LPAREN || t.type === LBRACKET)) {
        finalTokens.push(current);
        let key = this.keyMap.find(k => this.keywords[k].toUpperCase() === current.value.toUpperCase());

        if (!key) {
          math = Object.assign({}, current);
          math.type = TIMES;
          math.value = '*'; // finalTokens.push(current)

          finalTokens.push(math);
        }
      } else if (nextToken && (nextToken.type === ATTR || nextToken.type === NUM || nextToken.type === CONST) && (current.type === ATTR || current.type === NUM || current.type === CONST) && t.type === CARRET) {
        let pow = Object.assign({}, current);
        pow.type = 'FUNC';
        pow.value = 'pow';
        let paren = Object.assign({}, current);
        paren.type = LPAREN;
        paren.value = '(';
        let rparen = Object.assign({}, current);
        rparen.type = RPAREN;
        rparen.value = ')';
        let comma = Object.assign({}, current);
        comma.type = COMMA;
        comma.value = ',';
        finalTokens.push(pow);
        finalTokens.push(paren);
        finalTokens.push(current);
        finalTokens.push(comma);
        finalTokens.push(nextToken);
        finalTokens.push(rparen);
        i++;
        i++;
      } else {
        finalTokens.push(current);
      }
    }

    this.tokens = finalTokens;
  }

  filterComment() {
    return this.tokens.filter(token => token.type !== REM && token.type !== COMMENT);
  }
  /**
     * Recursively go through tokens and emmit events using implementation of
     * Finite State Machine (FST)
     * @param {JSON} tokens 
     * @returns { Promise<Object> } errors if any including warning and info
     */


  async parse(text) {
    var _this = this;

    return new Promise(async function (resolve, reject) {
      _this.init();

      _this.pos = 0;
      let tokenizer = new Tokenizer$1();
      let tokens = await tokenizer.tokenize(text);
      setTimeout(() => {
        _this.tokens = tokens.filter(token => token.type !== SPACE && token.type !== REM);

        _this.applyMaths();

        _this.transform();

        _this.prev = null;
        _this.lastToken = null;

        for (_this.pos = 0; _this.pos < _this.tokens.length; _this.pos++) {
          const token = _this.tokens[_this.pos];
          _this.lastToken = _this.tokens[_this.pos > 0 ? _this.pos - 1 : 0];
          _this.row = token.row;
          _this.col = token.column;
          const type = token.type;

          if (type === REM || type === COMMENT) {
            continue;
          }

          const action = _this.parseToken[type.toLowerCase()];

          if (action) {
            // call the method to parse token
            const result = _this.parseToken[type.toLowerCase()](token);

            if (!result) {
              _this.error('Invalid keyword: ' + token.value);
            }
          } else {
            _this.error('Invalid token or keyword: ' + token.value, token);
          }
        }

        _this.checkVarableDeclarations(); // pubsub.publish('data', { errors: this.errors, data: this.tokens })


        EventEmmiter.publish('done', {
          errors: _this.errors,
          data: _this.tokens
        });

        if (_this.errors.length > 0) {
          // console.log(this.tokens, this.errors, this.keywords)
          resolve(_this.errors); // 
        } else {
          resolve([]);
        }
      }, 100);
    });
  }

}

// import CustomEvent from './events.js'
class Tokenizer {
  constructor() {
    this.row = 0;
    this.col = 0;
    this.errors = [];
  }

  get Data() {
    return this.data;
  }

  get Error() {
    return this.errors;
  }

  error(msg, token, flag = 'error') {
    const e = {
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
  }

  tokenizeNumber(input, current) {
    //Return a (multidigit) integer or float consumed from the input
    var result = '';
    let consumedChars = 0;
    let count = current;
    let char = input[current];

    do {
      result += char;
      consumedChars++;
      count++;
      char = input[count];
    } while (char && char.toString().match(/[0-9]/));

    if (consumedChars > 0) {
      let token = [consumedChars, new Token(NUM, Number(result), this.row, this.col)];
      return token;
    }

    return [0, null];
  }

  skipWhiteSpace(input, current) {
    var result = '';
    let consumedChars = 0;
    let count = current;
    let char = input[current];

    do {
      result += char;
      consumedChars++;
      count++;
      char = input[count];
    } while (char && char !== '\n' && char.match(/\s/));

    if (consumedChars > 0) {
      let token = [consumedChars, new Token(SPACE, result, this.row, this.col)];
      return token;
    }

    return [0, null];
  }

  tokenizeWord(input, current) {
    let consumedChars = 0;
    let value = '';
    let count = current;
    let char = input[current]; //test for alphabetic sequence

    do {
      value += char;
      consumedChars++;
      count++;
      char = input[count];
    } while (char && char !== "\n" && char !== " " && char !== "=" && char !== ":");

    if (consumedChars > 0) {
      let token = new Token(ATTR, value, this.row, this.col); // console.log([consumedChars, token])

      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  }

  tokenizeBlockCommentXXX(input, current) {
    if (input[current + 1] === '*') {
      let value = '';
      let count = current;
      let char = input[current];
      let consumedChars = 0;

      do {
        value += char;
        consumedChars++;
        count++;
        char = input[count];

        if (char === '\n') {
          this.col = 0;
          this.row++;
        } else if (char === '/' && value[value.length - 1] === '*') {
          value += char;
          consumedChars++;
          break;
        }
      } while (char);

      let token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    } else if (input[current + 1] === '/') {
      return this.tokenizeLineComment(input, current);
    }

    return [0, null];
  }

  tokenizeComment(input, current) {
    let char = input[current];
    let consumedChars = 0;

    if (input[current + 1] === '/') {
      let value = '';
      let count = current;

      do {
        value += char;
        consumedChars++;
        count++;
        char = input[count];
      } while (char && char !== '\n');

      let token = new Token(REM, value, this.row, this.col);
      return [consumedChars, token]; // { type, value, row, _col }];
    }

    return [0, null];
  }

  tokenize(input) {
    this.row = 0;
    this.col = 0;
    let current = 0;
    let tokens = [];

    while (current < input.length) {
      let char = input[current];
      let [consumedChars, token] = [0, null];
      let tokenized = false;

      switch (char) {
        case "{":
          {
            tokens.push(new Token(LPAREN, char, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case "}":
          {
            tokens.push(new Token(RPAREN, char, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case "=":
          {
            // case ":": {
            tokens.push(new Token(EQ, char, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case ":":
          {
            tokens.push(new Token(COLON, char, this.row, this.col));
            current++;
            this.col++;
            break;
          }

        case "\n":
          {
            tokens.push(new Token(LINE, char, this.row, this.col));
            current++;
            this.col = 0;
            this.row++;
            break;
          }

        default:
          if (RegExp(/[0-9]/).test(char)) {
            //Number: tokenize number
            let [chars, tk] = this.tokenizeNumber(input, current);
            consumedChars = chars;
            token = tk;
          } else if (RegExp(/\s/).test(char)) {
            let [chars, tk] = this.skipWhiteSpace(input, current);
            consumedChars = chars;
            token = tk;
          } else if ("/" === char) {
            let [chars, tk] = this.tokenizeComment(input, current);
            consumedChars = chars;
            token = tk;
          } else if (RegExp(/[a-zA-Z]/).test(char)) {
            let pattern = /[a-zA-Z]/;
            let [chars, tk] = this.tokenizeWord(input, current, pattern);
            consumedChars = chars;
            token = tk;
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
  }

}

const editText = `
    full name: Anthony Abah
    street address: 23 Oshipitan Storage Event
    phone: 0989765655456
    phone: 89646464644646
    work email abah.a@nafdac.gov.ng:
    your message: Please come to {0} Adeleye Street, 1} Ladilak
  `;

function ResourceParser(lang, languageModule) {
  var errors = [];
  var data = {}; // const row = 0;

  function error(data, flag = "error") {
    const e = {
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
    let transformed = [];

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (token.type === "EOF") break;
      let phrase = [];

      if (token.type === ATTR) {
        let row = token.row;
        let col = token.column;

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
          if (phrase[phrase.length - 1] === " ") {
            phrase.pop();
            i--;
          }

          let attr = phrase.join(" ");
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

  function eatLeft(tokens, index) {
    let token = tokens[index];

    if (token.type === LPAREN) {
      index++;
      return index;
    }

    return index;
  }

  function eatRight(tokens, index) {
    let token = tokens[index];

    if (token && token.type === RPAREN) {
      index++;
      return index;
    }

    if (!token) {
      token = tokens[index - 1];
    }

    let msg = "Expected '}' at row: " + token.row + " col:" + token.column + " but found '" + tokens.map(t => t.value).join("") + "'";
    error({
      row,
      col: token.column,
      msg: msg,
      raw: tokens.map(t => t.value).join(""),
      params: []
    });
    return index;
  }

  function eatNumber(tokens, index) {
    let token = tokens[index];

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

    let msg = "Integer expected at row: " + token.row + " col: " + token.column + " but found '" + token.value + "'";
    " in" + tokens.map(t => t.value).join(""); // error(msg, token);

    error({
      row,
      col: token.column,
      msg: msg,
      raw: tokens.map(t => t.value).join(""),
      params: []
    });
    return index;
  }

  function checkParam(line) {

    for (let i = 0; i < line.length; i++) {
      let token = line[i]; // console.log({token})

      if (token.type === LPAREN) {
        i = eatLeft(line, i);
        i = eatNumber(line, i);
        i = eatRight(line, i);
      } else if (token.type === RPAREN) {
        // No opening parenthesis
        let msg = "'}' at " + token.row + " col: " + token.column + " has no matching opening parenthesis "; // error(msg, token);

        error({
          row,
          col: token.column,
          msg: msg,
          raw: line.map(v => v.value).join(""),
          params: []
        });
      }
    }
  }

  function tokenize(text) {
    let tokenizer = new Tokenizer();
    let raw = tokenizer.tokenize(text);
    let tokens = transform(raw);
    return tokens;
  }

  function parseLine(line, formattedLine, row) {
    let tokens = tokenize(line);
    let assign = tokens.find(t => t.type === COLON || t.type === EQ); // console.log(assign.column, formattedLine.length);

    if (!assign) {
      error({
        row,
        col: tokens[0].column,
        msg: formattedLine + " is not assigned",
        raw: formattedLine,
        params: []
      });
    } else if (assign.column === 0) {
      error({
        row,
        col: assign.column,
        msg: "No data key at row " + row,
        raw: formattedLine,
        params: []
      });
    } else if (assign.column >= formattedLine.length - 1) {
      error({
        row,
        col: assign.column,
        msg: "No data value at row " + row,
        raw: formattedLine,
        params: []
      });
    } // let assignIndex = tokens.indexOf(":");
    // if (assignIndex < 0) assignIndex = tokens.indexOf("=");
    // let lineParts = line.split(":");


    let leftTokens = tokens.filter(t => t.column <= assign.column); // substring(0, assignIndex); // lineParts[0];

    checkParam(leftTokens);
    let rightTokens = tokens.filter(t => t.column >= assign.column);
    checkParam(rightTokens);
    const key = leftTokens.map(token => token.value).join("");

    if (data[key]) {
      error({
        row,
        col: token.column,
        msg: "Cannot add data key '" + key + "' because it already exists",
        raw: formattedLine,
        params: [key]
      });
    }

    const value = rightTokens.map(token => token.value).join("");
    data[key] = value.trim();
  }

  function parse(text) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        data = {};
        errors = [];
        const lines = text.split("\n");
        if (lines.length === 0) return;

        for (let row = 0; row < lines.length; row++) {
          let line = lines[row];
          let formattedLine = line.trim();
          if (formattedLine.length === 0) continue;
          if (formattedLine.indexOf("//") === 0) continue;

          try {
            parseLine(line, formattedLine, row);
          } catch (e) {
            console.log(e.message);
          }
        }

        resolve(errors);
      }, 0);
    });
  }

  function compile(text) {
    return new Promise(resolve => {
      setTimeout(async () => {
        await this.parse(text); // this.emit("data", { errors: errors, data: this.data });
        // data.languageModule = languageModule;

        resolve(data);
      }, 0);
    });
  }

  return {
    data,
    errors,
    parse,
    compile,
    test: function () {
      this.compile(editText).then(data => {
        console.log({
          data,
          errors
        });
      });
    }
  };
} // ResourceParser("en", []).test();

class Prompt {
  constructor(name) {
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
  }

}
/* export function normalize(prompt) {
  switch (prompt.Type) {
    case Constants.MENU:
      if (!prompt.Max) prompt.Max = prompt.Menu.length
      if (!prompt.Min) prompt.Min = 1
      prompt.Min = prompt.Min < 1 ? 1 : prompt.Min
      prompt.Max =
        prompt.Max > prompt.Menu.length ? prompt.Menu.length : prompt.Max
      //delete MAX_CHARS // MAX_CHARS=null;
      if (!prompt.Max) prompt.Max = 1
      break
    case Constants.TEXT:
    case Constants.VALUE:
      if (!prompt.Max) prompt.Max = MAX_CHARS
      if (!prompt.Min) prompt.Min = 1
      prompt.Min = prompt.Min < 1 ? 1 : prompt.Min
      prompt.Max =
        prompt.Max > MAX_CHARS ? MAX_CHARS : prompt.Max
      break
    case Constants.TF:
    case Constants.YN:
      prompt.Min = 1
      prompt.Max = 1
      //delete MAX_CHARS // MAX_CHARS=null;
      break
    default:
      if (!prompt.Max) prompt.Max = Number.MAX_VALUE
      if (!prompt.Min) prompt.Min = Number.MIN_VALUE
      prompt.Min =
        prompt.Min < Number.MIN_VALUE ? Number.MIN_VALUE : prompt.Min
      prompt.Max =
        prompt.Max > Number.MAX_VALUE ? Number.MAX_VALUE : prompt.Max

      //delete MAX_CHARS // p.MAX_CHARS=0;
      break
  }
 // delete prompt.__proto__
}*/

class Attribute {
  constructor(name) {
    this.Name = name;
    this.Line = 0;
    this.CF = 100;
    this.Value = null;
  }

}

class Inference extends Attribute {
  constructor(name) {
    super(name);
    this.Action = null;
  }

}

class Goal extends Attribute {
  constructor(name) {
    super(name);
  }

}

class Condition {
  constructor() {
    this.Inferences = [];
    this.Confidences = [];
    this.Premises = [];
    this.isMet = false;
  }

  static getCF(condition) {
    let cf = 100;
    condition.confidences.forEach(v => {
      cf = v / 100 * cf;
    });
    return cf;
  }

}

class Statement {
  constructor(lineIndex) {
    this.line = lineIndex || 0;
    this.Index = 0;
    this.Keyword = null;
    this.Left = null;
    this.Right = null;
    this.Comparator = null;
  }

}

const characters = ['@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
class Menu {
  constructor(index, name, value) {
    this.Index = index;
    this.Name = name;
    this.Value = value;
    this.Letter = characters[index]; // this.Text=displayText||value;

    this.Line = 0;
  }

}

class Rule {
  constructor(name) {
    this.Name = name;
    this.Fired = false;
    this.Texts = [];
    this.Line = 0;
    this.Index = 0;
    this.AltInferences = [];
    this.Conditions = [];
  }

  addLine(line) {
    this.Texts.push(line);
  }

}

class KnowledgebaseCompiler extends Parser {
  /**
   * Constructor
   * @param {String} language User language [en, fr, es, nl, de, po, ru]
   */
  constructor(language, languageModule) {
    super(language, languageModule);
    this.language = language;
    this.languageModule = languageModule;
    this.keywords = this.languageModule.keywords;
    this.title = "";
    this.summary = "";
    this.delimiter = " ";
    this.activePrompt = null;
    this.arrays = {};
    this.objects = {};
    this.goals = {};
    this.prompts = {};
    this.attributes = {};
    this.firedRules = {};
    this.answers = [];
    this.rules = [];
    this.subscriptions = [];
    this.attachListeners();
  }

  subscribe(topic, listener) {
    this.subscriptions.push(EventEmmiter.subscribe(topic, listener));
  }

  unsubscribe() {
    this.subscriptions.forEach(subscription => subscription.remove());
  }

  attachListeners() {
    this.subscribe("rule", data => this.addRule(data[0], data[1]));
    this.subscribe("inference", data => {
      let [name, right, alt, row] = data;
      this.addInference(name.value, right, alt, row);
    });
    this.subscribe("premise", data => {
      let [keyword, left, right, row, op] = data;
      return this.addPremise(keyword, left, right, op, row);
    });
    this.subscribe("condition", data => {
      let [keyword, left, right, row, op] = data;
      return this.addCondition(keyword, left, right, op, row // data[0], data[1][0], data[1][1], data[1][2], data[2],
      );
    });
    this.subscribe("prompt", data => this.addPrompt(data[0], data[1]));
    this.subscribe("question", data => this.addQuestion(data[0], data[1]));
    this.subscribe("menu", data => this.addMenu(data[0], data[1]));
    this.subscribe("digit", data => this.addNumber(data[0]));
    this.subscribe("text", data => this.addText(data[0]));
    this.subscribe("yes-no", data => this.addYesNo(data[0]));
    this.subscribe("true-false", data => this.addTrueFalse(data[0]));
    this.subscribe("min", data => this.setMin(data[0], data[1]));
    this.subscribe("max", data => this.setMax(data[0], data[1]));
    this.subscribe("cf", () => this.setPromptCFMode());
    this.subscribe("attribute", data => {
      return this.setAttribute(data[0][0], data[0][1], data[1]);
    });
    this.subscribe("goal", data => this.addGoal(data[0], data[1]));
    this.subscribe("title", data => this.setTitle(data[0], data[1]));
    this.subscribe("summary", data => this.setSummary(data[0], data[1]));
    this.subscribe("line", () => this.addNewLine());
    this.subscribe("done", data => {
      this.unsubscribe();
    }); // event.on('eof',this.eof);
    // event.on('syntax-error',this.addText);
    // event.on('char-error',this.addText);
    // event.on('error',this.addText);
    // event.on('warning',this.addText);
    // event.on('info',this.addText);
  }

  get Data() {
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

  get Keywords() {
    return this.keywords;
  }

  get Rules() {
    return this.rules;
  }
  /* get Delimeters () {
    return /Math\.[a-z]+|Math\.(E|PI)/
  }*/


  get ActiveRule() {
    return this.rules[this.rules.length - 1];
  }

  get ActiveCondition() {
    let R = this.ActiveRule;
    let condition = R.Conditions[R.Conditions.length - 1];
    return condition;
  }

  get ActivePrompt() {
    return this.activePrompt;
  }

  set ActivePrompt(p) {
    this.activePrompt = p;
  }

  setTitle(text) {
    this.title = text;
  }

  setSummary(text) {
    this.summary = text;
  } // Public Methods


  setMin(value) {
    if (this.ActivePrompt.Type === YN || this.ActivePrompt.Type === TF) {
      value = 1;
    }

    this.prompts[this.ActivePrompt.Name].Min = this.ActivePrompt.Min = value.value || value;
  }

  setMax(value) {
    if (this.ActivePrompt.Type === YN || this.ActivePrompt.Type === TF) {
      value = 1;
    }

    this.prompts[this.ActivePrompt.Name].Max = this.ActivePrompt.Max = value.value || value;
  }

  setPromptType(type) {
    this.ActivePrompt.Type = type;
  }

  addText() {
    this.setPromptType(TEXT);
  }

  addNumber() {
    this.setPromptType(NUMBER);
  }

  addMenu(values) {
    // let menus = values;
    this.ActivePrompt.Menu = [];
    let index = 1;
    values.forEach(value => {
      const M = new Menu(index, // index
      value, // name
      value // value
      );
      this.ActivePrompt.Menu.push(M);
      index++;
    });
    this.setPromptType(MENU);
  }

  addTrueFalse() {
    // let menus = values;
    this.ActivePrompt.Menu = [];
    let index = 0;
    const values = [true, false];
    values.forEach(value => {
      const M = new Menu(index, // index
      value, // name
      value // value
      // value   //display text
      );
      this.ActivePrompt.Menu.push(M);
      index++;
    });
    this.ActivePrompt.Type = TF;
    this.setMin(1);
    this.setMax(1);
  }

  addYesNo() {
    // let menus = values;
    this.ActivePrompt.Menu = [];
    let index = 0;
    const values = [this.keywords[YES], this.keywords[NO]];
    values.forEach(value => {
      const M = new Menu(index, // index
      value, // name
      value // value
      // value   //display text
      );
      this.ActivePrompt.Menu.push(M);
      index++;
    });
    this.ActivePrompt.Type = YN;
    this.setMin(1);
    this.setMax(1);
  }

  addQuestion(text) {
    this.ActivePrompt.Question = text;
  }

  addPrompt(name, line) {
    const prompt = new Prompt(name.toLowerCase());
    prompt.Line = line;
    this.prompts[prompt.Name] = this.activePrompt = prompt; // this.addAttribute( p.Name);
  }

  setAttribute(name, value, line) {
    const a = this.addAttribute(name.toLowerCase(), line);
    a.Value = value;
  }

  addAttribute(name, line) {
    // if ( !name ) return null
    let a = this.attributes[name.toLowerCase()];

    if (a) {
      return a;
    }

    this.attributes[name.toLowerCase()] = a = new Attribute(name.toLowerCase());
    a.Line = line; // this.attributes[a.Name] = a

    return a;
  }

  addInference(name, value, alternative, line) {
    const inf = new Inference(name);
    inf.Value = value; // ( value && value.value ) ? value : [{ type: 'TRUE', value: true }]

    inf.Line = line;

    if (alternative) {
      // this.R.AltInferences.push(inf)
      this.ActiveRule.AltInferences.push(inf);
    } else {
      this.ActiveCondition.Inferences.push(inf); // this.condition.Inferences.push( inf )
    }

    this.addAttribute(name, inf.Line);
  }

  addPremise(keyword, left, right, op, line) {
    const E = new Statement(line);
    E.Left = left;
    E.Right = right;
    E.Comparator = op;
    E.Keyword = keyword;
    E.Line = line; // this.condition.Premises.push(s)

    this.ActiveCondition.Premises.push(E);
    left.forEach(token => {
      if (token && token.type === ATTR) {
        this.addAttribute(token.value, line);
      }
    });
    right.forEach(token => {
      if (token && token.type === ATTR) {
        this.addAttribute(token.value, line);
      }
    });
  }

  addCondition(keyword, left, right, op, line) {
    const condition = new Condition(); // this.condition = c
    //this.R.Conditions.push(c)

    this.ActiveRule.Conditions.push(condition);
    this.addPremise(keyword, left, right, op, line);
  }

  addRule(name, line) {
    const R = new Rule(name);
    R.Line = line;
    this.rules.push(R);
  }

  addGoal(name, line) {
    const G = new Goal(name.toLowerCase());
    G.Line = line;
    this.goals[G.Name] = G;
  }

  setPromptCFMode() {
    this.ActivePrompt.CFMode = true;
  }

  addObject(name, value) {
    this.objects[name.toLowerCase()] = value;
  }

  addArray(name, value) {
    this.arrays[name.tolowerCase()] = value;
  }

  setGoalCF(name, value) {
    this.goals[name.toLowerCase()].CF = value;
  }

  addNewLine() {// do nothing
  }
  /**
   *
   * @param { String } text Pruduction rules in plain text
   * @returns { Promise<Object> } Knowledgebase Data
   */


  compile(text) {
    var _this = this;

    return new Promise(async function (resolve, reject) {
      // let knowledgebase = new Knowledgebase(this);
      const errors = await _this.parse(text);
      EventEmmiter.publish("done-compile-knowledgebase-data", {
        errors: _this.errors,
        data: _this.Data
      });
      resolve({
        errors,
        data: _this.Data
      });
    });
  }

}

const defaults = {
  lang: "en",
  mode: "ace/mode/kbf"
};
class ParserFactory {
  static createParser(language, languageModule, mode = defaults.mode) {
    // const ext = mode && mode.substring(mode.indexOf(".") + 1);
    switch (mode) {
      case "ace/mode/res":
        return new ResourceParser(language, languageModule);

      case "ace/mode/kbf":
        return new Parser(language, languageModule);

      default:
        throw new Error("No parser for current mode: " + mode);
    }
  }

  static createCompiler(language, languageModule, mode = defaults.mode) {
    // console.log({ language, languageModule, mode });
    switch (mode) {
      case "ace/mode/res":
        return new ResourceParser(language, languageModule);
      // throw new Error("Compiler for this Mode is not yet supported");

      case "ace/mode/kbf":
        return new KnowledgebaseCompiler(language, languageModule);

      default:
        throw new Error("No compiler for current mode: " + mode);
    }
  }

}

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
  const err = CustomErrors(translator, systemLanguage).ValidationError(code);
  return err;
}

class Rules {
  constructor(systemLanguage, mode = "ace/mode/kbf") {
    this.systemLanguage = systemLanguage;
    this.languageModule = languageModules[systemLanguage];
    this.compiler = ParserFactory.createCompiler(systemLanguage, this.languageModule, mode);
    this.parser = ParserFactory.createParser(systemLanguage, this.languageModule, mode);
    this.translator = new Translator(systemLanguage, this.languageModule); // InputValidator(systemLanguage, this.translator);
  }

  static registerLanguage(lang, data) {
    if (!arguments) {
      throw new Error("Language name required");
    }

    if (typeof lang !== "string") {
      throw new Error("Expected language code as first argument");
    }

    if (typeof data !== "object") {
      throw new Error("Expected language data as second argument");
    }

    const language = lang.toLocaleLowerCase();

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
  }

  static init(installLanguageModules) {
    try {
      installLanguageModules && installLanguageModules.forEach(l => {
        const data = installedLanguagePlugins[l];

        if (data) {
          Rules.registerLanguage(l, data);
          console.log("Enabled language: " + l);
        } else {
          console.error("Locale not installed: " + l);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  getKeywords() {
    return this.languageModule.keywords;
  }

  async parse(codes) {
    const errors = await this.parser.parse(codes);
    return errors;
  }

  async compile(codes) {
    const {
      errors,
      data
    } = await this.compiler.compile(codes);
    return {
      errors,
      data
    };
  }

  run(freshData) {
    if (!freshData) {
      return raiseValidationError(ErrorKeys.KnowledgebaseNotFound, this.translator, this.systemLanguage);
    }

    let response = new Engine(freshData).run();
    return response; // return process(response);
  }

  reply(modifiedData, input) {
    if (!modifiedData) {
      return raiseValidationError(ErrorKeys.KnowledgebaseNotFound, this.translator, this.systemLanguage);
    }

    if (!input || input.toString().trim().length === 0) {
      return raiseValidationError(ErrorKeys.NoInput, this.translator, this.systemLanguage);
    }

    let response = new Engine(modifiedData, this.translator, this.validator).input(input);
    return process(response);
  }

  validate(input, prompt) {
    return validator.validate(input, prompt);
  }

  choice(input, prompt) {
    return multipleChoice(input, prompt);
  }

  translate(code, to) {
    return this.translator.translate(code, to);
  }

  translatePlain(text, to, from) {
    return this.translator.translatePlain(text, to, from);
  }

}

class CustomEvent {
  constructor() {
    this.topics = {}; // this.hOP = topics.hasOwnProperty
  }

  on(topic, listener) {
    // Create the topic's object if not yet created
    if (!this.topics.hasOwnProperty.call(this.topics, topic)) this.topics[topic] = []; // Add the listener to queue

    let index = this.topics[topic].push(listener) - 1;

    let _this = this; // Provide handle back for removal of topic


    return {
      remove: function () {
        //delete topics[topic][index]
        _this.topics[topic].splice(index, 1);
      }
    };
  }

  remove(topic, listener) {
    // Create the topic's object if not yet created
    if (this.topics.hasOwnProperty.call(this.topics, topic)) {
      // Add the listener to queue
      let index = this.topics[topic]; //delete topics[topic][index]

      this.topics[topic].splice(index, 1);
    }
  }

  off(topic, listener) {
    this.remove(topic, listener);
  }

  trigger(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!this.topics.hasOwnProperty.call(this.topics, topic)) return; // Cycle through topics queue, fire!

    this.topics[topic].forEach(item => {
      item(info != undefined ? info : {});
    });
  }

  emit(topic, info) {
    this.trigger(topic, info);
  }

  fire(topic, info) {
    this.trigger(topic, info);
  }

  publish(topic, info) {
    this.trigger(topic, info);
  }

  destroy() {
    Object.keys(this.topics).forEach(topic => {
      let topics = this.topics[topic];

      while (topics.length > 0) {
        topics.pop();
      }
    });
    delete this.topics;
  }

}

function attachCSS(css, id, name, toggle = false) {
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

class Clipboard {
  /**
   * Constructor
   * @param {String} selector The query selector for element(s) to attach event: 
   * should be in format #xxx or .xxx
   */
  constructor(selector) {
    const styles = `
      ${selector}:before {
        content: '';
        display: none;
        position: absolute;
        z-index: 9998;
        top: 35px;
        left: 15px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid rgba(0, 0, 0, .72);
      }
      ${selector}:after {
        content: 'Copy to Clipboard';
        display: none;
        position: absolute;
        z-index: 9999;
        top: 40px;
        right: 1px;
        width: 114px;
        height: 36px;
        color: #fff;
        font-size: 10px;
        line-height: 36px;
        text-align: center;
        background: #111;
        background: rgba(0, 0, 0, .72);
        border-radius: 3px;
      }
      ${selector}:hover:before, 
      ${selector}:hover:after {
        display: block;
      }
      ${selector}:active, 
      ${selector}:focus {
          outline: none;
      }
      ${selector}:active:after, 
      ${selector}:focus:after {
          content: 'Copied!';
      }`;
    attachCSS(styles, 'clipboard_css', 'clipboard-css');
  }

  copyToClipboard(str) {
    const el = document.createElement('textarea'); // Create a <textarea> element

    el.value = str; // Set its value to the string that you want copied

    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof

    el.style.position = 'absolute';
    el.style.left = '-9999px'; // Move outside the screen to make it invisible

    document.body.appendChild(el); // Append the <textarea> element to the HTML document

    const selected = document.getSelection().rangeCount > 0 // Check if there is any content selected previously
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
  }

}

// import { attachCSS } from './css.js'
class PrintButton {
  constructor(color, source, options) {
    this.color = color;
    this.source = source;
    this.winOptions = 'resizable=yes,scrollbars=yes,left=0,top=0,width=960,height=450';
    this.openSvg = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width="16px" height="16px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
        <title>open in new window</title>
        <desc>Created with Sketch.</desc>
        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Two-Tone" transform="translate(-647.000000, -333.000000)">
                <g id="Action" transform="translate(100.000000, 100.000000)">
                    <g id="Two-Tone-/-Action-/-open_in_new" transform="translate(544.000000, 230.000000)">
                        <g>
                            <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                            <path d="M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z" id="🔹-Primary-Color" fill="${this.color}"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>`;
    this.printSvg = `
    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="16px" height="16px" viewBox="0 0 212.795 220.59" enable-background="new 0 0 212.795 220.59"
        xml:space="preserve">
        <title>Print out</title>
    <path fill="${this.color}" d="M189.209,175.581h-27.186c-1.104,0-2-0.896-2-2v-29.808H55.505v29.808c0,1.104-0.895,2-2,2H26.094
      c-5.101,0-9.25-4.148-9.25-9.249v-67.82c0-5.101,4.149-9.25,9.25-9.25h163.116c5.101,0,9.25,4.149,9.25,9.25v67.82
      C198.459,171.432,194.311,175.581,189.209,175.581 M164.023,171.581h25.186c2.895,0,5.25-2.354,5.25-5.249v-67.82
      c0-2.895-2.355-5.25-5.25-5.25H26.094c-2.895,0-5.25,2.355-5.25,5.25v67.82c0,2.896,2.355,5.249,5.25,5.249h25.412v-29.808
      c0-1.104,0.896-2,2-2h108.518c1.104,0,2,0.896,2,2V171.581z"/>
    <path fill="${this.color}" d="M53.279,93.261H34.702c-1.104,0-2-0.896-2-2V73.427c0-3.602,2.93-6.531,6.531-6.531h14.046
      c1.105,0,2,0.896,2,2v22.365C55.279,92.366,54.384,93.261,53.279,93.261 M36.702,89.261h14.577V70.896H39.233
      c-1.396,0-2.531,1.137-2.531,2.531V89.261z"/>
    <path fill="${this.color}" d="M180.601,93.261h-18.577c-1.104,0-2-0.896-2-2V68.896c0-1.104,0.896-2,2-2h14.046
      c3.601,0,6.531,2.93,6.531,6.531v17.834C182.601,92.366,181.706,93.261,180.601,93.261 M164.023,89.261h14.577V73.427
      c0-1.395-1.135-2.531-2.531-2.531h-12.046V89.261z"/>
    <path fill="${this.color}" d="M162.023,93.261H53.279c-1.104,0-2-0.896-2-2V8.951c0-1.104,0.896-2,2-2h88.581
      c0.579,0,1.129,0.251,1.509,0.688l20.163,23.172c0.317,0.363,0.491,0.83,0.491,1.313v59.139
      C164.023,92.366,163.128,93.261,162.023,93.261 M55.279,89.261h104.744V32.871l-19.074-21.92h-85.67V89.261z"/>
    <path fill="${this.color}" d="M171.085,143.773H44.217c-1.105,0-2-0.896-2-2c0-1.104,0.895-2,2-2h126.868c1.104,0,2,0.896,2,2
      C173.085,142.877,172.189,143.773,171.085,143.773"/>
    <path fill="${this.color}" d="M162.023,214.757H53.506c-1.105,0-2-0.896-2-2v-70.984c0-1.104,0.895-2,2-2h108.517c1.105,0,2,0.896,2,2
      v70.984C164.023,213.861,163.128,214.757,162.023,214.757 M55.506,210.757h104.518v-66.983H55.506V210.757z"/>
    <path fill="${this.color}" d="M143.673,175.581H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2
      C145.673,174.685,144.777,175.581,143.673,175.581"/>
    <path fill="${this.color}" d="M143.673,157.457H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2
      C145.673,156.561,144.777,157.457,143.673,157.457"/>
    <path fill="${this.color}" d="M143.673,193.705H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2
      C145.673,192.809,144.777,193.705,143.673,193.705"/>
    <path fill="${this.color}" d="M47.955,115.681h-7.929c-4.038,0-7.324-3.285-7.324-7.324s3.286-7.324,7.324-7.324h7.929
      c4.039,0,7.324,3.285,7.324,7.324S51.994,115.681,47.955,115.681 M40.026,105.033c-1.833,0-3.324,1.491-3.324,3.324
      s1.491,3.324,3.324,3.324h7.929c1.833,0,3.324-1.491,3.324-3.324s-1.491-3.324-3.324-3.324H40.026z"/>
    <path fill="${this.color}" d="M68.571,115.681c-4.038,0-7.324-3.285-7.324-7.324s3.286-7.324,7.324-7.324c4.039,0,7.324,3.285,7.324,7.324
      S72.61,115.681,68.571,115.681 M68.571,105.033c-1.833,0-3.324,1.491-3.324,3.324s1.491,3.324,3.324,3.324s3.324-1.491,3.324-3.324
      S70.404,105.033,68.571,105.033"/>
    </svg>`;
    this.copySvg = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?> 
    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 1.34315 7.34315 0 9 0H14C14.2652 0 14.5196 0.105357 14.7071 0.292893L21.7071 7.29289C21.8946 7.48043 22 7.73478 22 8V17C22 18.6569 20.6569 20 19 20H18V21C18 22.6569 16.6569 24 15 24H5C3.34315 24 2 22.6569 2 21V7C2 5.34315 3.34315 4 5 4H6V3ZM6 6H5C4.44772 6 4 6.44772 4 7V21C4 21.5523 4.44772 22 5 22H15C15.5523 22 16 21.5523 16 21V20H9C7.34315 20 6 18.6569 6 17V6ZM9 2C8.44772 2 8 2.44772 8 3V17C8 17.5523 8.44771 18 9 18H19C19.5523 18 20 17.5523 20 17V9H16C14.3431 9 13 7.65685 13 6V2H9ZM15 3.41421L18.5858 7H16C15.4477 7 15 6.55228 15 6V3.41421Z" fill="${color}"/>
    </svg>`;
    this.OpenButton = this.createButton(color, this.openSvg, options);
    this.OpenButton.addEventListener('click', () => {
      this.openInWindow();
    });
    this.PrintButton = this.createButton(color, this.printSvg, options);
    this.PrintButton.addEventListener('click', () => {
      this.printToPrinter();
    });
    this.ClipboardButton = this.createButton(color, this.copySvg, options);
    this.ClipboardButton.classList.add('copy-to-clipboard-button');
    this.clipboard = new Clipboard(".copy-to-clipboard-button");
    this.ClipboardButton.addEventListener('click', () => {
      this.clipboard.copyToClipboard(this.Text);
    });
  }

  createButton(color, html, options = {}) {
    const button = document.createElement('button');
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
  }

  get Html() {
    return this.source.innerHTML;
  }

  get Text() {
    return this.source.innerText;
  }

  openInWindow() {
    try {
      var printWindow = window.open('', '', this.winOptions);
      let str = `
        <html>
            <head><title>Print Window</title></head>
            <body>
                <div  
                    style="width:100%; 
                    padding:1rem 2rem; 
                    font-size:1.1rem;
                    font-family: 'Courier New';
                    letter-spacing: 1px;
                ">
                    ${this.Html}
                </div>
            </body>
        </html>`;
      printWindow.document.writeln(str);
      return printWindow;
    } catch (ex) {
      //alert(ex);
      console.error('Error: ' + ex.message);
    }
  }

  printToPrinter() {
    try {
      var printWindow = this.openInWindow();
      printWindow.print();
      printWindow.close();
    } catch (ex) {
      //alert(ex);
      console.error('Error: ' + ex.message);
    }
  }

}

class Viewer {
  /**
   * 
   * @param {Object} view The HTML element to attach highlighter
   * @param {String} title Name of the script language: default is kbf
   */
  constructor(view, container, title) {
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

  get Text() {
    return this.getContentBlock().innerText;
  }

  get html() {
    return this.getContentBlock().innerHTML;
  }

  view() {
    this.text = this.div.innerHTML;
    this.id = Math.random().toString(36).slice(2); // let btn = new ToggleButton(null, 'ios')

    let banner = document.createElement('div');
    banner.setAttribute('id', `banner${this.id}`);
    banner.style.float = 'right';
    banner.append(this.printButton.ClipboardButton);
    banner.append(this.printButton.OpenButton);
    banner.append(this.printButton.PrintButton);
    this.container.append(banner);
  }

  getContentBlock() {
    return document.querySelector('.pr-display');
  }

}

/*jshint esversion: 6*/

class Ux extends CustomEvent {
  constructor(el, options = {}) {
    super();
    this.language = options.language || "en";
    Rules.init(["fr", "es"]);
    if (!el) throw "Missing Element ID to attach UX";
    let node = el instanceof HTMLElement ? el : typeof el === "string" ? document.getElementById(el) : el;
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
    this.rules = new Rules(this.language, "ace/mode/kbf");
    this.init();
  }

  get Text() {
    return this.text;
  }

  set Text(text) {
    this.text = text;
  }

  get URL() {
    return this.url;
  }

  set URL(url) {
    this.url = url;
  }

  async run(text) {
    try {
      this.text = text;
      const {
        errors,
        data
      } = await this.rules.compile(text);
      this.data = data;
      this.errors = errors;

      if (errors && errors.length > 0) {
        return this.processParserErrors(errors);
      }

      this.start(data);
    } catch (e) {
      console.trace(e);
      const response = {
        name: "ScriptError",
        code: "ScriptError",
        message: e
      };
      this.processError(response);
    }
  }

  start(data) {
    const response = this.rules.run(data);
    this.process(response);
  }

  async repeat() {
    await this.run(this.text); // this.start()
  }

  reply(input) {
    const response = this.rules.reply(this.data, input);
    this.process(response);
  }

  send() {
    if (!this.data) {
      return console.info("No language defined in kb", console.trace);
    }

    let msg = null;

    if (this.prompt.Type === "NUMBER" || this.prompt.Type === "TEXT") {
      msg = this.input.value;
    } else {
      msg = this.composeReply();
    }

    if (!msg) return;
    this.setMargin();
    this.input.value = "";
    this.reply(msg);
  }

  why() {//ps.publish( 'why' )
  }

  stop() {//ps.publish( 'stop' )
  }

  explain() {//ps.publish( 'explain' )
  }

  cancel() {
    this.display.innerHTML = "";
  }

  print() {
    let html = this.display.innerHTML;
    let win = window.open("about:blank", "self", "width=600; height=450;");
    win.document.writeln(html);
    win.print();
    win.close();
  }

  copy() {}

  process(response) {
    // console.log({ response });
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
  }

  attachScripts(scr, id, name) {
    var head = document.body;
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.id = id || Math.random().slice(2).toString(36);
    link.name = name || "script" + link.id;
    link.append(scr);
    head.appendChild(link);
  }

  async init() {
    this.el.classList.add("pr-parent");
    this.theme = "dark";
    this.display = document.getElementById("console-display");
    this.input = document.getElementById("console-input");
    this.buttons = document.getElementById("console-btpanel");
    this.banner = document.getElementById("console-banner");
    this.toolbar = document.getElementById("console-toolbar");
    new Viewer(this.display, this.toolbar);
    this.input.focus();
    this.container = document.getElementById("console-container");
    this.attachListeners(this.el, this.toolbar, this.buttons);
    this.addListeners(); // let doc = document.createDocumentFragment()
    // let runpanel = doc.getElementById( container )
    // let input = doc.getElementById( inputId )
    // this.stylePanel( runpanel )
    // this.styleDisplay( display )
    // this.styleInput( input )
    // this.styleLinks( doc )
    // console.log( document.getElementsByClassName( 'gold' )[0].style.background='lavender' )
  }

  toggleTheme() {
    this.el.classList.toggle(this.Theme);
  }

  get Theme() {
    return this._theme;
  }

  set Theme(color) {
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

  attachListeners(el, toolbar, buttons) {
    el.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        if (e.target.type === "radio" || e.target.type === "checkbox") {
          this.send();
        } else if (e.target.type === "text") {
          this.send();
        } else {
          e.target.click();
        }
      }

      e.preventDefault();
      e.stopPropagation();
    });
    toolbar.addEventListener("click", e => {
      switch (e.target.id) {
        case "pr-print":
          this.print();
          break;

        case "pr-copy":
          this.copy();
          break;
      }

      e.stopPropagation();
      e.preventDefault();
    });
    buttons.addEventListener("click", e => {
      switch (e.target.innerText) {
        case "✓":
          this.send();
          break;

        case "?":
          this.why();
          break;

        case "!":
          this.explain();
          break;

        case "×":
          this.cancel();
          break;

        case "‣":
          this.repeat();
          break;

        case "⛔":
          this.stop();
          break;

        default:
          //do nothing
          return;
      }

      this.input.focus();
      e.preventDefault();
      e.stopPropagation();
    });
  }

  addListeners() {
    this.on("error", e => {
      this.processError(e);
    });
    this.on("syntax-error", e => {// this.processParserErrors(e.msg )
      // this.processError( e )
      // console.log(e)
      // this.processError(e)
    });
    this.on("system-error", e => {
      // this.processError( e )
      this.processError(e); // console.log(e)
    });
    this.on("validation-error", e => {
      this.processValidationError(e);
    });
    this.on("prompt", e => {
      this.processPrompt(e);
    });
    this.on("answers", e => {
      this.display.innerHTML = "";
      this.processAnswers(e);
    });
    this.on("message", e => {
      this.appendToContent("<h6>" + e.msg || e + "</h6>");
    });
    this.on("done", () => {
      this.display.innerHTML = "";
    });
  }

  processPrompt(prompt) {
    this.prompt = prompt;
    let id = Math.floor(Math.random() * 99999999999999).toString(36);
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
  }

  processValidationError(error) {
    this.input.value = "";
    this.input.focus(); // this.appendToContent("<div>" + error + "</div>")

    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>");
  }

  processError(error) {
    // console.log(JSON.stringify(error))
    this.input.value = "";
    this.input.focus();
    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>"); // this.display.innerHTML += "<br/>" + ( error.msg || error )
  }

  processParserErrors(errors) {
    if (!errors) {
      this.appendToContent("<div>System error</div>");
      return;
    } // alert(JSON.stringify(errors))


    errors.forEach(e => {
      var x = e.x === undefined ? e.column : e.x;
      var y = e.y === undefined ? e.row : e.y;
      var s = "<br/><i style='color:red;' class='fa fa-times'></i> '" + e.text + "'<br/> <i style='color:blue;' class='fa fa-anchor'></i> <a href='javascript:void()' onclick='selectLine(" + y + ")'>" + "Line: " + (y * 1 + 1) + " Column: " + (x + 1) + "</a> <br/><i class='fa fa-code'></i> <a href ='javascript:void()' onclick='selectLine(" + y + ")'>" + e.text + "</a>";
      this.display.innerHTML += s + "<br/>";
      this.scrollDown("Error");
    });
  }

  processScriptError(error) {
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
  }

  processAnswers(answers) {
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
  }

  processInfo(data) {
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
  }

  addClickListener(fn) {
    let tags = this.el.getElementsByTagName("ul");
    let last = tags[tags.length - 1];

    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i];

      if (node && node.children) {
        let el = node.children[0].firstChild;
        el.addEventListener("click", fn);
      }
    }
  }

  disableInputs() {
    let tags = this.el.getElementsByTagName("ul");
    let last = tags[tags.length - 1];
    if (!last) return;
    this.widgets.forEach(w => {
      w.setAttribute("checked", true);
    });
    this.widgets = [];

    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i];

      if (node && node.children) {
        let el = node.children[0].firstChild;
        el.disabled = true;
      }
    }
  }

  composeReply() {
    let tags = this.el.getElementsByTagName("ul");
    let last = tags[tags.length - 1];
    if (!last) return null;
    let resp = {};
    let index = 0;

    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i];

      if (node && node.children) {
        let el = node.children[0].firstChild;
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
  }

  composeMenuWidget(prompt) {
    let name = Math.floor(Math.random() * 9999999999999).toString(36);
    let array = [];

    if (prompt.Max > 1) {
      array = this.composeCheckBoxes(prompt, name);
    } else {
      array = this.composeRadioButtons(prompt, name);
    }

    var ol = "<ul>" + array.join(" ") + "</ul>";
    this.appendToContent(ol, true);
  }

  composeCheckBoxes(prompt, name) {
    return prompt.Menu.map(m => {
      return '<li><label><input type = "checkbox" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  }

  composeRadioButtons(prompt, name) {
    return prompt.Menu.map(m => {
      return '<li><label><input type = "radio" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  }

  showMenu(prompt, commandline) {
    if (!commandline) return this.composeMenuWidget(prompt);
    let array = prompt.Menu.map(m => {
      return "<li>" + m.Name + "</li>";
    });
    var ol = "<ol >" + array.join(" ") + "</ol>";
    this.appendToContent(ol, true);
    return null;
  }

  appendToContent(node, scroll = true) {
    if (node && node.classList) {
      node.classList.add("pr-console-line");
    }

    this.display.innerHTML += node;
    if (scroll) this.scrollDown("content");
  }

  setMargin() {
    var el = this.display;
    var child = el.lastChild;

    if (child && child.classList) {
      child.classList.add("pr-margin-bottom"); //child.style.borderBottom = "1px solid #777"
      //child.style.paddingTop = "6px"
      //child.style.marginBottom = "8px"
    }
  }

  scroll(direction) {
    var el = this.display;

    if (direction === "up") {
      el.scrollTop = 0;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }

  scrollDown() {
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
  }

  scrollUp() {
    var el = this.display;
    var child = el.firstChild;

    if (child) {
      child.scrollIntoView();
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }

  showInputBar() {
    //var a0="<input type='text' class='input'/><br/> ";
    //var a1=(' <a href=\'javascript:void(0)\' onclick=\'ui.send()\'>Send</a> ');
    var a2 = " <a href='javascript:void(0)'onclick='disconnect()' >Disconnect</a> ";
    var a3 = " <a href='javascript:void(0)'onclick='open()' >Restart</a>  ";
    var a4 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = " <div id='input-bar'><input type='text' class='input'/>" + a2 + a3 + a4 + "</div></br/>";
    this.appendToContent(ol);
  }

  showTaskBar() {
    //ol.append("<input type='text' class='input' onkeyUp='inputKeyup("+event+")'/> ");
    //ol.append(" <a href='javascript:void(0)' onclick='submmitClick'>Send</a> ");
    //ol.append(" <a href='javascript:void(0)' onclick='disconnect'>Disconnect</a> ");
    var a1 = " <a href='javascript:void(0)' onclick='connectClick()'>Restart</a> ";
    var a2 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = "<div id='input-bar'>" + a1 + a2 + "</div>";
    this.appendToContent(ol);
  }

}

/*jshint esversion: 6*/
class Ui extends CustomEvent {
  constructor(el, options = {}) {
    super();
    this.language = options.language || "en";
    Rule.init(["fr", "es"]);
    if (!el) throw "Missing Element ID to attach UX";
    let node = el instanceof HTMLElement ? el : typeof el === "string" ? document.getElementById(el) : el;
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

  get Text() {
    return this.text;
  }

  set Text(text) {
    this.text = text;
  }

  get URL() {
    return this.url;
  }

  set URL(url) {
    this.url = url;
  }

  async run(codes) {
    this.codes = codes;
    const {
      errors,
      data
    } = await this.rules.compile(codes);
    this.data = data;
    this.errors = errors;
    this.start(data);
  }

  start(data) {
    const response = this.rules.run(data);
    this.process(response);
  }

  async repeat() {
    // let data = localStorage.getItem('engine-kb-data')
    // this.data = JSON.parse(data)
    await this.run(this.codes);
  }

  reply(input) {
    const response = this.rules.reply(this.data, input);
    this.process(response);
  }

  send() {
    if (!this.data) {
      return console.info("No language defined in kb", console.trace);
    }

    let msg = null;

    if (this.prompt.Type === "NUMBER" || this.prompt.Type === "TEXT") {
      msg = this.input.value;
    } else {
      msg = this.composeReply();
    }

    if (!msg) return;
    this.setMargin();
    this.input.value = "";
    this.reply(msg);
  }

  why() {//ps.publish( 'why' )
  }

  stop() {//ps.publish( 'stop' )
  }

  explain() {//ps.publish( 'explain' )
  }

  cancel() {
    this.display.innerHTML = "";
  }

  print() {
    let html = this.display.innerHTML;
    let win = window.open("about:blank", "self", "width=600; height=450;");
    win.document.writeln(html);
    win.print();
    win.close();
  }

  copy() {}

  process(response) {
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
  }

  attachScripts(scr, id, name) {
    var head = document.body;
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.id = id || Math.random().slice(2).toString(36);
    link.name = name || "script" + link.id;
    link.append(scr);
    head.appendChild(link);
  }

  attachListeners() {
    this.el.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        if (e.target.type === "radio" || e.target.type === "checkbox") {
          this.send();
        } else if (e.target.type === "text") {
          this.send();
        } else {
          e.target.click();
        }
      }

      e.preventDefault();
      e.stopPropagation();
    });
    this.toolbar.addEventListener("click", e => {
      switch (e.target.id) {
        case "pr-print":
          this.print();
          break;

        case "pr-copy":
          this.copy();
          break;
      }

      e.stopPropagation();
      e.preventDefault();
    });
    this.buttons.addEventListener("click", e => {
      switch (e.target.innerText) {
        case "✓":
          this.send();
          break;

        case "?":
          this.why();
          break;

        case "!":
          this.explain();
          break;

        case "×":
          this.cancel();
          break;

        case "‣":
          this.repeat();
          break;

        case "⛔":
          this.stop();
          break;

        default:
          //do nothing
          return;
      }

      this.input.focus();
      e.preventDefault();
      e.stopPropagation();
    });
  }

  attachCSS() {
    const head = document.head;
    const link = document.createElement("style");
    link.rel = "stylesheet";
    const css = `
    .pr-copy, 
    .pr-print {
      cursor: pointer;
      padding: 2px 0;
      margin-left: 8px;
      margin-bottom: 4px;
      height: 22px;
      margin-right: 4px;
      background: white;
      border-radius: 5px 5px 5px 5px;
    }
    .pr-toggle {
       cursor: pointer;
    }
    .pr-copy {
        padding-right: 0px;
        padding-left: 4px;
     }
     .pr-print {
        padding-left: 4px;
        padding-right: 4px;
     }
    .pr-parent {
        border: 0;
        min-width: 240px;
        padding: 2px;
        transition: background 1.8s;
    }
    .pr-container {
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        border: 1px solid none;
        color: white;
        background: #222;
    }
    .pr-banner, 
    .pr-banner {
        height: 1.8rem;
        font-weight: 400;
        margin-bottom:0;
        padding-top: 2px;
        font-variant: small-caps;
    }
    .pr-toolbar {
        position: relative;
        display: flex;
        align-items: center;
        letter-spacing: 1.4px;
        font-size: 14px;
        align-items: center;
        height: 100%;
        width: 160px;
        text-align: right;
        float: right;
        border-radius:50px;
        padding-left: 1rem;
        padding-right: 17px;
        padding-top: 1px;
        opacity: 0;
        justify-content: flex-end;
    }
    .pr-banner:hover > .pr-toolbar {
        transition: all 0.7s;
        opacity: 100%;
    }
    .pr-display {
        position: absolute;
        overflow: auto;
        padding: 4px;
        top: 36px;
        bottom: 36px;
        left: 0;
        right: 0;
        background: #111;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        font-size: 16px;
        letter-spacing: 1.2px;
        color: cadetblue;
        text-shadow: none;
    }
    .pr-display ul {list-style-type:none; border-bottom:0px solid #555;}
    .pr-dispaly ol {border-bottom:0px solid #555; list-style:upper-latin;}
    .pr-display .pr-margin-bottom {border-bottom: 1px solid cadetblue;margin-bottom:5px; padding:5px}
    .pr-input-panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        padding-top: 0;
        padding-left: 7px;
        height: 32px;
    }
    .pr-input-buttons {
      display:inline-block;
      font-weight:bold;
      margin-bottom: 2px;
      font-size: 1.4em;
    }
    .pr-text-input-container {
      padding: 0;
      background: transparent;
      border: none;
    }
    .pr-text-input {
        width: auto;
        max-width: 80px;
        outline: none;
        background: slateblue;
        color: white;
        font-size: 18px;
        height: 100%;
        width: 100%;
        border: none;
    }
    .pr-link-btn {
        padding: 4px 4px 4px 4px;
        text-decoration: none;
        margin: 1px;
        border-radius: px 2px 2px;
    }
    .pr-char {
        font-size: 1em;
        font-weight: bold;
        color: white;
    }
    .pr-margin-bottom {
       border-bottom: 1px solid transparent;
       padding-top: 6px;
       margin-bottom: 8px;
    }
    .gold .pr-container {
        background: blanchedalmond;
        color: green;
    }

    .gold .pr-char, .gold .pr-banner {
      color: green;
    }
    .blue .pr-container {
      background: navy;
    }
    .indigo .pr-container {
      background: slateblue;
    } 
    .green .pr-container {
      background: lightgreen;
    }
    .red .pr-container {
      background: #b00000;
    }
    .orange .pr-container {
      background: orange;
    }
    .light .pr-container {
      background: #eee;
      color: blue;
    }
    .light .pr-char, .light .pr-banner {
      color: blue;
    }
    `;
    link.append(css);
    head.appendChild(link);
  }

  async loadConsolePanel() {
    const num = Math.random().toString(36).slice(2).toString(36);
    const display_id = `display${num}`,
          inputId = `text${num}`,
          btpanel = `btPanel${num}`,
          container = `container${num}`,
          toolbar = `tb${num}`,
          banner = `banner${num}`;
    const panel = `
    <div id = '${container}' class ='pr-container'>
      <div id ='${banner}' class ='pr-banner'>
        <span class="pr-banner-title">Rules Interface</span>
        <div id ='${toolbar}' class ='pr-toolbar'></div>
      </div>
      <div id ='${display_id}' class ='pr-display'></div>
      <div id ='${btpanel}' class ='pr-input-panel'>
      <span class='pr-text-input-container'>
        <input id ='${inputId}' class ='pr-text-input' type='text'/>
      </span> 
      <span class='pr-input-buttons'>
          <a href='javascript:void(0)' title='Send' class='pr-link-btn'><span class='pr-char'>&check;</span></a>
          <a href='javascript:void(0)' title='Why ask?' class='pr-link-btn'><span class='pr-char'>&quest;</span></a>
          <a href='javascript:void(0)' title='Explain' class='pr-link-btn'><span class='pr-char'>&excl;</span></a>
          <a href='javascript:void(0)' title='Disconnect' class='pr-link-btn'><span class='pr-char'>&times;</span></a>
          <a href='javascript:void(0)' title='Repeat' class='pr-link-btn'><span class='pr-char' style="font-size:1.5rem">&#8227;</span></a>
      </span>
    </div></div>`;
    this.el.innerHTML = panel;
    this.el.classList.add("pr-parent");
    this.theme = "dark";
    this.display = document.getElementById(display_id);
    this.input = document.getElementById(inputId);
    this.buttons = document.getElementById(btpanel);
    this.banner = document.getElementById(banner);
    this.toolbar = document.getElementById(toolbar);
    new Viewer(this.display, this.toolbar);
    this.input.focus();
    this.container = document.getElementById(container); // let doc = document.createDocumentFragment()
    // let runpanel = doc.getElementById( container )
    // let input = doc.getElementById( inputId )
    // this.stylePanel( runpanel )
    // this.styleDisplay( display )
    // this.styleInput( input )
    // this.styleLinks( doc )
    // console.log( document.getElementsByClassName( 'gold' )[0].style.background='lavender' )
  }

  toggleTheme() {
    // console.log(this.theme, this.el)
    this.el.classList.toggle(this.Theme);
  }

  get Theme() {
    return this._theme;
  }

  set Theme(color) {
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

  stylePanel(runpanel) {
    runpanel.style.position = "absolute";
    runpanel.style.top = "0";
    runpanel.style.left = "0";
    runpanel.style.right = "0";
    runpanel.style.bottom = "0";
    runpanel.style.overflow = "auto";
    runpanel.style.paddingLeft = runpanel.style.paddingRight = "5px";
    runpanel.style.background = "inherit";
  }

  styleDisplay(display) {
    display.style.position = "absolute";
    display.style.top = "4px";
    display.style.left = "0";
    display.style.right = "0";
    display.style.bottom = "48px";
    display.style.overflow = "auto";
    display.style.paddingLeft = display.style.paddingRight = "16px";
  }

  styleInput(input) {
    input.style.color = "#000";
    input.style.background = "#999";
    input.style.border = "1px solid #333";
    input.style.marginRight = "7px";
    input.style.borderRadius = "15px";
    input.style.padding = "4px 4px 4px 12px";
  }

  styleLinks(doc) {
    let links = doc.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      link.style.padding = "4px 8px 4px 8px";
      link.style.textDecoration = "none";
      link.style.color = "inherit";
      link.style.margin = "1px";
      link.style.borderRadius = "2px 2px";
    }

    let btns = doc.getElementsByClassName("char");

    for (let i = 0; i < btns.length; i++) {
      let link = links[i];
      link.style.fontSize = "2em";
      link.style.fontWeight = "bold";
    }

    return doc;
  }

  addListeners() {
    this.on("error", e => {
      this.processError(e);
    });
    this.on("syntax-error", e => {
      // this.processParserErrors(e.msg )
      // this.processError( e )
      // console.log(e)
      this.processError(e);
    });
    this.on("system-error", e => {
      // this.processError( e )
      this.processError(e); // console.log(e)
    });
    this.on("validation-error", e => {
      this.processValidationError(e);
    });
    this.on("prompt", e => {
      this.processPrompt(e);
    });
    this.on("answers", e => {
      this.display.innerHTML = "";
      this.processAnswers(e);
    });
    this.on("message", e => {
      this.appendToContent("<h6>" + e.msg || e + "</h6>");
    });
    this.on("done", () => {
      this.display.innerHTML = "";
    });
  }

  processPrompt(prompt) {
    this.prompt = prompt;
    let id = Math.floor(Math.random() * 99999999999999).toString(36);
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
  }

  processValidationError(error) {
    this.input.value = "";
    this.input.focus(); // this.appendToContent("<div>" + error + "</div>")

    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>");
  }

  processError(error) {
    // console.log(JSON.stringify(error))
    this.input.value = "";
    this.input.focus();
    this.appendToContent("<div>" + error.name + ": " + error.code + ".<br/>Details: " + error.message + ".</div>"); // this.display.innerHTML += "<br/>" + ( error.msg || error )
  }

  processParserErrors(errors) {
    if (!errors) {
      this.appendToContent("<div>System error</div>");
      return;
    }

    errors.forEach(e => {
      var x = e.x === undefined ? e.column : e.x;
      var y = e.y === undefined ? e.row : e.y;
      var s = "<br/><i style='color:red;' class='fa fa-times'></i> '" + e.text + "'<br/> <i style='color:blue;' class='fa fa-anchor'></i> <a href='javascript:void()' onclick='selectLine(" + y + ")'>" + "Line: " + (y * 1 + 1) + " Column: " + (x + 1) + "</a> <br/><i class='fa fa-code'></i> <a href ='javascript:void()' onclick='selectLine(" + y + ")'>" + e.text + "</a>";
      this.display.innerHTML += s + "<br/>";
      this.scrollDown("Error");
    });
  }

  processScriptError(error) {
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
  }

  processAnswers(answers) {
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
  }

  processInfo(data) {
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
  }

  addClickListener(fn) {
    let tags = this.el.getElementsByTagName("ul");
    let last = tags[tags.length - 1];

    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i];

      if (node && node.children) {
        let el = node.children[0].firstChild;
        el.addEventListener("click", fn);
      }
    }
  }

  disableInputs() {
    let tags = this.el.getElementsByTagName("ul");
    let last = tags[tags.length - 1];
    if (!last) return;
    this.widgets.forEach(w => {
      w.setAttribute("checked", true);
    });
    this.widgets = [];

    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i];

      if (node && node.children) {
        let el = node.children[0].firstChild;
        el.disabled = true;
      }
    }
  }

  composeReply() {
    let tags = this.el.getElementsByTagName("ul");
    let last = tags[tags.length - 1];
    if (!last) return null;
    let resp = {};
    let index = 0;

    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i];

      if (node && node.children) {
        let el = node.children[0].firstChild;
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
  }

  composeMenuWidget(prompt) {
    let name = Math.floor(Math.random() * 9999999999999).toString(36);
    let array = [];

    if (prompt.Max > 1) {
      array = this.composeCheckBoxes(prompt, name);
    } else {
      array = this.composeRadioButtons(prompt, name);
    }

    var ol = "<ul>" + array.join(" ") + "</ul>";
    this.appendToContent(ol, true);
  }

  composeCheckBoxes(prompt, name) {
    return prompt.Menu.map(m => {
      return '<li><label><input type = "checkbox" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  }

  composeRadioButtons(prompt, name) {
    return prompt.Menu.map(m => {
      return '<li><label><input type = "radio" name="' + name + '" value="' + m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>";
    });
  }

  showMenu(prompt, commandline) {
    if (!commandline) return this.composeMenuWidget(prompt);
    let array = prompt.Menu.map(m => {
      return "<li>" + m.Name + "</li>";
    });
    var ol = "<ol >" + array.join(" ") + "</ol>";
    this.appendToContent(ol, true);
    return null;
  }

  appendToContent(node, scroll = true) {
    if (node && node.classList) {
      node.classList.add("pr-console-line");
    }

    this.display.innerHTML += node;
    if (scroll) this.scrollDown("content");
  }

  setMargin() {
    var el = this.display;
    var child = el.lastChild;

    if (child && child.classList) {
      child.classList.add("pr-margin-bottom"); //child.style.borderBottom = "1px solid #777"
      //child.style.paddingTop = "6px"
      //child.style.marginBottom = "8px"
    }
  }

  scroll(direction) {
    var el = this.display;

    if (direction === "up") {
      el.scrollTop = 0;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }

  scrollDown() {
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
  }

  scrollUp() {
    var el = this.display;
    var child = el.firstChild;

    if (child) {
      child.scrollIntoView();
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }

  showInputBar() {
    //var a0="<input type='text' class='input'/><br/> ";
    //var a1=(' <a href=\'javascript:void(0)\' onclick=\'ui.send()\'>Send</a> ');
    var a2 = " <a href='javascript:void(0)'onclick='disconnect()' >Disconnect</a> ";
    var a3 = " <a href='javascript:void(0)'onclick='open()' >Restart</a>  ";
    var a4 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = " <div id='input-bar'><input type='text' class='input'/>" + a2 + a3 + a4 + "</div></br/>";
    this.appendToContent(ol);
  }

  showTaskBar() {
    //ol.append("<input type='text' class='input' onkeyUp='inputKeyup("+event+")'/> ");
    //ol.append(" <a href='javascript:void(0)' onclick='submmitClick'>Send</a> ");
    //ol.append(" <a href='javascript:void(0)' onclick='disconnect'>Disconnect</a> ");
    var a1 = " <a href='javascript:void(0)' onclick='connectClick()'>Restart</a> ";
    var a2 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
    var ol = "<div id='input-bar'>" + a1 + a2 + "</div>";
    this.appendToContent(ol);
  }

}

export { Rules, Ui, Ux };
//# sourceMappingURL=rules-engine.modern.js.map
