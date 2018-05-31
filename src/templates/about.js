var raw = require('choo/html/raw')
var md = require('nano-markdown')
var html = require('choo/html')

var containerContent = require('../containers/content')

module.exports = view

function view (state, emit) {
  return containerContent(state, emit, content(state, emit))
}

function content (state, emit) {
  return html`
    <div class="xx x xjc xac py4 fs1-5 lh1-5" sm="fs2">
      <div class="p1 copy serif w100 wmxrem70">
        ${raw(md(state.page().v('text') || ''))}
      </div>
    </div>
  `
}
