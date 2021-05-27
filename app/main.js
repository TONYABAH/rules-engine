
/* function run (data) {
  // localStorage.setItem('console-data', data)
  const winOptions = 'resizable=yes,scrollbars=yes, left=0,bottom=0,width=960,height=450'
  const win = window.open('app/console.html', 'console', winOptions)
  win.postMessage('Hello world', 'http://127.0.0.1')
} */

window.addEventListener('load', (e) => {
  // localStorage.removeItem('@console-data')
  document.getElementById('run').addEventListener('click', debounce(() => {
    run()
  }, 100, true))
})

window.addEventListener('beforeunload', () => {
  // localStorage.setItem('@rules-editor', editor.getValue())
})

function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this; var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
function run () {
  // localStorage.setItem('@console-data', data)
  const winOptions = 'resizable=yes,scrollbars=yes, left=0,bottom=0,width=960,height=450'
  const win = window.open('app/console.html', 'console', winOptions)
  // win.postMessage('Hello world', 'http://127.0.0.1')
}
