
export const css = `
    .rules-highlighter__copy-button {
      display:block;
    }
    .rules-highlighter-button {
      height: 28px;
      width: 28px;
      margin: 1px;
      cursor: pointer;
      border: 1px none transparent;
      background: transparent;
    }
    .rules-highlighter-button:after {
      content: 'FOO Bar';
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
    .rules-highlighter-button:hover {
        /*  background-color: #eee; */
      }
    .rules-highlighter-button:hover:before,
      .rules-highlighter-button:hover:after {
        display: block;
      }
    .rules-highlight-banner:hover > button,
    .rules-highlight-banner:hover > .tgl-btn,
     {
        transition: 0.4s;
        opacity: 100%;
        margin-right: 2px;
    }
    .rules-highlight-banner .tgl-btn {
        margin-left: 4px;
        opacity:0;
        outline: none;
    }
    .rules-highlight-title {
        position: absolute;
        left:4px;
    }
`
export const lightTheme = `
   .rules-CONTAINER {
        background: #fff;
        border-color:black;
        padding:2px;
    }
    .rules-highlight-banner{
        color:black;
        background: #fff;
     }

    `
export const darkTheme = `
    .rules-CONTAINER {
        background: #111;
        border-color:#999;
        padding:2px;
    }
    .rules-highlight-banner{
        color:white;
        background: #111;
     }

    `



