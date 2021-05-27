
export function loadStyle (href, callback) {
    // avoid duplicates
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href && document.styleSheets[i].href == href) {
            return
        }
    }
    var head = document.getElementsByTagName("head")[0]
    var link = document.createElement("link")
    link.rel = "stylesheet"
    link.type = "text/css"
    link.href = href
    if (callback) {
        link.onload = function () {
            callback()
        }
    }
    head.appendChild(link)
}

export function toggleStylesheet (href, onoff) {
    var existingNode = 0 //get existing stylesheet node if it already exists:
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (
            document.styleSheets[i].href &&
            document.styleSheets[i].href.indexOf(href) > -1
        )
            existingNode = document.styleSheets[i].ownerNode
    }
    if (onoff == undefined) onoff = !existingNode //toggle on or off if undefined
    if (onoff) {
        //TURN ON:
        if (existingNode) return onoff //already exists so cancel now
        var link = document.createElement("link")
        link.rel = "stylesheet"
        link.type = "text/css"
        link.href = href
        document.getElementsByTagName("head")[0].appendChild(link)
    } else {
        //TURN OFF:
        if (existingNode) existingNode.parentNode.removeChild(existingNode)
    }
    return onoff
}

export function attachCSS (css, id, name, toggle = false) {
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
export const dynamicStyleSheet = function () {
    // Create the <style> tag
    var style = document.createElement('style')

    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute('media', 'screen')
    // style.setAttribute('media', 'only screen and (max-width : 1024px)')

    // WebKit hack :(
    style.appendChild(document.createTextNode(''))

    // Add the <style> element to the page
    document.head.appendChild(style)

    return style.sheet
}

// Usage
// var sheet = DynamicStyleSheet()
// sheet.insertRule("header { float: left; opacity: 0.8; }", 1);

// Replacing default console.log with syntax highlighting substitute 
// const probe = require('console-probe')
// let data = {count:100000}
// const prober = probe.get()
// console.log = prober
// prober(data)

// collaboration
// <script src="https://togetherjs.com/togetherjs-min.js"></script>
// <button onclick="TogetherJS(this); return false;">Start TogetherJS</button>