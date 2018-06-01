var html = require('choo/html')

var containerContent = require('../containers/content')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  return containerContent(state, emit, content(state, emit))
}

function content (state, emit) {
  var text = state.page().v('text') || ''
  var answers = text
    .split('##')
    .filter(str => str)
    .map(str => '##' + str)

  return html`
    <div class="xx fs1 lh1-5">
      <div class="p0-5" sm="tc2" md="tc3">
        ${answers.map(createAnswer)}
      </div>
    </div>
  `

  function createAnswer (props) {
    return html`
      <div class="p0-5 faq-answer copy">
        ${format(props)}
      </div>
    `
  }
}
