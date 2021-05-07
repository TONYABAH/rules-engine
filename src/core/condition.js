export default class Condition {
  constructor () {
    this.Inferences = []
    this.Confidences = []
    this.Premises = []
    this.isMet = false
  }
  static getCF (condition) {
    let cf = 100
    condition.confidences.forEach((v) => {
      cf = (v / 100) * cf
    })
    return cf
  }
}
