var html = require('choo/html')
var navigation = require('./navigation')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <main class="fs1 lh1-5">
        ${navigation(state, emit)}
        <div class="mxa p3 wmx100" sm="p0">
          ${view(state, emit)}
        </div>
      </main>
    `
  }
}