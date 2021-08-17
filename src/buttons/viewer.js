import PrintButton from './printbutton'
export default class Viewer {
  /**
   * 
   * @param {Object} view The HTML element to attach highlighter
   * @param {String} title Name of the script language: default is kbf
   */
  constructor (view, container, title) {
    if (!view || (!view.tagName && !document.getElementById(view))) {
      console.error('Invalid Document Viewer Id', view)
      return
    }
    if (!container || (!container.tagName && !document.getElementById(container))) {
      console.error('Invalid Container Element Id', contaianer)
      return
    }
    this.div = view.tagName ? view : document.getElementById(view)
    this.container = container.tagName ? container : document.getElementById(container)
    this.id = null
    this.banner = null
    this.title = title
    this.color = view.style.color || container.style.color || 'green'
    this.printButton = new PrintButton(this.color, this.div)
    this.view()
  }
  get Text () {
    return this.getContentBlock().innerText
  }
  get html () {
    return this.getContentBlock().innerHTML
  }
 
  view () {
    this.text = this.div.innerHTML
    this.id = Math.random().toString(36).slice(2)
    // let btn = new ToggleButton(null, 'ios')
    let banner = document.createElement('div') 
    banner.setAttribute('id', `banner${this.id}`)
    banner.style.float = 'right'
    banner.append(this.printButton.ClipboardButton)
    banner.append(this.printButton.OpenButton)
    banner.append(this.printButton.PrintButton)
    this.container.append(banner)
  }
  getContentBlock () {
    return document.querySelector('.pr-display')
  }
}
