var html = require('choo/html')
var ov = require('object-values')

var css = require('../components/css')

var navigationOpts = {
  customcss: {
    key: 'css',
    text: 'Custom CSS'
  }
}

var getCommand = command => command || 'css'

module.exports = view

function handleSaveClick (event, emit) {
  var input = event.target.parentNode.querySelector('textarea')
  var value = input.value || ''

  try {
    // var result = JSON.parse(value)
    emit('options:values', {
      key: 'css',
      value: value
    })
    alert('updated!')
  } catch (err) {
    alert('Please enter valid CSS')
    console.warn(err)
  }
}

function elNavigation (state, emit) {
  var command = getCommand(state.params.command)
  var opts = ov(navigationOpts)

  var elsOpts = opts.map((opt, i) => html`
    <a
      href="/${opt.key}"
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

function elCustomCss (state, emit) {
  var customcss = state.options.values.css
  return html`<div class="data">
    <textarea
      class="mono bg-white tc-black p1 fs1 lh1-5"
      placeholder="Must be valid CSS"
      style="height: calc(100vh - 4.5rem)"
    >${customcss}</textarea>
    <div
      class="fs1 psf b0 r0 z2 bg-white tc-black py1 px2 curp"
      onclick=${event => handleSaveClick(event, emit)}
    >Submit</div>
  </div>`
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
    return elCustomCss
  }
}
