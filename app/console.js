
export default function open (data) {
  localStorage.setItem('console-data', data)
  const winOptions = 'resizable=yes,scrollbars=yes, toolbar=on left=0,bottom=0,width=960,height=450'
  const win = window.open('/console.html', 'console', winOptions)
  // win.postMessage(data, 'http://127.0.0.1')
  // window.location = '/console.html'
  /*  const el = win.document.createElement('div')
  el.id = 'console'
  el.style = 'width:100%;height:100%;'
  win.document.body.append(el)

  const title = win.document.createElement('title')
  title.append('PlainRules | Console')
  win.document.head.append(title)

  const script = win.document.createElement('script')
  script.setAttribute('type', 'module')
  script.append("import Ux from './rules-engine/ui/ux.js';")
  script.append("const ux = new Ux('console');")
  // script.append("ux.Text = '" + data + "';")
  // win.document.write('<script>console.log(ux)</script>')
  script.onload = function () {
    console.log(alert(2000))
  }
  win.document.head.appendChild(script) */
}
