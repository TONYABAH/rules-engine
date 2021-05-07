
/* jshint esversion:8*/
// Numbers
const Zero = /0/
const DecInt = /[1-9][0-9]*/
const OctalInt = /0[0-7]+/
const HexInt = /0[xX][0-9a-fA-F]+/
export const Integer = '(?:'+Zero.source+'|'+DecInt.source+'|'+OctalInt.source+'|'+HexInt.source+ ')[lL]?'
const Exponent = /[eE][+-]?[0-9]/
const Float1 = '[0-9]+.[0-9]+('+Exponent.source+')?'
const Float2 = '.[0-9]+('+Exponent.source+')?'
const Float3 = '[0-9]+.'+Exponent.source
const Float4 = '[0-9]+'+Exponent.source
export const Float = '(?:'+Float1+'|'+Float2+'|'+Float3+'|'+Float4+')[fFdD]?|[0-9]+[fFDd]'
export const Numeric = Float +'|'+Integer
// URL
const ident = /[a-zA-Z_-]+/
const protocol = /(?:(?:https|http|ftp|ftps):\/\/)/
const domain = '(?:'+ident.source + '(?:\\.'+ident.source+')+)|localhost(?:\\:[1-9][0-9]+)?'
// var path= "(?:\\/"+ident.source+")|\\/?";
export const url = protocol.source+domain
// import { formatMessage } from '../validator.js'
export const MATH_CONSTS = {
  E: 'Math.E',
  LN2: 'Math.LN2',
  LN10: 'Math.LN10',
  LOG2E: 'Math.LOG2E',
  LOG10E: 'Math.LOG10E',
  PI: 'Math.PI',
  SQRT1_2: 'Math.SQR1_2',
  SQRT2: 'Math.SQRT2'
}
export const MATH_FUNCS = {
  abs: 'Math.abs',
  acos: 'Math.acos',
  acosh: 'Math.acosh',
  asin: 'Math.asin',
  asinh: 'Math.asinh',
  atan: 'Math.atan',
  atanh: 'Math.atanh',
  atan2: 'Math.atan2', //(x, y)
  cbrt: 'Math.cbrt',
  ceil: 'Math.ceil',
  clz32: 'Math.clz32',
  cos: 'Math.cos',
  cosh: 'Math.cosh',
  exp: 'Math.exp',
  expm1: 'Math.expm1',
  floor: 'Math.floor',
  fround: 'Math.fround',
  hypot: 'Math.hypot', //([x[, [y, ...]]])
  imul: 'Math.imul', // (x, y)
  log: 'Math.log',
  ln: 'Math.ln',
  log1p: 'Math.log1p',
  log10: 'Math.log10',
  log2: 'Math.log2',
  max: 'Math.max', //([x[, [y, ...]]])
  min: 'Math.min', //([x[, [y, ...]]])
  pow: 'Math.pow', // (x, y)
  random: 'Math.random',
  round: 'Math.round', // (x)
  sign: 'Math.sign', // (x)
  sin: 'Math.sin', // (x)
  sinh: 'Math.sinh', // (x)
  sqrt: 'Math.sqrt', // (x)
  tan: 'Math.tan',
  tanh: 'Math.tanh',
  trunc: 'Math.trunc', //(x)
}
