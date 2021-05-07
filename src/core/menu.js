const characters = ['@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export default class Menu {
  constructor (index, name, value) {
    this.Index = index
    this.Name = name
    this.Value = value
    this.Letter = characters[index]
    // this.Text=displayText||value;
    this.Line = 0
  }
}
