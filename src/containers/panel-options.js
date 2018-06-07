var html = require('choo/html')
var xtend = require('xtend')

var input = require('../components/input')

module.exports = view

function view (state, emit) {
  return html`
    <div class="${state.ui.mobile ? '' : 'panel-content'} x xw c12 bg-black tc-white sans usn">
      <div class="c12 p1px">
        <div class="tc-black bg-white ${state.ui.mobile ? '' : 'brit'} psr z1">
          ${input(state, emit, xtend(state.options.design.font, {
            children: createFontOptions()
          }))}
        </div>
      </div>
      <div class="c12 x">
        <div class="c6 p1px">
          <div class="tc-black bg-white">
            ${input(state, emit, state.options.design.scale)}
          </div>
        </div>
        <div class="c6 p1px">
          <div class="tc-black bg-white">
            ${input(state, emit, state.options.design.spacing)}
          </div>
        </div>
      </div>
      <div class="c12 x">
        <div class="x xx">
          <div class="c6 p1px">
            ${input(state, emit, state.options.design.colorBg)}
          </div>
          <div class="c6 p1px">
            ${input(state, emit, state.options.design.colorText)}
          </div>
        </div>
        <div class="p1px">
          <div class="bg-white tc-black px2 line curp" onclick=${handleInvertClick}>
            Invert
          </div>
        </div>
      </div>
      <div class="c12 p1px">
        <div class="tc-black bg-white line">
          ${input(state, emit, state.options.design.newTab)}
        </div>
      </div>
      <div class="c12 x">
        <div class="xx p1px curp tac">
          <a href="/data" class="line bg-white db bribl tc-black">
            Data
          </a>
        </div>
        <div class="xx p1px curp tac">
          <a href="/blog" class="line bg-white db  tc-black">
            Blog
          </a>
        </div>
        <div class="xx p1px curp tac">
          <a href="/faq" class="line bg-white db bribr tc-black">
            FAQ
          </a>
        </div>
      </div>
      <div class="c12 p1px dn">
        <div class="tc-black bg-white brib line">
          ${input(state, emit, state.options.design.autoDismiss)}
        </div>
      </div>
    </div>
  `

  function createFontOptions () {
    return html`
      <div class="bb2b x">
        <div class="c6 br1b">
          ${input(state, emit, state.options.design.uppercase)}
        </div>
        <div class="c6 bl1b">
          ${input(state, emit, state.options.design.hyphenate)}
        </div>
      </div>
    `
  }

  function handleInvertClick () {
    emit('options:invert')
  }
}
