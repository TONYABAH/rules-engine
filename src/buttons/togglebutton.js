import { attachCSS } from './css.js'
const style = `
  <style>
    .tgl {
        display: none;
    }
    .tgl, .tgl:after, .tgl:before, .tgl *, .tgl *:after, .tgl *:before, .tgl + .tgl-btn {
        box-sizing: border-box;
    }
    .tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl *::selection, .tgl *:after::selection, .tgl *:before::selection, .tgl + .tgl-btn::selection {
        background: none;
    }
    .tgl + .tgl-btn {
        outline: 0;
        display: block;
        width: 3em;
        height: 1.65em;
        position: relative;
        cursor: pointer;
        user-select: none;
        background: black;
    }
    .tgl + .tgl-btn:after, .tgl + .tgl-btn:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
        background: red;
    }
    .tgl + .tgl-btn:after {
        left: 0;
    }
    .tgl + .tgl-btn:before {
        display: none;
    }
    .tgl:checked + .tgl-btn:after {
        left: 50%;
    }

      /*************** LIGHT *****************/
    .tgl-light + .tgl-btn {
        border-radius: 2em;
        padding: 2px;
        transition: all 0.4s ease;
    }
    .tgl-light + .tgl-btn:after {
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    .tgl-light:checked + .tgl-btn {
        background: #9fd6ae;
        background:  white;
    }

    /*************** IOS *****************/
    .tgl-ios + .tgl-btn {
        border-radius: 2em;
        padding: 2px;
        transition: all 0.4s ease;
        border: 1px solid #e8eae9;
        border: 1px solid  #777;
    }
    .tgl-ios + .tgl-btn:after {
        border-radius: 2em;
        transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 4px 0 rgba(0, 0, 0, .08);
    }
    .tgl-ios + .tgl-btn:hover:after {
        will-change: padding;
    }
    .tgl-ios + .tgl-btn:active {
        box-shadow: inset 0 0 0 2em #e8eae9;
    }
    .tgl-ios + .tgl-btn:active:after {
        padding-right: 0.8em;
    }
    .tgl-ios:checked + .tgl-btn {
        background: #1a899c;
        background: white;
    }
    .tgl-ios:checked + .tgl-btn:active {
        box-shadow: none;
    }
    .tgl-ios:checked + .tgl-btn:active:after {
        margin-left: -0.8em;
    }

      /*************** SKEWED *****************/
    .tgl-skewed + .tgl-btn {
        overflow: hidden;
        transform: skew(-10deg);
        backface-visibility: hidden;
        transition: all 0.2s ease;
        font-family: sans-serif;
        background: #888;
    }
    .tgl-skewed + .tgl-btn:after, .tgl-skewed + .tgl-btn:before {
        transform: skew(10deg);
        display: inline-block;
        transition: all 0.2s ease;
        width: 100%;
        text-align: center;
        position: absolute;
        line-height: 2em;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 1px 0 rgba(0, 0, 0, .4);
    }
    .tgl-skewed + .tgl-btn:after {
        left: 100%;
        content: attr(data-tg-on);
    }
    .tgl-skewed + .tgl-btn:before {
        left: 0;
        content: attr(data-tg-off);
    }
    .tgl-skewed + .tgl-btn:active {
        background: #888;
    }
    .tgl-skewed + .tgl-btn:active:before {
        left: -10%;
    }
    .tgl-skewed:checked + .tgl-btn {
        background: #1a899c;
        background: white;
    }
    .tgl-skewed:checked + .tgl-btn:before {
        left: -100%;
    }
    .tgl-skewed:checked + .tgl-btn:after {
        left: 0;
    }
    .tgl-skewed:checked + .tgl-btn:active:after {
        left: 10%;
    }

      /*************** FLAT *****************/
    .tgl-flat + .tgl-btn {
        padding: 2px;
        transition: all 0.2s ease;
        background: #fff;
        border: 4px solid #999;
        border-radius: 2em;
    }
    .tgl-flat + .tgl-btn:after {
        transition: all 0.2s ease;
        background: #777;
        content: "";
        border-radius: 1em;
    }
    .tgl-flat:checked + .tgl-btn {
        border: 4px solid #7fc6a6;
    }
    .tgl-flat:checked + .tgl-btn:after {
        left: 50%;
        background: #1a899c;
        background: white;
    }

      /*************** FLIP *****************/
    .tgl-flip + .tgl-btn {
        padding: 2px;
        transition: all 0.2s ease;
        font-family: sans-serif;
        perspective: 100px;
    }
    .tgl-flip + .tgl-btn:after, .tgl-flip + .tgl-btn:before {
        display: inline-block;
        transition: all 0.4s ease;
        width: 100%;
        text-align: center;
        position: absolute;
        line-height: 2em;
        font-weight: bold;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        border-radius: 4px;
    }
    .tgl-flip + .tgl-btn:after {
        content: attr(data-tg-on);
        background: #1a899c;
        background: white;
        transform: rotateY(-180deg);
    }
    .tgl-flip + .tgl-btn:before {
        background: #ff3a19;
        content: attr(data-tg-off);
    }
    .tgl-flip + .tgl-btn:active:before {
        transform: rotateY(-20deg);
    }
    .tgl-flip:checked + .tgl-btn:before {
        transform: rotateY(180deg);
    }
    .tgl-flip:checked + .tgl-btn:after {
        transform: rotateY(0);
        left: 0;
        background:  #1a899c;
        background: white;
    }
    .tgl-flip:checked + .tgl-btn:active:after {
        transform: rotateY(20deg);
    }
  </style>`

function attachCSSXXX (css, id, name, toggle = false) {
  if (id) {
      for (var i = 0; i < document.styleSheets.length; i++) {
          if (document.styleSheets[i].id === id) {
              if (!toggle) {
                  return null
              }
          }
      }
  }
  if (toggle) {
      if (document.getElementById(id)) {
          document.head.removeChild(document.getElementById(id))
          return
      }
  }
  var head = document.head
  var link = document.createElement("style")
  link.setAttribute('id', id || Math.random().slice(2).toString(36))
  link.setAttribute('name', name || 'css')

  link.type = "text/css"
  link.rel = "stylesheet"
  link.innerHTML = css

  head.appendChild(link)
  return id
}
export default class ToggleButton {
  /**
   * Constructor
   * @param {String} id The identifier of this Button: 
   *  if null, random id will be generated
   * @param {String} name Name of the type of Toggle Button: should be one of
   *  light, ios, flat, flip, skewed: default is flat.
   * @param {String} offId Title when Toggle is Off: default is Off.
   * @param {String} onId Title when Toggle is On: default is On.
   */
  constructor (id, name, offId, onId, title) {
    this.id = id || Math.random().toString(36).slice(2)
    this.name = name || 'ios'
    this.offId = offId || 'Off'
    this.onId = onId || 'On'
    this.title = title || 'Toggle'
    this.buttonId = `tglbtn${this.id}`
    this.inputId = `tgl${this.id}`
    this.doc = ''
    this.init()
  }
  init () {
    let doc = document.createDocumentFragment()

    let input = document.createElement('input')
    input.id = this.inputId
    input.className = `tgl tgl-${this.name}`
    input.type = 'checkbox'
    input.setAttribute('hidden', '')

    let label = document.createElement('label')
    label.id = this.buttonId
    label.setAttribute('data-tg-off', this.offId)
    label.setAttribute('data-tg-on', this.onId)
    label.className = 'tgl-btn'
    label.setAttribute('for', this.inputId)
    label.setAttribute('title', this.title)

    doc.append(input)
    doc.append(label)
    this.doc = doc
    attachCSS(style, 'ToggleButtonCSS', 'TogleButtonCSS')
  }
}