var html = require('rooch/html')
var x = require('xtend')
var ov = require('object.values')
var sf = require('sheetify')

var css = require('../components/css')

var style = sf`
  :host {
    min-height: calc(100vh - 4.5rem);
    margin-top: 4.5rem;
    position: relative;
    width: 100%;
  }

  pre,
  textarea {
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

var navigationOpts = {
  export: {
    key: 'export',
    text: 'Export'
  },
  import: {
    key: 'import',
    text: 'Import'
  }
}

var getCommand = command => command || 'export'

var handleImportClick = (event, emit) => {
  var input = event.target.parentNode.querySelector('textarea')
  var value = input.value

  try {
    var result = JSON.parse(value)
    emit('entries:reset', result)
  } catch (err) {
    alert('Please enter valid JSON')
    console.warn(err)
  }
}

var elNavigation = (state, emit) => {
  var command = getCommand(state.params.command)
  var opts = ov(navigationOpts)

  var elsOpts = opts.map((opt, i) => html`
    <a
      href="/data/${opt.key}"
      class="
        xx tc-white px1 opt-br
        ${i > 0 ? 'opt-bl' : ''}
      "
    >
      <span class="${opt.key === command ? 'op100' : 'op50'}">
        ${opt.text}
      </span>
    </a>
  `)

  return html`<div
    class="x fs1 bg-black tc-white psf t0 l0 r0 z2"
    style="line-height: 4.5rem"
  >
    ${elsOpts}
    <a
      href="/" 
      class="tac opt-bl tc-white fs1-4"
      style="width: 4.5rem; height: 4.5rem"
    >×</a>
  </div>`
}

var elImport = (state,emit) => {
  return html`<div class="${style}">
    <textarea
      class="mono bg-white tc-black p1 fs1 lh1-5"
      placeholder="Must be valid link JSON"
    ></textarea>
    <div
      class="fs1 psf b0 r0 z2 bg-black tc-white py1 px2 curp"
      onclick=${event => handleImportClick(event, emit)}
    >
      Submit
    </div>
  </div>`
}

var elExport = (state, emit) => {
  var entries = state.entries.all

  return html`<div class="${style}">
    <pre class="fs1 mono bg-white tc-black p1" contenteditable="true"><code>${JSON.stringify(entries, null, 2)}</code></pre>
  </div>`
}

var view = (state, emit) => {
  var command = getCommand(state.params.command)

  var elContent = command === 'import'
    ? elImport
    : elExport

  return html`<div class="sans">
    ${elNavigation(state, emit)}
    ${elContent(state, emit)}
    ${css(state, emit)}
  </div>`
}

module.exports = view
