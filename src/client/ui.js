/*jshint esversion: 6*/
import CustomEvent from "../util/eventbus";
import Rules from "../Rules";
import Viewer from "../buttons/viewer";
import Rule from "../core/Rule";

export default class Ui extends CustomEvent {
    constructor(el, options = {}) {
        super();
        this.language = options.language || "en";
        Rule.init(["fr", "es"]);
        if (!el) throw "Missing Element ID to attach UX";
        let node =
            el instanceof HTMLElement
                ? el
                : typeof el === "string"
                ? document.getElementById(el)
                : el;
        if (!node || !node instanceof HTMLElement) throw "ID not a valid Node";
        this.el = node;
        this.el.style.overflow = "hidden";
        this.text = options.text || null;
        this.data = null;
        this.widgets = [];
        this.prompt = {};
        this.error = null;
        this.display = null;
        this.buttons = null;
        this.container = null;
        this.rules = new Rules(this.language);
        this.loadConsolePanel();
        this.attachListeners();
        this.attachCSS();
        this.addListeners();
        // if (this.text) this.start(this.text)
    }
    get Text() {
        return this.text;
    }
    set Text(text) {
        this.text = text;
    }
    get URL() {
        return this.url;
    }
    set URL(url) {
        this.url = url;
    }
    async run(codes) {
        this.codes = codes;
        const { errors, data } = await this.rules.compile(codes);
        this.data = data;
        this.errors = errors;

        this.start(data);
    }
    start(data) {
        const response = this.rules.run(data);
        this.process(response);
    }
    async repeat() {
        // let data = localStorage.getItem('engine-kb-data')
        // this.data = JSON.parse(data)
        await this.run(this.codes);
    }
    reply(input) {
        const response = this.rules.reply(this.data, input);
        this.process(response);
    }
    send() {
        if (!this.data) {
            return console.info("No language defined in kb", console.trace);
        }
        let msg = null;
        if (this.prompt.Type === "NUMBER" || this.prompt.Type === "TEXT") {
            msg = this.input.value;
        } else {
            msg = this.composeReply();
        }
        if (!msg) return;
        this.setMargin();
        this.input.value = "";
        this.reply(msg);
    }

    why() {
        //ps.publish( 'why' )
    }
    stop() {
        //ps.publish( 'stop' )
    }
    explain() {
        //ps.publish( 'explain' )
    }
    cancel() {
        this.display.innerHTML = "";
    }
    print() {
        let html = this.display.innerHTML;
        let win = window.open("about:blank", "self", "width=600; height=450;");
        win.document.writeln(html);
        win.print();
        win.close();
    }
    copy() {}
    process(response) {
        // console.log({ response })
        if (response.Label === "Prompt" || response.Label === "CF") {
            //Prompting for input
            return this.processPrompt(response);
        } else if (response instanceof Array) {
            //answers are ready
            return this.processAnswers(response);
        } else {
            // console.log(response.name)
            switch (response.name) {
                case "ValidationError":
                    return this.processValidationError(response);
                case "SyntaxError":
                    return this.processError(response);
                case "ScriptError":
                    return this.processError(response);
                default:
                    return this.processError(response);
            }
        }
    }
    attachScripts(scr, id, name) {
        var head = document.body;
        var link = document.createElement("script");
        link.type = "text/javascript";
        link.id = id || Math.random().slice(2).toString(36);
        link.name = name || "script" + link.id;
        link.append(scr);
        head.appendChild(link);
    }
    attachListeners() {
        this.el.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                if (e.target.type === "radio" || e.target.type === "checkbox") {
                    this.send();
                } else if (e.target.type === "text") {
                    this.send();
                } else {
                    e.target.click();
                }
            } else {
                //do nothing
            }
            e.preventDefault();
            e.stopPropagation();
        });

        this.toolbar.addEventListener("click", (e) => {
            switch (e.target.id) {
                case "pr-print":
                    this.print();
                    break;
                case "pr-copy":
                    this.copy();
                    break;
                default:
                    void 0;
            }
            e.stopPropagation();
            e.preventDefault();
        });

        this.buttons.addEventListener("click", (e) => {
            switch (e.target.innerText) {
                case "✓":
                    this.send();
                    break;
                case "?":
                    this.why();
                    break;
                case "!":
                    this.explain();
                    break;
                case "×":
                    this.cancel();
                    break;
                case "‣":
                    this.repeat();
                    break;
                case "⛔":
                    this.stop();
                    break;
                default:
                    //do nothing
                    return;
            }
            this.input.focus();
            e.preventDefault();
            e.stopPropagation();
        });
    }

    attachCSS() {
        const head = document.head;
        const link = document.createElement("style");
        link.rel = "stylesheet";
        const css = `
    .pr-copy, 
    .pr-print {
      cursor: pointer;
      padding: 2px 0;
      margin-left: 8px;
      margin-bottom: 4px;
      height: 22px;
      margin-right: 4px;
      background: white;
      border-radius: 5px 5px 5px 5px;
    }
    .pr-toggle {
       cursor: pointer;
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
        border: 1px solid none;
        color: white;
        background: #222;
    }
    .pr-banner, 
    .pr-banner {
        height: 1.8rem;
        font-weight: 400;
        margin-bottom:0;
        padding-top: 2px;
        font-variant: small-caps;
    }
    .pr-toolbar {
        position: relative;
        display: flex;
        align-items: center;
        letter-spacing: 1.4px;
        font-size: 14px;
        align-items: center;
        height: 100%;
        width: 160px;
        text-align: right;
        float: right;
        border-radius:50px;
        padding-left: 1rem;
        padding-right: 17px;
        padding-top: 1px;
        opacity: 0;
        justify-content: flex-end;
    }
    .pr-banner:hover > .pr-toolbar {
        transition: all 0.7s;
        opacity: 100%;
    }
    .pr-display {
        position: absolute;
        overflow: auto;
        padding: 4px;
        top: 36px;
        bottom: 36px;
        left: 0;
        right: 0;
        background: #111;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        font-size: 16px;
        letter-spacing: 1.2px;
        color: cadetblue;
        text-shadow: none;
    }
    .pr-display ul {list-style-type:none; border-bottom:0px solid #555;}
    .pr-dispaly ol {border-bottom:0px solid #555; list-style:upper-latin;}
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
      font-size: 1.4em;
    }
    .pr-text-input-container {
      padding: 0;
      background: transparent;
      border: none;
    }
    .pr-text-input {
        width: auto;
        max-width: 80px;
        outline: none;
        background: slateblue;
        color: white;
        font-size: 18px;
        height: 100%;
        width: 100%;
        border: none;
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
       border-bottom: 1px solid transparent;
       padding-top: 6px;
       margin-bottom: 8px;
    }
    .gold .pr-container {
        background: blanchedalmond;
        color: green;
    }

    .gold .pr-char, .gold .pr-banner {
      color: green;
    }
    .blue .pr-container {
      background: navy;
    }
    .indigo .pr-container {
      background: slateblue;
    } 
    .green .pr-container {
      background: lightgreen;
    }
    .red .pr-container {
      background: #b00000;
    }
    .orange .pr-container {
      background: orange;
    }
    .light .pr-container {
      background: #eee;
      color: blue;
    }
    .light .pr-char, .light .pr-banner {
      color: blue;
    }
    `;
        link.append(css);
        head.appendChild(link);
    }

    async loadConsolePanel() {
        const num = Math.random().toString(36).slice(2).toString(36);
        const display_id = `display${num}`,
            inputId = `text${num}`,
            btpanel = `btPanel${num}`,
            container = `container${num}`,
            toolbar = `tb${num}`,
            banner = `banner${num}`;

        const panel = `
    <div id = '${container}' class ='pr-container'>
      <div id ='${banner}' class ='pr-banner'>
        <span class="pr-banner-title">Rules Interface</span>
        <div id ='${toolbar}' class ='pr-toolbar'></div>
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
    </div></div>`;
        this.el.innerHTML = panel;
        this.el.classList.add("pr-parent");
        this.theme = "dark";
        this.display = document.getElementById(display_id);
        this.input = document.getElementById(inputId);
        this.buttons = document.getElementById(btpanel);
        this.banner = document.getElementById(banner);
        this.toolbar = document.getElementById(toolbar);

        new Viewer(this.display, this.toolbar);
        this.input.focus();
        this.container = document.getElementById(container);
        // let doc = document.createDocumentFragment()
        // let runpanel = doc.getElementById( container )
        // let input = doc.getElementById( inputId )
        // this.stylePanel( runpanel )
        // this.styleDisplay( display )
        // this.styleInput( input )
        // this.styleLinks( doc )
        // console.log( document.getElementsByClassName( 'gold' )[0].style.background='lavender' )
    }
    toggleTheme() {
        // console.log(this.theme, this.el)
        this.el.classList.toggle(this.Theme);
    }
    get Theme() {
        return this._theme;
    }
    set Theme(color) {
        // dark themes: green, blue, red, purple, indigo, orange
        // light themes: white, silver, gold, lavendar
        if (color) {
            color = color.toLowerCase();
        }
        if (this.theme === color) {
            this.el.classList.remove(this.theme);
            return;
        }
        this.el.classList.add(color);
        this._theme = color;
    }
    stylePanel(runpanel) {
        runpanel.style.position = "absolute";
        runpanel.style.top = "0";
        runpanel.style.left = "0";
        runpanel.style.right = "0";
        runpanel.style.bottom = "0";
        runpanel.style.overflow = "auto";
        runpanel.style.paddingLeft = runpanel.style.paddingRight = "5px";
        runpanel.style.background = "inherit";
    }
    styleDisplay(display) {
        display.style.position = "absolute";
        display.style.top = "4px";
        display.style.left = "0";
        display.style.right = "0";
        display.style.bottom = "48px";
        display.style.overflow = "auto";
        display.style.paddingLeft = display.style.paddingRight = "16px";
    }
    styleInput(input) {
        input.style.color = "#000";
        input.style.background = "#999";
        input.style.border = "1px solid #333";
        input.style.marginRight = "7px";
        input.style.borderRadius = "15px";
        input.style.padding = "4px 4px 4px 12px";
    }
    styleLinks(doc) {
        let links = doc.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            link.style.padding = "4px 8px 4px 8px";
            link.style.textDecoration = "none";
            link.style.color = "inherit";
            link.style.margin = "1px";
            link.style.borderRadius = "2px 2px";
        }
        let btns = doc.getElementsByClassName("char");
        for (let i = 0; i < btns.length; i++) {
            let link = links[i];
            link.style.fontSize = "2em";
            link.style.fontWeight = "bold";
        }
        return doc;
    }

    addListeners() {
        this.on("error", (e) => {
            this.processError(e);
        });
        this.on("syntax-error", (e) => {
            // this.processParserErrors(e.msg )
            // this.processError( e )
            // console.log(e)
            this.processError(e);
        });
        this.on("system-error", (e) => {
            // this.processError( e )
            this.processError(e);
            // console.log(e)
        });
        this.on("validation-error", (e) => {
            this.processValidationError(e);
        });
        this.on("prompt", (e) => {
            this.processPrompt(e);
        });
        this.on("answers", (e) => {
            this.display.innerHTML = "";
            this.processAnswers(e);
        });
        this.on("message", (e) => {
            this.appendToContent("<h6>" + e.msg || e + "</h6>");
        });
        this.on("done", () => {
            this.display.innerHTML = "";
        });
    }
    processPrompt(prompt) {
        this.prompt = prompt;
        let id = Math.floor(Math.random() * 99999999999999).toString(36);
        this.disableInputs();
        this.appendToContent(
            '<div ><span id = "' +
                id +
                '" contentEditable="true">' +
                prompt.Index +
                ". " +
                prompt.Question +
                "</span></div>",
            true
        );

        switch (prompt.Type) {
            case "MENU":
            case "CF":
            case "YN":
            case "TF":
                this.showMenu(prompt, false);
                break;
            case "NUMBER":
            case "TEXT":
            default:
        }
        this.input.focus();
        // let el = document.getElementById( id )
        // el.scrollIntoView()
    }
    processValidationError(error) {
        this.input.value = "";
        this.input.focus();
        // this.appendToContent("<div>" + error + "</div>")
        this.appendToContent(
            "<div>" +
                error.name +
                ": " +
                error.code +
                ".<br/>Details: " +
                error.message +
                ".</div>"
        );
    }
    processError(error) {
        // console.log(JSON.stringify(error))
        this.input.value = "";
        this.input.focus();
        this.appendToContent(
            "<div>" +
                error.name +
                ": " +
                error.code +
                ".<br/>Details: " +
                error.message +
                ".</div>"
        );
        // this.display.innerHTML += "<br/>" + ( error.msg || error )
    }
    processParserErrors(errors) {
        if (!errors) {
            this.appendToContent("<div>System error</div>");
            return;
        }
        errors.forEach((e) => {
            var x = e.x === undefined ? e.column : e.x;
            var y = e.y === undefined ? e.row : e.y;
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
                "</a>";
            this.display.innerHTML += s + "<br/>";
            this.scrollDown("Error");
        });
    }
    processScriptError(error) {
        if (!error) {
            this.appendToContent("<div>System error</div>");
            return;
        }
        var code = error.code;
        //var lang='en';
        var msg = error.message;
        //var expr='';
        var line = error.details.line;
        var lineIndex = error.details.index;
        var rIndex = error.details.rIndex;
        var rule = error.details.rule;
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
                "</a><br/><hr/><p><p>";
            this.display.append(s);
            window.setTimeout(function () {
                window.Editor.resize();
                window.setTimeout(function () {
                    this.scrollDown("content");
                }, 200);
            }, 200);
        } catch (ex) {
            console.log(ex);
        }
    }
    processAnswers(answers) {
        this.disableInputs();
        if (answers.length === 0) return;
        var display = ["<div class='conclusion'>"];
        display.push("<span>Conclusion</span>");
        answers.forEach(function (goal) {
            display.push("<br/>" + goal.Name);
            display.push(": " + goal.Value);
            display.push(" - confidence: " + goal.CF + "%");
        });
        display.push("</div>");
        this.appendToContent(display.join(" "));
        //  this.setMargin()
        // this.scrollDown()
    }
    processInfo(data) {
        //content.append("<hr/>");
        var rand2 = Math.random().slice(2).toString(36);
        this.appendToContent("<div><b>" + data.msg + "</b></div>");
        if (
            data.msg.indexOf("Session expired") > -1 ||
            data.msg.indexOf("No session") > -1
        ) {
            var link1 =
                "<a href='javascript:void (0)'  id='" +
                rand2 +
                "' class='active-link opensocket'>Click here to start new session</a>";
            this.appendToContent("<div><b>" + link1 + "</b></div>");

            document.getElementById(rand2).onclick(function () {
                this.open();
            });
        }
    }
    addClickListener(fn) {
        let tags = this.el.getElementsByTagName("ul");
        let last = tags[tags.length - 1];
        for (let i = 0; i < last.childNodes.length; i++) {
            let node = last.children[i];
            if (node && node.children) {
                let el = node.children[0].firstChild;
                el.addEventListener("click", fn);
            }
        }
    }
    disableInputs() {
        let tags = this.el.getElementsByTagName("ul");
        let last = tags[tags.length - 1];
        if (!last) return;
        this.widgets.forEach((w) => {
            w.setAttribute("checked", true);
        });
        this.widgets = [];
        for (let i = 0; i < last.childNodes.length; i++) {
            let node = last.children[i];
            if (node && node.children) {
                let el = node.children[0].firstChild;
                el.disabled = true;
            }
        }
    }
    composeReply() {
        let tags = this.el.getElementsByTagName("ul");
        let last = tags[tags.length - 1];
        if (!last) return null;
        let resp = {};
        let index = 0;
        for (let i = 0; i < last.childNodes.length; i++) {
            let node = last.children[i];
            if (node && node.children) {
                let el = node.children[0].firstChild;
                index++;
                if (el.checked) {
                    resp[el.value] = index;
                    this.widgets.push(el);
                } else {
                    delete resp[el.value];
                }
            }
        }

        return Object.values(resp).join(",");
    }
    composeMenuWidget(prompt) {
        let name = Math.floor(Math.random() * 9999999999999).toString(36);
        let array = [];
        if (prompt.Max > 1) {
            array = this.composeCheckBoxes(prompt, name);
        } else {
            array = this.composeRadioButtons(prompt, name);
        }
        var ol = "<ul>" + array.join(" ") + "</ul>";
        this.appendToContent(ol, true);
    }
    composeCheckBoxes(prompt, name) {
        return prompt.Menu.map((m) => {
            return (
                '<li><label><input type = "checkbox" name="' +
                name +
                '" value="' +
                m.Name +
                '"/><span style="margin-left:7px;">' +
                m.Name +
                "</span></label></li>"
            );
        });
    }
    composeRadioButtons(prompt, name) {
        return prompt.Menu.map((m) => {
            return (
                '<li><label><input type = "radio" name="' +
                name +
                '" value="' +
                m.Name +
                '"/><span style="margin-left:7px;">' +
                m.Name +
                "</span></label></li>"
            );
        });
    }
    showMenu(prompt, commandline) {
        if (!commandline) return this.composeMenuWidget(prompt);
        let array = prompt.Menu.map((m) => {
            return "<li>" + m.Name + "</li>";
        });
        var ol = "<ol >" + array.join(" ") + "</ol>";
        this.appendToContent(ol, true);

        return null;
    }

    appendToContent(node, scroll = true) {
        if (node && node.classList) {
            node.classList.add("pr-console-line");
        }
        this.display.innerHTML += node;
        if (scroll) this.scrollDown("content");
    }
    setMargin() {
        var el = this.display;
        var child = el.lastChild;
        if (child && child.classList) {
            child.classList.add("pr-margin-bottom");
            //child.style.borderBottom = "1px solid #777"
            //child.style.paddingTop = "6px"
            //child.style.marginBottom = "8px"
        }
    }
    scroll(direction) {
        var el = this.display;
        if (direction === "up") {
            el.scrollTop = 0;
        } else {
            el.scrollTop = el.scrollHeight;
        }
    }
    scrollDown() {
        var el = this.display;
        var child = el.lastChild;
        try {
            if (child) {
                child.scrollIntoView();
            } else {
                el.scrollTop = el.scrollHeight;
            }
        } catch (e) {
            void e;
        }
    }

    scrollUp() {
        var el = this.display;
        var child = el.firstChild;

        if (child) {
            child.scrollIntoView();
        } else {
            el.scrollTop = el.scrollHeight;
        }
    }

    showInputBar() {
        //var a0="<input type='text' class='input'/><br/> ";
        //var a1=(' <a href=\'javascript:void(0)\' onclick=\'ui.send()\'>Send</a> ');
        var a2 =
            " <a href='javascript:void(0)'onclick='disconnect()' >Disconnect</a> ";
        var a3 = " <a href='javascript:void(0)'onclick='open()' >Restart</a>  ";
        var a4 =
            " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
        var ol =
            " <div id='input-bar'><input type='text' class='input'/>" +
            a2 +
            a3 +
            a4 +
            "</div></br/>";
        this.appendToContent(ol);
    }

    showTaskBar() {
        //ol.append("<input type='text' class='input' onkeyUp='inputKeyup("+event+")'/> ");
        //ol.append(" <a href='javascript:void(0)' onclick='submmitClick'>Send</a> ");
        //ol.append(" <a href='javascript:void(0)' onclick='disconnect'>Disconnect</a> ");
        var a1 =
            " <a href='javascript:void(0)' onclick='connectClick()'>Restart</a> ";
        var a2 =
            " <a href='javascript:void(0)' onclick='restartClick()'>Refresh</a> ";
        var ol = "<div id='input-bar'>" + a1 + a2 + "</div>";
        this.appendToContent(ol);
    }
}
