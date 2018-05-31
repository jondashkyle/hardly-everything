var html = require('choo/html')
var css = require('../components/css')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return state.app.loaded
      ? container(view(state, emit))
      : container(loading())

    function container (content) {
      return html`
        <body class="sans bg-white tc-black">
          ${css(state, emit)}
          ${content}
          ${preloadFonts()}
        </body>
      `
    }
  }
}

function loading () {
  return html`<div class="loader" data-load></div>`
}

function preloadFonts () {
  return html`
    <div class="psf t0 op0 pen">
      <div class="mono"></div>
      <div class="serif"></div>
    </div>
  `
}