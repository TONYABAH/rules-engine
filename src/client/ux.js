/*jshint esversion: 6*/
import CustomEvent from '../core/events.js'
import Rule from '../rules'
import Viewer from '../buttons/viewer.js'
// import de from '../plugins/language/de'

export default class Ux extends CustomEvent {
  constructor (el, options = {}) {
    super()
    this.language = options.language || 'en'
    if (!el) throw ('Missing Element ID to attach UX')
    let node = el instanceof HTMLElement ? el :
      typeof el === 'string' ? document.getElementById(el) :
        el
    if (!node || !node instanceof HTMLElement) throw ('ID not a valid Node')

    this.el = node
    this.el.style.overflow = 'hidden'

    this.text = options.text || null
    this.data = null
    this.widgets = []
    this.prompt = {}
    this.error = null
    this.display = null
    this.buttons = null
    this.container = null
    this.toolbar = null
    this.rules = Rule(this.language, ['fr', 'de', 'cn'])
    this.init()
  }
  get Text () {
    return this.text
  }
  set Text (text) {
    this.text = text
  }
  get URL () {
    return this.url
  }
  set URL (url) {
    this.url = url
  }
  async run (text) {
    try {
      this.text = text
      this.data = await this.rules.compile(text)
      this.start()
    } catch (e) {
      // console.log(e)
      const response = {
        name: 'ScriptError',
        code: 'ScriptError',
        message: e
      }
      this.processParserErrors(e)
    }
  }
  start () {
    const response = this.rules.run(this.data)
    this.process(response)
  }
  async repeat () {
    await this.run(this.text)
    // this.start()
  }
  reply (input) {
    const response = this.rules.reply(this.data, input)
    this.process(response)
  }
  send () {
    if (!this.data) {
      return console.info("No language defined in kb", console.trace)
    }
    let msg = null
    if (this.prompt.Type === "NUMBER" || this.prompt.Type === "TEXT") {
      msg = this.input.value
    } else {
      msg = this.composeReply()
    }
    if (!msg) return
    this.setMargin()
    this.input.value = ""
    this.reply(msg)
  }

  why () {
    //ps.publish( 'why' )
  }
  stop () {
    //ps.publish( 'stop' )
  }
  explain () {
    //ps.publish( 'explain' )
  }
  cancel () {
    this.display.innerHTML = ""
  }
  print () {
    let html = this.display.innerHTML
    let win = window.open("about:blank", "self", "width=600; height=450;")
    win.document.writeln(html)
    win.print()
    win.close()
  }
  copy () {

  }
  process (response) {
    // console.log({ response })
    if (response.Label === 'Prompt' || response.Label === 'CF') {//Prompting for input
      return this.processPrompt(response)
    } else if (response instanceof Array) {//answers are ready
      return this.processAnswers(response)
    } else {
      // console.log(response.name)
      switch (response.name) {
        case 'ValidationError':
          return this.processValidationError(response)
        case 'SyntaxError':
          return this.processParserErrors(response)
        case 'ScriptError':
          return this.processError(response)
        default:
          return this.processError(response)
      }
    }
  }
  attachScripts (scr, id, name) {
    var head = document.body
    var link = document.createElement("script")
    link.type = "text/javascript"
    link.id = id || Math.random().slice(2).toString(36)
    link.name = name || 'script' + link.id
    link.append(scr)
    head.appendChild(link)
  }
  async init () {
    this.el.classList.add('pr-parent')
    this.theme = 'dark'
    this.display = document.getElementById('console-display')
    this.input = document.getElementById('console-input')
    this.buttons = document.getElementById('console-btpanel')
    this.banner = document.getElementById('console-banner')
    this.toolbar = document.getElementById('console-toolbar')

    new Viewer(this.display, this.toolbar)
    this.input.focus()
    this.container = document.getElementById('console-container')
    this.attachListeners(this.el, this.toolbar, this.buttons)
    this.addListeners()
    // let doc = document.createDocumentFragment()
    // let runpanel = doc.getElementById( container )
    // let input = doc.getElementById( inputId )
    // this.stylePanel( runpanel )
    // this.styleDisplay( display )
    // this.styleInput( input )
    // this.styleLinks( doc )
    // console.log( document.getElementsByClassName( 'gold' )[0].style.background='lavender' )
  }
  toggleTheme () {
    this.el.classList.toggle(this.Theme)
  }
  get Theme () {
    return this._theme
  }
  set Theme (color) {
    // dark themes: green, blue, red, purple, indigo, orange
    // light themes: white, silver, gold, lavendar
    if (color) {
      color = color.toLowerCase()
    }
    if (this.theme === color) {
      this.el.classList.remove(this.theme)
      return
    }
    this.el.classList.add(color)
    this._theme = color
  }
  attachListeners (el, toolbar, buttons) {
    el.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        if (e.target.type === "radio" || e.target.type === "checkbox") {
          this.send()
        } else if (e.target.type === "text") {
          this.send()
        } else {
          e.target.click()
        }
      } else {
        //do nothing
      }
      e.preventDefault()
      e.stopPropagation()
    })

    toolbar.addEventListener('click', (e) => {
      switch (e.target.id) {
        case 'pr-print':
          this.print()
          break
        case 'pr-copy':
          this.copy()
          break
        default: void (0)
      }
      e.stopPropagation()
      e.preventDefault()
    })

    buttons.addEventListener("click", (e) => {
      switch (e.target.innerText) {
        case "✓":
          this.send()
          break
        case "?":
          this.why()
          break
        case "!":
          this.explain()
          break
        case "×":
          this.cancel()
          break
        case "‣":
          this.repeat()
          break
        case "⛔":
          this.stop()
          break
        default:
          //do nothing
          return
      }
      this.input.focus()
      e.preventDefault()
      e.stopPropagation()
    })
  }
  addListeners () {
    this.on("error", (e) => {
      this.processError(e)
    })
    this.on("syntax-error", (e) => {
      // this.processParserErrors(e.msg )
      // this.processError( e )
      // console.log(e)
      // this.processError(e)
    })
    this.on("system-error", (e) => {
      // this.processError( e )
      this.processError(e)
      // console.log(e)
    })
    this.on("validation-error", (e) => {
      this.processValidationError(e)
    })
    this.on("prompt", (e) => {
      this.processPrompt(e)
    })
    this.on("answers", (e) => {
      this.display.innerHTML = ""
      this.processAnswers(e)
    })
    this.on("message", (e) => {
      this.appendToContent("<h6>" + e.msg || e + "</h6>")
    })
    this.on("done", () => {
      this.display.innerHTML = ""
    })
  }
  processPrompt (prompt) {
    this.prompt = prompt
    let id = Math.floor(Math.random() * 99999999999999).toString(36)
    this.disableInputs()
    this.appendToContent('<div ><span id = "' + id + '" contentEditable="true">' + prompt.Index + ". " + prompt.Question + "</span></div>", true)

    switch (prompt.Type) {
      case "MENU":
      case "CF":
      case "YN":
      case "TF":
        this.showMenu(prompt, false)
        break
      case "NUMBER":
      case "TEXT":
      default:
    }
    this.input.focus()
    // let el = document.getElementById( id )
    // el.scrollIntoView()
  }
  processValidationError (error) {
    this.input.value = ""
    this.input.focus()
    // this.appendToContent("<div>" + error + "</div>")
    this.appendToContent("<div>" + error.name + ': ' + error.code + '.<br/>Details: ' + error.message + ".</div>")
  }
  processError (error) {
    // console.log(JSON.stringify(error))
    this.input.value = ""
    this.input.focus()
    this.appendToContent("<div>" + error.name + ': ' + error.code + '.<br/>Details: ' + error.message + ".</div>")
    // this.display.innerHTML += "<br/>" + ( error.msg || error )
  }
  processParserErrors (errors) {
    if (!errors) {
      this.appendToContent("<div>System error</div>")
      return
    }
    console.log(errors)
    errors.forEach((e) => {
      var x = e.x === undefined ? e.column : e.x
      var y = e.y === undefined ? e.row : e.y
      var s =
        "<br/><i style='color:red;' class='fa fa-times'></i> '" +
        e.text +
        "'<br/> <i style='color:blue;' class='fa fa-anchor'></i> <a href='javascript:void()' onclick='selectLine(" +
        y +
        ")'>" +
        "Line: " +
        (y * 1 + 1) +
        " Column: " +
        (x + 1) +
        "</a> <br/><i class='fa fa-code'></i> <a href ='javascript:void()' onclick='selectLine(" +
        y +
        ")'>" +
        e.text +
        "</a>"
      this.display.innerHTML += s + "<br/>"
      this.scrollDown("Error")
    })
  }
  processScriptError (error) {
    if (!error) {
      this.appendToContent("<div>System error</div>")
      return
    }
    var code = error.code
    //var lang='en';
    var msg = error.message
    //var expr='';
    var line = error.details.line
    var lineIndex = error.details.index
    var rIndex = error.details.rIndex
    var rule = error.details.rule
    try {
      var s =
        "<br/><strong>" +
        code +
        "<br/>Row:&Tab; <a href='javascript:selectLine(" +
        lineIndex +
        ")'>" +
        lineIndex +
        "</a><br/>Details:&Tab;<strong>" +
        msg +
        "</strong>" +
        "<br/>Code:&Tab;&Tab;<a href ='javascript:selectLine(" +
        lineIndex +
        ")'>" +
        line +
        "</a>" +
        "<br/>Rule number:&Tab;<strong>" +
        rIndex +
        "</strong>" +
        "<br/>Rule:&Tab;&Tab;<a href ='javascript:selectLine(" +
        lineIndex +
        ")'>" +
        rule +
        "</a><br/><hr/><p><p>"
      this.display.append(s)
      window.setTimeout(function () {
        window.Editor.resize()
        window.setTimeout(function () {
          this.scrollDown("content")
        }, 200)
      }, 200)
    } catch (ex) {
      console.log(ex)
    }
  }
  processAnswers (answers) {
    this.disableInputs()
    if (answers.length === 0) return
    var display = ["<div class='conclusion'>"]
    display.push("<span>Conclusion</span>")
    answers.forEach(function (goal) {
      display.push("<br/>" + goal.Name)
      display.push(": " + goal.Value)
      display.push(" - confidence: " + (goal.CF===NaN ? 100:goal.CF) + "%")
    })
    display.push("</div>")

    this.appendToContent(display.join(" "))
    //  this.setMargin()
    // this.scrollDown()
  }
  processInfo (data) {
    //content.append("<hr/>");
    var rand2 = Math.random().slice(2).toString(36)
    this.appendToContent("<div><b>" + data.msg + "</b></div>")
    if (
      data.msg.indexOf("Session expired") > -1 ||
      data.msg.indexOf("No session") > -1
    ) {
      var link1 =
        "<a href='javascript:void (0)'  id='" +
        rand2 +
        "' class='active-link opensocket'>Click here to start new session</a>"
      this.appendToContent("<div><b>" + link1 + "</b></div>")

      document.getElementById(rand2).onclick(function () {
        this.open()
      })
    }
  }
  addClickListener (fn) {
    let tags = this.el.getElementsByTagName("ul")
    let last = tags[tags.length - 1]
    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i]
      if (node && node.children) {
        let el = node.children[0].firstChild
        el.addEventListener("click", fn)
      }
    }
  }
  disableInputs () {
    let tags = this.el.getElementsByTagName("ul")
    let last = tags[tags.length - 1]
    if (!last) return
    this.widgets.forEach((w) => {
      w.setAttribute("checked", true)
    })
    this.widgets = []
    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i]
      if (node && node.children) {
        let el = node.children[0].firstChild
        el.disabled = true
      }
    }
  }
  composeReply () {
    let tags = this.el.getElementsByTagName("ul")
    let last = tags[tags.length - 1]
    if (!last) return null
    let resp = {}
    let index = 0
    for (let i = 0; i < last.childNodes.length; i++) {
      let node = last.children[i]
      if (node && node.children) {
        let el = node.children[0].firstChild
        index++
        if (el.checked) {
          resp[el.value] = index
          this.widgets.push(el)
        } else {
          delete resp[el.value]
        }
      }
    }

    return Object.values(resp).join(",")
  }
  composeMenuWidget (prompt) {
    let name = Math.floor(Math.random() * 9999999999999).toString(36)
    let array = []
    if (prompt.Max > 1) {
      array = this.composeCheckBoxes(prompt, name)
    } else {
      array = this.composeRadioButtons(prompt, name)
    }
    var ol = '<ul>' + array.join(" ") + "</ul>"
    this.appendToContent(ol, true)
  }
  composeCheckBoxes (prompt, name) {
    return prompt.Menu.map((m) => {
      return (
        '<li><label><input type = "checkbox" name="' + name + '" value="' +
        m.Name + '"/><span style="margin-left:7px;">' + m.Name + "</span></label></li>"
      )
    })
  }
  composeRadioButtons (prompt, name) {
    return prompt.Menu.map((m) => {
      return (
        '<li><label><input type = "radio" name="' +
        name +
        '" value="' +
        m.Name +
        '"/><span style="margin-left:7px;">' +
        m.Name +
        "</span></label></li>"
      )
    })
  }
  showMenu (prompt, commandline) {
    if (!commandline)
      return this.composeMenuWidget(prompt)
    let array = prompt.Menu.map((m) => {
      return "<li>" + m.Name + "</li>"
    })
    var ol = '<ol >' + array.join(" ") + "</ol>"
    this.appendToContent(ol, true)

    return null
  }

  appendToContent (node, scroll = true) {
    if (node && node.classList) {
      node.classList.add("pr-console-line")
    }
    this.display.innerHTML += node
    if (scroll) this.scrollDown("content")
  }
  setMargin () {
    var el = this.display
    var child = el.lastChild
    if (child && child.classList) {
      child.classList.add("pr-margin-bottom")
      //child.style.borderBottom = "1px solid #777"
      //child.style.paddingTop = "6px"
      //child.style.marginBottom = "8px"
    }
  }
  scroll (direction) {
    var el = this.display
    if (direction === "up") {
      el.scrollTop = 0
    } else {
      el.scrollTop = el.scrollHeight
    }
  }
  scrollDown () {
    var el = this.display
    var child = el.lastChild
    try {
      if (child) {
        child.scrollIntoView()
      } else {
        el.scrollTop = el.scrollHeight
      }
    } catch (e) {
      void e
    }
  }

  scrollUp () {
    var el = this.display
    var child = el.firstChild

    if (child) {
      child.scrollIntoView()
    } else {
      el.scrollTop = el.scrollHeight
    }
  }

  showInputBar () {
    //var a0="<input type='text' class='input'/><br/> ";
    //var a1=(' <a href=\'javascript:void(0)\' onclick=\'ui.send()\'>Send</a> ');
    var a2 = " <a href='javascript:void(0)'onclick='disconnect()' >Disconnect</a> "
    var a3 = " <a href='javascript:void(0)'onclick='open()' >Restart</a>  "
    var a4 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> "
    var ol = " <div id='input-bar'><input type='text' class='input'/>" + a2 + a3 + a4 + "</div></br/>"
    this.appendToContent(ol)
  }

  showTaskBar () {
    //ol.append("<input type='text' class='input' onkeyUp='inputKeyup("+event+")'/> ");
    //ol.append(" <a href='javascript:void(0)' onclick='submmitClick'>Send</a> ");
    //ol.append(" <a href='javascript:void(0)' onclick='disconnect'>Disconnect</a> ");
    var a1 = " <a href='javascript:void(0)' onclick='connectClick()'>Restart</a> "
    var a2 = " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> "
    var ol = "<div id='input-bar'>" + a1 + a2 + "</div>"
    this.appendToContent(ol)
  }
}


