/* jshint esversion:8*/
import Validator from "./validator"
import { ValidationError, ScriptError } from './custom-errors'
// import Constants from "./constants"
import { MENU, MUL, AVE, SUM, MAX, MIN } from './token-constants'
import promptSettings from "./prompt-res"
import keywords from "./keywords"
import Builder from "./treebuilder"
import Interpreter from "./interpreter"
import { normalize } from './prompt'
import choice from './choice'
import { keys, Translator } from '../translation'

export default class Engine extends Translator {
  
  constructor (kb) {
    super()
    if (!kb) throw new ReferenceError('kb is undefined')
    this.paused = false
    this.CFSettings = null
    this.keywords = null
    this.done = false
    this.knowledgebase = kb
    this.CFSettings = promptSettings[kb.language.toLowerCase()]
    this.keywords = keywords[kb.language.toLowerCase()]
    this.validator = new Validator(kb.language)
    this.target = kb.language
    // this.setKnowledgebase(kb)
  }

  raiseScriptError (e) {
    
    const message = this.translate(keys.ScriptError).data
    // translateKey(ErrorKeys.ScriptError, this.knowledgebase.language)
    throw new ScriptError(message, keys.ScriptError, e)
  }
  raisePromptNotFoundError () {
    const message = this.t(keys.PromptNotFound).data
    // translateKey(ErrorKeys.PromptNotFound, this.knowledgebase.language)
    return new ValidationError(message, keys.PromptNotFound)
  }
  raiseSessionExpiredError () {
    const message = this.t(keys.SessionExpired).data
    // translateKey(ErrorKeys.SessionExpired, this.knowledgebase.language)
    return new ValidationError(message, keys.SessionExpired)
  }
  getEventData (code, message) {
    return {
      status: 'error',
      msg: message,
      code: code,
      text: this.lineText, // lineText,
      line: this.lineNumber,
      rule: this.knowledgebase.currentRule.Name,
      ruleNumber: this.knowledgebase.ruleIndex + 1,
    }
  }

  calculateCF (oldValue, newValue, mode) {
    let cf = 0
    // let oldValue = this.getConditionCF()
    switch (mode) {
      case SUM: {
        cf = (oldValue / 100) * (100 - newValue) // probability sum
        break
      }
      case MUL: {
        cf = (oldValue * newValue) / 100 // multiply
        break
      }
      case AVE: {
        cf = (oldValue + newValue) / 2 // algebraic average
        break
      }
      case MAX: {
        cf = Math.max(oldValue, newValue) // maximum
        break
      }
      case MIN: {
        cf = Math.min(oldValue, newValue) // minimum
        break
      }
      default:
        cf = (oldValue / 100) * (100 - newValue) // probability sum
        break
    }
    return cf
  }
  
  start () {
    this.paused = false
    this._error = null
    this.done = false
    this.command = null
    if (!this.knowledgebase) return this.raiseSessionExpiredError()
    while (this.knowledgebase.ruleIndex < this.knowledgebase.rules.length) {
      this.knowledgebase.currentRule = this.knowledgebase.rules[
        this.knowledgebase.ruleIndex
      ]
      this.knowledgebase.ruleIndex++
      if (this.knowledgebase.currentRule.Fired) {
        continue
      }
      this.knowledgebase.currentPrompt = null
      let conditionIndex = 0
      while (
        conditionIndex < this.knowledgebase.currentRule.Conditions.length
      ) {
        this.knowledgebase.currentCondition = this.knowledgebase.currentRule.Conditions[
          conditionIndex
        ]
        conditionIndex++
        const result = this.testPremises()
        if (Boolean(result) === true) {
          const result = this.fireRule(this.knowledgebase.currentCondition.Inferences)
          if(result) return result
        } else if (this.paused) {
          this.knowledgebase.ruleIndex--
          return this.knowledgebase.currentPrompt
        } else if (
          this.knowledgebase.currentRule.Conditions.length <= conditionIndex
        ) {
          const result = this.fireRule(this.knowledgebase.currentRule.AltInferences)
          if(result) return result
        }
        if (this.done) break
      }
      if (this.done) break
    }
    this.knowledgebase.ruleIndex = 0
    return this.knowledgebase.answers
  }

  testPremises () {
    const maxIndex = this.knowledgebase.currentCondition.Premises.length - 1
    let testResult = null  
    for (let index = 0; index <= maxIndex; index++) {
      const Premise = this.knowledgebase.currentCondition.Premises[index]
      if (testResult === true && Premise.Keyword === this.keywords.OR.toUpperCase()) {
        // log(lineText + ': breaking loop...');
        continue
      } else if (testResult === false && Premise.Keyword.toUpperCase() === this.keywords.AND.toUpperCase()) {
        // log(lineText + ': breaking loop...');
        continue
      }

      const leftNodes = this.mapNodes(Premise.Left)
      if (this.paused) return false
      const rightNodes = this.mapNodes(Premise.Right)
      if (this.paused) return false

      const left = this.solve(leftNodes) || ""
      const right = Premise.Right.length > 0 ? this.solve(rightNodes) : true

      const cfLeft = Math.min(this.evaluateCF(Premise.Left))
      const cfRight = Math.min(this.evaluateCF(Premise.Right))
      const cf = Math.min(cfLeft, cfRight)

      if (cf < 100) {
        const mode = Premise.Keyword === this.keywords.OR.toUpperCase() ? MUL : AVE
        let kbCF = this.knowledgebase.CF || 100
        this.knowledgebase.CF = this.calculateCF(kbCF, cf, mode)
      }

      testResult = this.compare(left, right, Premise.Comparator)
    }

    return testResult
  }
  solveAttribute (value, inference) {
    const nodes = this.mapNodes(value)
    const attribValue = this.solve(nodes)
    const attribute = this.knowledgebase.attributes[
      inference.Name.toLowerCase()
    ]

    let newValue = attribute.CF
    this.setAttributeValueAndCF(
      attribute.Name.toLowerCase(),
      attribValue,
      newValue
    )
    this.setAttributeValueAndCF(
      attribute.Name.toLowerCase(),
      attribValue,
      this.knowledgebase.prevCf
    )
    attribute.Value = attribValue
    inference.Value = attribValue
    if (this.knowledgebase.goals[attribute.Name.toLowerCase()]) {
      this.knowledgebase.answers.push({
        Name: attribute.Name,
        Value: attribValue,
        CF: Math.round(this.knowledgebase.CF)
      })
      if (this.knowledgebase.answers.length >=
        Object.getOwnPropertyNames(this.knowledgebase.goals).length) {
        this.fireDoneEvent()
        this.done = true
        return this.knowledgebase.answers // done;
      }
    }
    return false
  }
  fireRule (inferences) {
    this.knowledgebase.currentCondition.isMet = true
    this.knowledgebase.firedRules[
      this.knowledgebase.currentRule.Name
    ] = this.knowledgebase.currentRule

    if (this.knowledgebase.currentRule.Fired) return false
    this.knowledgebase.currentRule.Fired = true

    if (!inferences) return false
    for (let i = 0; i < inferences.length; i++) {
      const inference = inferences[i]
      const value = inference.Value
      if (/^fetch\s[a-zA-Z]+/i.test(inference.Name)) {
        this.command = {
          type: 'command',
          cmd: 'fetch',
          url: inference.Name.split(' ')[1]
        }
        return this.command
      }
      const result = this.solveAttribute(value, inference)
      if(result) return result
    }
    return false
  }

  fireDoneEvent () {
    //this.publish('engine.done', this.knowledgebase.answers, this)
  }
  /**
   * Solves any mathematical expression
   * @param {*} expression Mathimatical expression nodes
   */
  solve (expression) {
    const builder = new Builder()
    const interpreter = new Interpreter()
    const ast = builder.build(expression)
    const result = interpreter.interpret(ast)
    // Math. + PI Random() Cos Sin TAN SQRT E

    return result
  }
  /**
   * Compares left and right side of mathematical expression
   * @param {*} left Left hand side expression
   * @param {*} right Right hand side expression
   * @param {String} compare Comparator
   * @return {Boolean}
   */
  compare (left, right, compare) {
    switch (compare) {
      case "GT":
        return left > right
      case "LT":
        return left < right
      case "IN":
        return Engine.inArray(left, right)
      case "EX":
        return Engine.notInArray(left, right)
      // NEQ
      default:
        return left.toString().toLowerCase() === right.toString().toLowerCase()
    }
  }
  mapNodes (tokens) {
    const nodes = [] //tokens.map(function (token) {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      // console.log( token )
      let value = token.value
      if (token.type === "ATTR") {
        const attribute = this.knowledgebase.attributes[
          token.value.toLowerCase()
        ]

        if (attribute) {
          // console.log( { attribute, token } )
          if (attribute.Value === null && this.knowledgebase.prompts[token.value.toLowerCase()]) {
            // Attribute attribute=this.knowledgebase.attributes.get(token.toLowerCase());
            // if (attribute.Value == null)
            // the attribute has no value assigned yet, then
            // prompt the user and stop processing more this.knowledgebase.rules
            // until input is obtained from user throuh setAttribute();
            this.prompt(token.value)
            this.paused = true
            return null
          } else if (attribute.Value === null) {
            attribute.Value = attribute.Name
          }
          // we are replacing the token that matches the Atribute Name
          // with the Attribute Value for evaluation in the scripting engine
          value = attribute.Value
          // this.knowledgebase.currentCondition.Confidences.push( attribute.CF )
        }
      }
      nodes.push({ type: token.type, value: value })
    }
    // this.knowledgebase.currentCondition.Confidences = confidences
    return nodes
  }
  evaluateCF (tokens) {
    // const confidences = []
    const values = tokens.map((token) => {
      let cf = 100
      if (token.type === "ATTR") {
        const attribute = this.knowledgebase.attributes[
          token.value.toLowerCase()
        ]
        if (attribute) {
          if (attribute.CF) {
            cf = attribute.CF
          }
        }
      }
      return cf
    })
    return values
  }
  prompt (name) {
    const _name = name.toLowerCase().trim()
    const prompt = this.knowledgebase.prompts[_name]
    // console.log({ prompt, name } )
    if (!prompt) {
      return this.raisePromptNotFoundError()
    }
    this.knowledgebase.prompts[_name].Fired = true
    normalize(this.knowledgebase.prompts[_name])
    this.knowledgebase.currentPrompt = this.knowledgebase.prompts[ _name]
    this.knowledgebase.currentPrompt.Index = this.knowledgebase.promptIndex
    //this.publish('engine.prompt', this.knowledgebase.currentPrompt)
    this.knowledgebase.promptIndex++
    // console.log( this.knowledgebase.currentPrompt )
    return this.knowledgebase.currentPrompt
  }
  cfPrompt () {
    const CF_TEXTS = this.CFSettings.CF_TEXTS // ['Absolutely','Very high','High','Good','Fair'];
    const VALUES = this.CFSettings.VALUES // [99,95,85,70,60];

    this.knowledgebase.currentPrompt.Label = "CF"
    this.knowledgebase.currentPrompt.Question = this.CFSettings.QUES // ('How confident are you about your response?');
    this.knowledgebase.currentPrompt.Type = MENU // MENU
    this.knowledgebase.currentPrompt.Min = 1
    this.knowledgebase.currentPrompt.Max = 1
    this.knowledgebase.currentPrompt.CFMode = false
    this.knowledgebase.currentPrompt.Menu = []

    for (let index = 0; index < CF_TEXTS.length; index++) {
      const menu = {
        Index: index + 1, // index of menu item
        Name: CF_TEXTS[index], // menu item number
        Value: VALUES[index], // menu item value
        // Text: CFMenuText[index], //menu item number
        // CFMenuText[index]  //menu item display text
      }
      this.knowledgebase.currentPrompt.Menu.push(menu)
    }

    normalize(this.knowledgebase.currentPrompt)
    this.knowledgebase.currentPrompt.Index = this.knowledgebase.promptIndex
    this.knowledgebase.currentPrompt.Fired = true
    this.knowledgebase.promptIndex++
    return this.knowledgebase.currentPrompt
  }

  /**
   * Sets the Value of the attribute or prompt. Runs the Engine if and
   * only if the current prompt does not need confidence factor input,
   * otherwise, prompt for confidence factor input without running the Engine;
   * @param {Object} value The value of the attribute or prompt.
   * @return {JSON} Result
   * @throws ampani.engine.exception.ScriptExecutionException
   */
  setAttribute (value) {
    if (!this.knowledgebase.currentPrompt) {
      return this.raiseSessionExpiredError()
    }
    const validateResult = this.validator.validate ( value, this.knowledgebase.currentPrompt )
    if (validateResult instanceof ValidationError) {
      return validateResult 
    }
    let computedValue = choice(value, this.knowledgebase.currentPrompt, this.knowledgebase.language)
    if (computedValue instanceof ValidationError) {
      return computedValue
    }
    if (computedValue) {
      computedValue = computedValue instanceof Array ? computedValue.join(";") : computedValue
    }
   
    if (this.knowledgebase.currentPrompt.Label === "CF") {
      this.setAttributeCF(this.knowledgebase.currentPrompt.Name, computedValue)
      this.knowledgebase.currentCondition.Confidences.push(computedValue)
      return this.start()
    }
    this.knowledgebase.attributes[
      this.knowledgebase.currentPrompt.Name.toLowerCase()
    ].Value = computedValue

    if (!this.knowledgebase.currentPrompt.CFMode) {
      this.knowledgebase.currentPrompt = null
      return this.start()
    }
    return this.cfPrompt()
  }

  /**
   * Sets the confidence factor of the prompt/attribute if the value of CF
   * is >= 0. Run the Engine thereafter.
   * @param {String} name The name of the prompt/attribute to set.
   * @param {Number} cf The value of the confidence factor.
   */
  setAttributeCF (name, cf) {
    this.knowledgebase.attributes[name.toLowerCase().trim()].CF = cf
    // this.knowledgebase.currentCondition.Confidences.push( cf )
    this.knowledgebase.currentPrompt = null
    // console.log( this.knowledgebase.currentCondition )
  }
  /**
   * Sets the attribute value and recalculates the confidence factor based
   * on the previous CF and the newly encountered CF.
   * @param {String} name The Attribute name.
   * @param {Number} value The attribute value.
   * @param {Number} cf The newly encountered CF.
   * @param {String} mode The mode to be used in calculating the CF (0-2).
   */
  setAttributeValueAndCF (name, value, cf) {
    // alert( cf )
    const a = this.knowledgebase.attributes[name.toLowerCase().trim()]
    if (!a) return
    this.knowledgebase.attributes[name.toLowerCase().trim()].Value = value
    if (cf > -1 && cf < 100) {
      this.setAttributeCF(name, cf)
      // this.knowledgebase.attributes[name.toLowerCase().trim()].CF = cf;
    } else {
      this.knowledgebase.currentPrompt = null
    }
  }
  /**
   * Test if an Object (value) is in Array (array)
   * @param {Array} array The array containing elemets
   * @param {Object} value The value to check if it exists in array
   * @return true if array contains value else returns false
   */
  static inArray (array, value) {
    return array.includes(value.toLowerCase().trim())
  }
  /**
   * Test if an Object (value) is NOT in Array (array)
   * @param {Array} array The array containing elemets
   * @param {Object} value The value to check if it does not exist in array
   * @return false if array contains value else returns true
   */
  static notInArray (array, value) {
    return !array.includes(value.toLowerCase().trim())
  }

  getConditionCF () {
    let b = 100
    this.knowledgebase.currentCondition.Confidences.forEach(function (d) {
      b = b * (d / 100)
    })
    return b
  }

  run () {
    try {
      let data = this.start()
      return data
    } catch (e) {
      return this.raiseScriptError(e)
    }
  }

  input (input) {
    try {
      // if (kb) this.setKnowledgebase(kb)
      let data = this.setAttribute(input)
      return data
    } catch (e) {
      return this.raiseScriptError(e)
    }
  }

  /**
   * Gets the Knowledgebase of the Engine
   * @return {JSON} Knowledgebase
   */
  getKnowledgebase () {
    return this.knowledgebase
  }

  /**
   * Sets the knowledgebase for Inference Engine
   * @param {JSON} kb Knowledgebase data
   */
  setKnowledgebase (kb) {
    this.knowledgebase = kb
    // this.knowledgebase.promptIndex = 1
    this.CFSettings = promptSettings[this.knowledgebase.language.toLowerCase()]
    this.keywords = keywords[this.knowledgebase.language.toLowerCase()]
  }
}

