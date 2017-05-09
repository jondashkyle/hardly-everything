var html = require('rooch/html')
var x = require('xtend')
var ov = require('object.values')
var sf = require('sheetify')

var css = require('../components/css')

var style = sf`
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
    class="x bg-black tc-white psf t0 l0 r0 z2"
    style="line-height: 3rem"
  >
    ${elsOpts}
    <a
      href="/" 
      class="tac opt-bl tc-white fs1-5"
      style="width: 3rem; height: 3rem"
    >×</a>
  </div>`
}

var elImport = (state,emit) => {
  return html`<div class="${style}">
    <textarea
      class="mono bg-white tc-black p2 fs1 lh1-5"
      placeholder="Must be valid link JSON"
    ></textarea>
    <div
      class="psf b0 r0 z2 bg-black tc-white py1 px2 curp"
      onclick=${event => handleImportClick(event, emit)}
    >
      Submit
    </div>
  </div>`
}

var elExport = (state, emit) => {
  var entries = state.entries.all

  return html`<div class="${style}">
    <pre class="mono bg-white tc-black p2" contenteditable="true"><code>${JSON.stringify(entries, null, 2)}</code></pre>
  </div>`
}

var view = (state, emit) => {
  var command = getCommand(state.params.command)
  console.log(state)

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
