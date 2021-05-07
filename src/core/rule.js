export default class Rule {
  constructor (name) {
    this.Name = name
    this.Fired = false
    this.Texts = []
    this.Line = 0
    this.Index = 0
    this.AltInferences = []
    this.Conditions = []
  }
  addLine (line) {
    this.Texts.push(line)
  }
}
