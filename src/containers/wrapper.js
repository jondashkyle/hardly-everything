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
        </body>
      `
    }
  }
}

function loading () {
  return html`<div class="loader" data-load></div>`
}
