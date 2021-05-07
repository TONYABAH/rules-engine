/* jslint esversion:8 */
'use strict'

function inherits ( ctor, superCtor ) {
  ctor.super_ = superCtor
  ctor.prototype = Object.create( superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  } )
}
function mixin ( obj, mixin ) {
  for ( var key in mixin ) {
    obj[key] = mixin[key]
  }
  return obj
}

function implement ( proto, mixin ) {
  return mixin( proto, mixin )
}

const oop = { inherits, mixin, implement }

export default oop 
