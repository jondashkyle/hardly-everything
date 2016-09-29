const h = require('choo/html')
const x = require('xtend')

const sf = require('sheetify')

const style = sf`
  :host {
    min-height: 100vh;
  }

  textarea {
    font-size: 1rem;
    border: 0;
    line-height: 1.5;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    outline: 0;
  }
`

const container = opts => {
  const options = x({
    entries: [ ]
  }, opts)

  const el = h`<div class="${style}">
    <textarea class="mono bg-black tc-white p2">${JSON.stringify(options.entries, false, 2)}</textarea>
  </div>`

  return el
}

const view = (state, prev, send) => {
  return state.entries.all.length
    ? container({
        entries: state.entries.all
      })
    : h`<div>nothing to export</div>`
}

module.exports = view