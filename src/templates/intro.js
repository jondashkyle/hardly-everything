var html = require('choo/html')
var containerContent = require('../containers/content')

module.exports = view

function view (state, emit) {
  return containerContent(state, emit, content(state, emit))
}

function content (state, emit) {
  return html`
    <div class="bg-black tc-white mt0-5 fs2 w100 xx x xjc xac">
      Coming soon!
    </div>
  `
}
