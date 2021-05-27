import { attachCSS } from './css.js'

export default class Clipboard {
  /**
   * Constructor
   * @param {String} selector The query selector for element(s) to attach event: 
   * should be in format #xxx or .xxx
   */
  constructor (selector) {
    const styles = `
      ${selector}:before {
        content: '';
        display: none;
        position: absolute;
        z-index: 9998;
        top: 35px;
        left: 15px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid rgba(0, 0, 0, .72);
      }
      ${selector}:after {
        content: 'Copy to Clipboard';
        display: none;
        position: absolute;
        z-index: 9999;
        top: 40px;
        right: 1px;
        width: 114px;
        height: 36px;
        color: #fff;
        font-size: 10px;
        line-height: 36px;
        text-align: center;
        background: #111;
        background: rgba(0, 0, 0, .72);
        border-radius: 3px;
      }
      ${selector}:hover:before, 
      ${selector}:hover:after {
        display: block;
      }
      ${selector}:active, 
      ${selector}:focus {
          outline: none;
      }
      ${selector}:active:after, 
      ${selector}:focus:after {
          content: 'Copied!';
      }`
    attachCSS(styles, 'clipboard_css', 'clipboard-css')
  }
  copyToClipboard (str) {
    const el = document.createElement('textarea')  // Create a <textarea> element
    el.value = str                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '')                // Make it readonly to be tamper-proof
    el.style.position = 'absolute'
    el.style.left = '-9999px'                      // Move outside the screen to make it invisible
    document.body.appendChild(el)                  // Append the <textarea> element to the HTML document
    const selected =
      document.getSelection().rangeCount > 0     // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)// Store selection if found
        : false                                // Mark as false to know no selection existed before
    el.select()                                    // Select the <textarea> content
    document.execCommand('copy')                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el)                  // Remove the <textarea> element
    if (selected) {                                // If a selection existed before copying
      document.getSelection().removeAllRanges()  // Unselect everything on the HTML document
      document.getSelection().addRange(selected) // Restore the original selection
    }
  }
}
