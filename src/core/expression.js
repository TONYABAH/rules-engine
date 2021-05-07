export default class Statement {
  constructor (lineIndex) {
    this.line = lineIndex || 0
    this.Index = 0
    this.Keyword = null
    this.Left = null
    this.Right = null
    this.Comparator = null
  }
}
