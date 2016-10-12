const h = require('choo/html')
const x = require('xtend')
const sf = require('sheetify')

const css = require('../components/css')

const style = sf`
  :host {
    min-height: calc(100vh - 3rem);
    margin-top: 3rem;
    position: relative;
    width: 100%;
  }

  pre,
  textarea {
    font-size: 1rem;
    border: 0;
    line-height: 1.5;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    outline: 0;
    width: 100%;
  }
`

const handleImportClick = (send, event) => {
  const input = event.target.parentNode.querySelector('textarea')

  try {
    const result = JSON.parse(input.value)
    send('entries:reset', result)
  } catch (err) {
    alert('Please enter valid JSON')
    console.warn(err)
  }
}

const elNavigation = (state, prev, send) => {
  return h`<div
    class="x bg-black tc-white psf t0 l0 r0 z2"
    style="line-height: 3rem"
  >
    <a href="/data/import" class="tc-white tac xx px1 opt-br">Import</a>
    <a href="/data/export" class="tc-white tac xx px1 opt-bl">Export</a>
  </div>`
}

const elImport = (state, prev, send) => {
  return h`<div class="${style}">
    <textarea
      class="mono bg-white tc-black p2 fs1 lh1-5"
      placeholder="Must be valid entry JSON"
    ></textarea>
    <div
      class="psf b0 r0 z2 bg-black tc-white p1 curp"
      onclick=${e => handleImportClick(send, event)}
    >
      Submit
    </div>
  </div>`
}

const elExport = (state, prev, send) => {
  const entries = state.entries.all

  return h`<div class="${style}">
    <pre class="mono bg-white tc-black p2" contenteditable="true"><code>${JSON.stringify(entries, null, 2)}</code></pre>
  </div>`
}

const view = (state, prev, send) => {
  const command = state.params.command
    ? state.params.command
    : 'export'

  const elContent = command === 'import'
    ? elImport
    : elExport

  return h`<div>
    ${elNavigation(state, prev, send)}
    ${elContent(state, prev, send)}
    ${css(state, prev, send)}
  </div>`
}

module.exports = view
