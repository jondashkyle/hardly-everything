var html = require('choo/html')

module.exports = componentLoading

function componentLoading (state, emit) {
  return html`<div class="loader"></div>`
}
