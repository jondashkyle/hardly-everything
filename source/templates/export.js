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
    height: 100vh;
    width: 100%;
    outline: 0;
  }
`

const container = opts => {
  const options = x({
    entries: [ ]
  }, opts)

  const el = h`<div class="${style}">
    <textarea class="mono">${JSON.stringify(options.entries, false, 2)}</textarea>
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