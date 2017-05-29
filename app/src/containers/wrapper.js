var html = require('rooch/html')
var css = require('../components/css')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <div>
        ${[
          css(state, emit),
          view(state, emit)
        ]}
      </div>
    `
  }
}
