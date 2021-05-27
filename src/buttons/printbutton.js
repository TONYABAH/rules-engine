// import { attachCSS } from './css.js'
// const options = {}
import Clipboard from './clipboard.js'
export default class PrintButton {
  constructor (color, source, options) {
    this.color = color
    this.source = source
    this.winOptions = 'resizable=yes,scrollbars=yes,left=0,top=0,width=960,height=450'
    this.openSvg = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width="16px" height="16px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
        <title>open in new window</title>
        <desc>Created with Sketch.</desc>
        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Two-Tone" transform="translate(-647.000000, -333.000000)">
                <g id="Action" transform="translate(100.000000, 100.000000)">
                    <g id="Two-Tone-/-Action-/-open_in_new" transform="translate(544.000000, 230.000000)">
                        <g>
                            <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                            <path d="M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z" id="🔹-Primary-Color" fill="${this.color}"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>`

    this.printSvg = `
    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="16px" height="16px" viewBox="0 0 212.795 220.59" enable-background="new 0 0 212.795 220.59"
        xml:space="preserve">
        <title>Print out</title>
    <path fill="${this.color}" d="M189.209,175.581h-27.186c-1.104,0-2-0.896-2-2v-29.808H55.505v29.808c0,1.104-0.895,2-2,2H26.094
      c-5.101,0-9.25-4.148-9.25-9.249v-67.82c0-5.101,4.149-9.25,9.25-9.25h163.116c5.101,0,9.25,4.149,9.25,9.25v67.82
      C198.459,171.432,194.311,175.581,189.209,175.581 M164.023,171.581h25.186c2.895,0,5.25-2.354,5.25-5.249v-67.82
      c0-2.895-2.355-5.25-5.25-5.25H26.094c-2.895,0-5.25,2.355-5.25,5.25v67.82c0,2.896,2.355,5.249,5.25,5.249h25.412v-29.808
      c0-1.104,0.896-2,2-2h108.518c1.104,0,2,0.896,2,2V171.581z"/>
    <path fill="${this.color}" d="M53.279,93.261H34.702c-1.104,0-2-0.896-2-2V73.427c0-3.602,2.93-6.531,6.531-6.531h14.046
      c1.105,0,2,0.896,2,2v22.365C55.279,92.366,54.384,93.261,53.279,93.261 M36.702,89.261h14.577V70.896H39.233
      c-1.396,0-2.531,1.137-2.531,2.531V89.261z"/>
    <path fill="${this.color}" d="M180.601,93.261h-18.577c-1.104,0-2-0.896-2-2V68.896c0-1.104,0.896-2,2-2h14.046
      c3.601,0,6.531,2.93,6.531,6.531v17.834C182.601,92.366,181.706,93.261,180.601,93.261 M164.023,89.261h14.577V73.427
      c0-1.395-1.135-2.531-2.531-2.531h-12.046V89.261z"/>
    <path fill="${this.color}" d="M162.023,93.261H53.279c-1.104,0-2-0.896-2-2V8.951c0-1.104,0.896-2,2-2h88.581
      c0.579,0,1.129,0.251,1.509,0.688l20.163,23.172c0.317,0.363,0.491,0.83,0.491,1.313v59.139
      C164.023,92.366,163.128,93.261,162.023,93.261 M55.279,89.261h104.744V32.871l-19.074-21.92h-85.67V89.261z"/>
    <path fill="${this.color}" d="M171.085,143.773H44.217c-1.105,0-2-0.896-2-2c0-1.104,0.895-2,2-2h126.868c1.104,0,2,0.896,2,2
      C173.085,142.877,172.189,143.773,171.085,143.773"/>
    <path fill="${this.color}" d="M162.023,214.757H53.506c-1.105,0-2-0.896-2-2v-70.984c0-1.104,0.895-2,2-2h108.517c1.105,0,2,0.896,2,2
      v70.984C164.023,213.861,163.128,214.757,162.023,214.757 M55.506,210.757h104.518v-66.983H55.506V210.757z"/>
    <path fill="${this.color}" d="M143.673,175.581H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2
      C145.673,174.685,144.777,175.581,143.673,175.581"/>
    <path fill="${this.color}" d="M143.673,157.457H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2
      C145.673,156.561,144.777,157.457,143.673,157.457"/>
    <path fill="${this.color}" d="M143.673,193.705H71.63c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h72.043c1.104,0,2,0.896,2,2
      C145.673,192.809,144.777,193.705,143.673,193.705"/>
    <path fill="${this.color}" d="M47.955,115.681h-7.929c-4.038,0-7.324-3.285-7.324-7.324s3.286-7.324,7.324-7.324h7.929
      c4.039,0,7.324,3.285,7.324,7.324S51.994,115.681,47.955,115.681 M40.026,105.033c-1.833,0-3.324,1.491-3.324,3.324
      s1.491,3.324,3.324,3.324h7.929c1.833,0,3.324-1.491,3.324-3.324s-1.491-3.324-3.324-3.324H40.026z"/>
    <path fill="${this.color}" d="M68.571,115.681c-4.038,0-7.324-3.285-7.324-7.324s3.286-7.324,7.324-7.324c4.039,0,7.324,3.285,7.324,7.324
      S72.61,115.681,68.571,115.681 M68.571,105.033c-1.833,0-3.324,1.491-3.324,3.324s1.491,3.324,3.324,3.324s3.324-1.491,3.324-3.324
      S70.404,105.033,68.571,105.033"/>
    </svg>`

    this.copySvg = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?> 
    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 1.34315 7.34315 0 9 0H14C14.2652 0 14.5196 0.105357 14.7071 0.292893L21.7071 7.29289C21.8946 7.48043 22 7.73478 22 8V17C22 18.6569 20.6569 20 19 20H18V21C18 22.6569 16.6569 24 15 24H5C3.34315 24 2 22.6569 2 21V7C2 5.34315 3.34315 4 5 4H6V3ZM6 6H5C4.44772 6 4 6.44772 4 7V21C4 21.5523 4.44772 22 5 22H15C15.5523 22 16 21.5523 16 21V20H9C7.34315 20 6 18.6569 6 17V6ZM9 2C8.44772 2 8 2.44772 8 3V17C8 17.5523 8.44771 18 9 18H19C19.5523 18 20 17.5523 20 17V9H16C14.3431 9 13 7.65685 13 6V2H9ZM15 3.41421L18.5858 7H16C15.4477 7 15 6.55228 15 6V3.41421Z" fill="${color}"/>
    </svg>`
    
    this.OpenButton = this.createButton(color, this.openSvg, options)
    this.OpenButton.addEventListener('click', () => {
        this.openInWindow()
    })
    this.PrintButton = this.createButton(color, this.printSvg, options)
    this.PrintButton.addEventListener('click', () => {
      this.printToPrinter()
    })
    this.ClipboardButton = this.createButton(color, this.copySvg, options)
    this.ClipboardButton.classList.add('copy-to-clipboard-button')
    this.clipboard = new Clipboard(".copy-to-clipboard-button")
    this.ClipboardButton.addEventListener('click', () => {
      this.clipboard.copyToClipboard(this.Text)
    })
  }
  createButton (color, html, options = {}) {
    const button = document.createElement('button')
    button.style.width = options.width || '32px'
    button.style.height = options.height || '32px'
    button.style.color = color || 'white'
    button.style.padding = 2 + 'px'
    button.style.margin = 1 + 'px'
    button.style.borderRadius = 2 + 'px'
    button.style.background = options.background || 'transparent'
    button.style.border = options.border || 'none'
    button.style.cursor = 'pointer'
    button.innerHTML = html
    return button
  }
  get Html () {
    return this.source.innerHTML
  }
  get Text () {
    return this.source.innerText
  }
  openInWindow () {
    try {
      var printWindow = window.open('', '', this.winOptions)
      let str = `
        <html>
            <head><title>Print Window</title></head>
            <body>
                <div  
                    style="width:100%; 
                    padding:1rem 2rem; 
                    font-size:1.1rem;
                    font-family: 'Courier New';
                    letter-spacing: 1px;
                ">
                    ${this.Html}
                </div>
            </body>
        </html>`
      printWindow.document.writeln(str)
      return printWindow
    }
    catch (ex) {
      //alert(ex);
      console.error('Error: ' + ex.message)
    }
  }
  printToPrinter () {
    try {
      var printWindow = this.openInWindow()
      printWindow.print()
      printWindow.close()
    }
    catch (ex) {
      //alert(ex);
      console.error('Error: ' + ex.message)
    }
  }
}
