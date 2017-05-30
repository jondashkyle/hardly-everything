var html = require('rooch/html')
var css = require('../components/css')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return state.app.loaded
    ? html`
        <div>
          ${[
            css(state, emit),
            view(state, emit)
          ]}
        </div>
      `
    : ''
  }
}
