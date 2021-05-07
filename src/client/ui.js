/*jshint esversion: 6*/
import CustomEvent from '../core/events'
import Rules from '../rules'

export default class Ux extends CustomEvent {
  constructor (el, options = {} ) {
    super()
    this.language = options.language || 'en'
    if (!el) throw ('Missing Element ID to attach UX')
    let node = el instanceof Object ? el : document.getElementById(el)
    if (!node) throw ('ID not a valid Node')

    this.text = options.text || null
    this.data = null
    this.widgets = []
    this.prompt = {}
    this.error = null
    this.display = null
    this.buttons = null
    this.container = null
    this.rules = new Rules(this.language)
   
    this.el = node
    this.el.style.overflow = 'hidden'
    this.loadConsolePanel()
    this.attachListeners()
    this.attachCSS()
    // this.addListeners()
    // if (this.text) this.start(this.text)
  }
  get Text () {
    return this.text
  }
  set Text (text) {
    this.text.text = text
  }
  get URL () {
    return this.url
  }
  set URL (url) {
    this.url = url
  }
  run (codes) {
    this.data = this.rules.compile(codes)
    localStorage.setItem('engine-kb-data', JSON.stringify(this.data))
    this.start()
  }
  start () {
    const response = this.rules.run(this.data)
    this.process(response)
  }
  repeat () {
    let data = localStorage.getItem('engine-kb-data')
    this.data = JSON.parse(data)
    this.start()
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
    let win = window.open("about:blank", "self", "width=600; height=450;", true)
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
      switch (name) {
        case 'ValidationError':
          return this.processValidationError(response)
        case 'SyntaxError':
          return this.processError(response)
        case 'ScriptError':
          return this.processError(response)
        default:
          
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
  attachListeners () {
    this.el.addEventListener("keyup", (e) => {
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

    this.toolbar.addEventListener('click', (e) => {
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

    this.buttons.addEventListener("click", (e) => {
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

  attachCSS () {
    const head = document.head
    const link = document.createElement("style")
    link.type = "text/css"
    link.rel = "stylesheet"
    const css = `
    .pr-copy, 
    .pr-print, 
    .pr-toggle {
      cursor: pointer;
      padding: 2px;
      margin-left: 8px;
      height: 22px;
      width: 22px;
      margin-right: 4px;
    }
    .pr-toggle {
       display: inline-block;
    }
    .pr-copy {
        padding-right: 0px;
        padding-left: 4px;
     }
     .pr-print {
        padding-left: 4px;
        padding-right: 4px;
     }
    .pr-parent {
        border: 0;
        min-width: 240px;
        padding: 2px;
        transition: background 1.8s;
    }
    .pr-container {
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        transition: background 1.8s;
        border: 1px solid #777;
    }
    .pr-banner, 
    .pr-toolbar {
        position: relative
        display: flex;
        align-items: center;
        padding-left: 1rem;
        letter-spacing: 1.4px;
        font-size: 14px;
        align-items: center;

    }
    .pr-banner {
        height: 1.8rem;
        font-weight: 400;
        margin-bottom:0;
        padding-top: 2px;
        font-variant: small-caps;
    }
    .pr-toolbar {
        height: 100%;
        width: 160px;
        text-align: right;
        float: right;
        border-radius:50px;
        padding-right: 17px;
        padding-top: 1px;
        opacity: 0;
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
    }
    .pr-banner:hover > .pr-toolbar {
        transition: all 0.7s;
        opacity: 100%;
    }
    .pr-display {
        position: absolute;
        overflow: auto;
        padding: 4px;
        top: 32px;
        bottom: 32px;
        left: 0;
        right: 0;
        background: #222;
        border-top: 1px solid #777;
        border-bottom: 1px solid #777;
        font-size: 16px;
        letter-spacing: 1.2px;
        color: cadetblue;
        text-shadow: none;
    }
    .pr-display ul {list-style-type:none; border-bottom:0px solid #999;}
    .pr-dispaly ol {border-bottom:0px solid #999; list-style:upper-latin;}
    .pr-display .pr-margin-bottom {border-bottom: 1px solid cadetblue;margin-bottom:5px; padding:5px}
    .pr-input-panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        padding-top: 0;
        padding-left: 7px;
        height: 32px;
    }
    .pr-input-buttons {
      display:inline-block;
      font-weight:bold;
      margin-bottom: 2px;
    }
    .pr-text-input-container {
      padding: 2px 4px;
      background: #999;
    }
    .pr-text-input {
        width: auto;
        max-width: 80px;
        outline: none;
        margin-right: 4px;
        margin-bottom: 2px
        padding-left: 7px;
        background: transparent;
        font-size: 14px;
        height: 16px;
        /*border-radius: 25px 25px;*/
    }
    .pr-link-btn {
        padding: 4px 4px 4px 4px;
        text-decoration: none;
        margin: 1px;
        border-radius: px 2px 2px;
    }
    .pr-char {
        font-size: 1em;
        font-weight: bold;
        color: white;
    }
    .pr-margin-bottom {
       border-bottom: 1px solid #777;
       padding-top: 6px;
       margin-bottom: 8px;
    }
    .gold {
        background: orange;
        transition: background 1.8s;
    } 
    .gold .pr-container{
       background: blanchedalmond;
       transition: background 1.8s;
    }
    .gold .pr-char, .gold .pr-banner {
        color: orange;
         transition: background 1.8s;
    }
    .green {
        background: yellowgreen;
         transition: background 1.8s;
    } 
    .green .pr-container{
       background: lightseagreen;
        transition: background 1.8s;
    }
    .green .pr-char {
        /*color: white;*/
    }
    .blue {
        background: lightskyblue;
         transition: background 1.8s;
    } 
    .blue .pr-container{
       background: lightskyblue;
        transition: background 1.8s;
    }
    .blue .pr-char {
        /*color: black;*/
    }
    .brown {
        background: sandybrown;
         transition: background 1.8s;
    } 
    .brown .pr-container{
       background: rosybrown;
        transition: background 1.8s;
    }
    .brown .pr-char {
       /* color: black;*/
    }
    .dark {
        background: #333;
         transition: background 1.8s;
    } 
    .dark .pr-container{
       background: #444;
        transition: background 1.8s;
    }
    .dark .pr-char {
       /*color: black;*/
    }
    .dark .pr-copy, .dark .pr-print {
        background: white;
         transition: background 1.8s;
    }
    .light {
        background: ccc;
    } 
    .light .pr-container{
       background: #eee;
        transition: background 1.8s;
    }
    .light .pr-char {
       color: lightseagreen;
        transition: color 1.8s;
    }
    .light .pr-banner {
       color: lightseagreen;
        transition: color 1.8s;
    }
    `
    link.append(css)
    head.appendChild(link)
  }

  async loadConsolePanel () {
    const num = Math.random().toString(36)
      .slice(2)
      .toString(36)
    const display_id = `display${num}`,
      inputId = `text${num}`,
      btpanel = `btPanel${num}`,
      container = `container${num}`,
      toolbar = `tb${num}`,
      banner = `banner${num}`

    const panel = `
        <div id = '${container}' class ='pr-container'>
            <div id ='${banner}' class ='pr-banner'>
                <span class="pr-banner-title">Rules Interface</span>
                <div id ='${toolbar}' class ='pr-toolbar'>
                    <btn id="pr-toggle" class="pr-toggle">
                      <svg 
                        height="28px"  
                        width="28px" 
                        viewBox="0 -107 512 512" 
                        xmlns="http://www.w3.org/2000/svg"
                      ><path d="m0 149.332031c0 82.347657 67.007812 149.335938 149.332031 149.335938h213.335938c82.324219 0 149.332031-66.988281 149.332031-149.335938 0-82.34375-67.007812-149.332031-149.332031-149.332031h-213.335938c-82.324219 0-149.332031 66.988281-149.332031 149.332031zm0 0" fill="#607d8b"/><path d="m448 149.332031c0 47.128907-38.203125 85.335938-85.332031 85.335938-47.128907 0-85.335938-38.207031-85.335938-85.335938 0-47.128906 38.207031-85.332031 85.335938-85.332031 47.128906 0 85.332031 38.203125 85.332031 85.332031zm0 0" fill="#fafafa"/></svg>
                    </btn> 
                    <btn id="pr-copy" class="pr-copy">
                        <img width="22px" height="22px" alt="Copy" src="data:image/svg+xml;base64, PHN2ZyBoZWlnaHQ9IjEwMjQiIHdpZHRoPSI4OTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEyOCA3NjhoMjU2djY0SDEyOHYtNjR6IG0zMjAtMzg0SDEyOHY2NGgzMjB2LTY0eiBtMTI4IDE5MlY0NDhMMzg0IDY0MGwxOTIgMTkyVjcwNGgzMjBWNTc2SDU3NnogbS0yODgtNjRIMTI4djY0aDE2MHYtNjR6TTEyOCA3MDRoMTYwdi02NEgxMjh2NjR6IG01NzYgNjRoNjR2MTI4Yy0xIDE4LTcgMzMtMTkgNDVzLTI3IDE4LTQ1IDE5SDY0Yy0zNSAwLTY0LTI5LTY0LTY0VjE5MmMwLTM1IDI5LTY0IDY0LTY0aDE5MkMyNTYgNTcgMzEzIDAgMzg0IDBzMTI4IDU3IDEyOCAxMjhoMTkyYzM1IDAgNjQgMjkgNjQgNjR2MzIwaC02NFYzMjBINjR2NTc2aDY0MFY3Njh6TTEyOCAyNTZoNTEyYzAtMzUtMjktNjQtNjQtNjRoLTY0Yy0zNSAwLTY0LTI5LTY0LTY0cy0yOS02NC02NC02NC02NCAyOS02NCA2NC0yOSA2NC02NCA2NGgtNjRjLTM1IDAtNjQgMjktNjQgNjR6IiAvPgo8L3N2Zz4K">
                    </btn> 
                     <btn id="pr-print" class='pr-print'>
                        <svg width="22px" height="22px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                            <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                            <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M2277.8,4767.1c-130.2-59.8-224.2-149.5-279.7-269l-51.2-106.8V2967.3V1541h-431.3c-239.1,0-499.6-10.7-582.9-21.4c-324.5-47-608.5-256.2-753.7-555.1l-79-160.1V-820.3V-2443l79-160.1c145.2-292.5,424.9-501.7,743-550.9c76.9-12.8,337.3-23.5,582.9-23.5h442v-497.5v-497.5l59.8-117.4c64-128.1,194.3-239.1,320.3-275.4c108.9-29.9,5237.3-29.9,5346.2,0c125.9,36.3,256.2,147.3,320.3,275.4l59.8,117.4v497.5v497.5h444.1c243.4,0,503.9,10.7,580.8,21.4c316,49.1,612.8,273.3,753.7,570.1l68.3,145.2v1622.7V804.4l-68.3,145.2c-140.9,296.8-437.7,521-753.7,570.1c-76.9,10.7-337.3,21.4-580.8,21.4h-444.1v1426.2v1424.1l-51.3,106.8c-55.5,119.6-149.5,209.2-279.7,269c-81.1,38.4-215.6,40.6-2722.2,40.6C2493.4,4807.7,2358.9,4805.6,2277.8,4767.1z M7583.4,4338c42.7-42.7,42.7-70.4,42.7-1419.8V1541H5000H2373.9v1377.1c0,1349.4,0,1377.1,42.7,1419.8c42.7,42.7,70.5,42.7,2583.4,42.7S7540.7,4380.7,7583.4,4338z M9103.6,1067c106.7-32,260.5-166.5,322.4-281.8l47-87.5V-818.2v-1515.9l-47-87.5c-61.9-115.3-215.6-249.8-322.4-281.8c-53.4-17.1-258.4-25.6-567.9-25.6h-482.5v597.8v597.8H5000H1946.8v-597.8v-600l-516.7,6.4c-448.4,6.4-529.5,10.7-595.7,44.8c-100.3,51.3-202.8,151.6-260.5,258.4c-47,87.5-47,89.6-47,1603.4c0,1513.8,0,1515.9,47,1601.3c59.8,113.2,166.5,211.4,284,264.8c96.1,42.7,119.6,44.8,4129.2,44.8C8016.9,1092.7,9039.6,1086.3,9103.6,1067z M7626.1-3017.3c0-1029.1-2.1-1059-42.7-1099.6c-42.7-42.7-70.4-42.7-2583.4-42.7s-2540.7,0-2583.4,42.7c-40.6,40.6-42.7,70.5-42.7,1099.6v1056.9H5000h2626.1V-3017.3z"/><path d="M6964.3-871.6v-213.5H7402h437.7v213.5v213.5H7402h-437.7V-871.6z"/><path d="M2822.2-2515.6v-213.5H5000h2177.8v213.5v213.5H5000H2822.2V-2515.6z"/><path d="M2822.2-3391v-213.5H5000h2177.8v213.5v213.5H5000H2822.2V-3391z"/></g></g>
                        </svg>
                    </btn> 
                </div>
            </div>
            
            <div id ='${display_id}' class ='pr-display'></div>
            <div id ='${btpanel}' class ='pr-input-panel'>
            <span class='pr-text-input-container'>
              <input id ='${inputId}' class ='pr-text-input' type='text'/>
            </span> 
            <span class='pr-input-buttons'>
                <a href='javascript:void(0)' title='Send' class='pr-link-btn'><span class='pr-char'>&check;</span></a>
                <a href='javascript:void(0)' title='Why ask?' class='pr-link-btn'><span class='pr-char'>&quest;</span></a>
                <a href='javascript:void(0)' title='Explain' class='pr-link-btn'><span class='pr-char'>&excl;</span></a>
                <a href='javascript:void(0)' title='Disconnect' class='pr-link-btn'><span class='pr-char'>&times;</span></a>
                <a href='javascript:void(0)' title='Repeat' class='pr-link-btn'><span class='pr-char' style="font-size:1.5rem">&#8227;</span></a>
            </span>
          </div>
        </div>`
    this.el.innerHTML = panel
    this.el.classList.add('pr-parent')
    this.theme = 'dark'
    // this.el.classList.add(this.theme)
    this.display = document.getElementById(display_id)
    this.input = document.getElementById(inputId)
    this.buttons = document.getElementById(btpanel)
    this.banner = document.getElementById(banner)
    this.toolbar = document.getElementById(toolbar)

    this.printBtn = document.getElementById('pr-print')
    this.printBtn.addEventListener('mousedown', (e) => {
      this.print()
      e.preventDefault()
      e.stopPropagation()
    })
    this.copyBtn = document.getElementById('pr-copy')
    this.copyBtn.addEventListener('mousedown', (e) => {
      this.copy()
      e.preventDefault()
      e.stopPropagation()
    })
    this.toggleBtn = document.getElementById('pr-toggle')
    this.toggleBtn.addEventListener('mousedown', (e) => {
      //console.log(e.target)
      this.toggleTheme()
      e.preventDefault()
      e.stopPropagation()
    })
    this.input.focus()
    this.container = document.getElementById(container)
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
    // console.log(this.theme, this.el)
    this.el.classList.toggle(this.theme)
  }
  get theme () {
    return this._theme
  }
  set theme (color) {
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
  stylePanel (runpanel) {
    runpanel.style.position = "absolute"
    runpanel.style.top = "0"
    runpanel.style.left = "0"
    runpanel.style.right = "0"
    runpanel.style.bottom = "0"
    runpanel.style.overflow = "auto"
    runpanel.style.paddingLeft = runpanel.style.paddingRight = "5px"
    runpanel.style.background = "inherit"
  }
  styleDisplay (display) {
    display.style.position = "absolute"
    display.style.top = "4px"
    display.style.left = "0"
    display.style.right = "0"
    display.style.bottom = "48px"
    display.style.overflow = "auto"
    display.style.paddingLeft = display.style.paddingRight = "16px"
  }
  styleInput (input) {
    input.style.color = "#000"
    input.style.background = "#999"
    input.style.border = "1px solid #333"
    input.style.marginRight = "7px"
    input.style.borderRadius = "15px"
    input.style.padding = "4px 4px 4px 12px"
  }
  styleLinks (doc) {
    let links = doc.getElementsByTagName("a")
    for (let i = 0; i < links.length; i++) {
      let link = links[i]
      link.style.padding = "4px 8px 4px 8px"
      link.style.textDecoration = "none"
      link.style.color = "inherit"
      link.style.margin = "1px"
      link.style.borderRadius = "2px 2px"
    }
    let btns = doc.getElementsByClassName("char")
    for (let i = 0; i < btns.length; i++) {
      let link = links[i]
      link.style.fontSize = "2em"
      link.style.fontWeight = "bold"
    }
    return doc
  }

 /* addListeners () {
    this.rules.on("error", (e) => {
      this.processError(e)
    })
    this.rules.on("syntax-error", (e) => {
      // this.processParserErrors(e.msg )
      // this.processError( e )
      console.log(e)
      this.processError(e)
    })
    this.rules.on("system-error", (e) => {
      // this.processError( e )
      this.processError(e)
      console.log(e)
    })
    this.rules.on("validation-error", (e) => {
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
  }*/
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
    this.appendToContent("<div>" + error + "</div>")
  }
  processError (error) {
    // console.log(JSON.stringify(error))
    this.input.value = ""
    this.input.focus()
    this.appendToContent("<div>" + (error[0].text || JSON.stringify(error)) + "</div>")
    // this.display.innerHTML += "<br/>" + ( error.msg || error )
  }
  processParserErrorsXXX (errors) {
    if (!errors) {
      this.appendToContent("<div>System error</div>")
      return
    }
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
  processScriptErrorXXX (error) {
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
      display.push(" - confidence: " + goal.CF + "%")
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


