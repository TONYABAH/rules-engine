import Constants from "./Constants"

const MAX_CHARS = 256

export default class Prompt {
  constructor (name) {
    // this.code = 200
    this.Line = null
    this.Index = 0
    this.Label = 'Prompt'
    this.Fired = false
    this.Name = name
    this.Question = null
    this.CFMode = false
    this.Type = Constants.NUMBER
    this.Menu = []
    this.Min = null// = (Number.MIN_VALUE);
    this.Max = null// = (Number.MAX_VALUE);
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
