var html = require('rooch/html')
var css = require('../components/css')

var intro = require('../containers/introduction')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return state.intro.status &&
      !state.user.analytics.authenticated
      ? container(intro(state, emit))
      : state.app.loaded
      ? container(view(state, emit))
      : ''

    function container (content) {
      return html`
        <div>
          ${css(state, emit)}
          ${content}
        </div>
      `
    }
  }
}
