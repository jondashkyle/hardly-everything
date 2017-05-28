var html = require('rooch/html')
var sf = require('sheetify')
var x = require('xtend')

var style = sf`
  :host {
    padding: 1px;
    width: 40rem;
  }

  :host > div {
    width: 100%;
  }

  input {
    height: 4.5rem;
    line-height: 4.5rem;
    outline: 0;
  }

  input[type="text"] {
    border: 0;
    outline: 0;
    margin: 0;
  }

  input[type="submit"] {
    border: 0;
  }

  input[type="button"] {
    border: 0;
  }
`

module.exports = view

function view (state, emit, content) {
  return html`
    <div
      class="psf t0 l0 r0 b0 xjc xac z2 x"
    >
      <div class="${style}">
        ${content}
      </div>
    </div>
  `
}
