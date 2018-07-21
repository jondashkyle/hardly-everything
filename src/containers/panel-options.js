var html = require('choo/html')
var xtend = require('xtend')

var input = require('../components/input')

module.exports = view

function view (state, emit) {
  var disabled = isDisabled()

  return html`
    <div
      id="panel-options"
      class="${state.ui.mobile ? '' : 'panel-content'} x xw c12 bg-black tc-white sans usn"
    >
      ${disabled ? createOverlay() : ''}
      <div class="c12 p1px">
        <div class="tc-black bg-white psr z1 ${disabled ? 'pen' : ''} ${state.ui.mobile ? '' : 'brit'}">
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
        <div class="tc-black bg-white">
          ${input(state, emit, state.options.design.css)}
        </div>
      </div>
      <div class="c12 p1px">
        <div class="tc-black bg-white line">
          ${input(state, emit, state.options.design.newTab)}
        </div>
      </div>
      <div class="c12 p1px ${disabled ? 'pen' : ''}">
        <div class="tc-black bg-white line">
          ${input(state, emit, state.options.data)}
        </div>
      </div>
      <div class="c12 x">
        <div class="xx p1px curp tac">
          <a href="/about" class="line bg-white db bribl tc-black">
            About
          </a>
        </div>
        <div class="xx p1px curp tac">
          <a href="/blog" class="line bg-white db tc-black">
            Blog
          </a>
        </div>
        <div class="xx p1px curp tac">
          <a href="/faq" class="line bg-white db tc-black">
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

  function isDisabled () {
    return (state.href === ('' || '/') &&
      !state.entries.amount) ||
      (state.href === ('/blog' || '/about' || '/faq'))
  }

  function createOverlay () {
    return html`
      <div
        id="panel-overlay"
        class="x xjc xac psa t0 b0 l0 r0 z2 tc-black"
        style="
          background: rgba(var(--bg), 0.835);
          margin: 0.4rem 0.2rem 10rem 0.2rem;
        "
      ></div>
    `
  }

  function createFontOptions () {
    return html`
      <div class="bb2-lighter x">
        <div class="c6 br1-lighter">
          ${input(state, emit, state.options.design.uppercase)}
        </div>
        <div class="c6 bl1-lighter">
          ${input(state, emit, state.options.design.hyphenate)}
        </div>
      </div>
    `
  }

  function handleInvertClick () {
    emit('options:invert')
  }
}
