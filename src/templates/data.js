var html = require('choo/html')
var ov = require('object-values')

var css = require('../components/css')

var navigationOpts = {
  export: {
    key: 'export',
    text: 'Export'
  },
  import: {
    key: 'import',
    text: 'Import'
  },
  design: {
    key: 'design',
    text: 'Design'
  }
}

var getCommand = command => command || 'export'

module.exports = view

function handleImportClick (event, emit) {
  var input = event.target.parentNode.querySelector('textarea')
  var value = input.value

  try {
    var result = JSON.parse(value)
    emit('entries:reset', result)
    alert('imported!')
  } catch (err) {
    alert('Please enter valid JSON')
    console.warn(err)
  }
}

function elNavigation (state, emit) {
  var command = getCommand(state.params.command)
  var opts = ov(navigationOpts)

  var elsOpts = opts.map((opt, i) => html`
    <a
      href="/data/${opt.key}"
      class="xx tc-black px1 br2-lighter"
    >
      <span class="${opt.key === command ? 'op100' : 'op33 oph100'}">
        ${opt.text}
      </span>
    </a>
  `)

  return html`<div
    class="x fs1 psf t0 l0 r0 z2 bb2-lighter"
    style="line-height: 4.5rem"
  >
    ${elsOpts}
    <a
      href="/" 
      class="tac tc-black fs1-4"
      style="width: 4.5rem; height: 4.5rem"
    >×</a>
  </div>`
}

function elImport (state, emit) {
  return html`<div class="data">
    <textarea
      class="mono bg-white tc-black p1 fs1 lh1-5"
      placeholder="Must be valid link JSON"
      style="height: calc(100vh - 4.5rem)"
    ></textarea>
    <div
      class="fs1 psf b0 r0 z2 bg-white tc-black py1 px2 curp"
      onclick=${event => handleImportClick(event, emit)}
    >Submit</div>
  </div>`
}

function elExport (state, emit) {
  var entries = state.entries.all
  return html`
    <div class="data">
      <textarea
        class="mono bg-white tc-black p1 fs1 lh1-5"
        placeholder="Must be valid link JSON"
        style="height: calc(100vh - 4.5rem)"
      >${JSON.stringify(entries, null, 2)}</textarea>
    </div>
  `
}

function elDesign (state, emit) {
  var options = state.options.values
  return html`
    <div class="data">
      <textarea
        class="mono bg-white tc-black p1 fs1 lh1-5"
        placeholder="Must be valid link JSON"
        style="height: calc(100vh - 4.5rem)"
      >${JSON.stringify(options, null, 2)}</textarea>
    </div>
  `
}

function view (state, emit) {
  var command = getCommand(state.params.command)
  var elContent = getContent()

  return html`<div class="sans">
    ${elNavigation(state, emit)}
    ${elContent(state, emit)}
    ${css(state, emit)}
  </div>`

  function getContent () {
    switch (state.params.command) {
      case 'import':
        return elImport
      case 'design':
        return elDesign
      default:
        return elExport
    }
  }
}
