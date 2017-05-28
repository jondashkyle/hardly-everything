var html = require('choo/html')
var css = require('../components/css')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <div>
        yo wrapper
        ${[
          view(state, emit),
          css(state, emit)
        ]}
      </div>
    `
  }
}
