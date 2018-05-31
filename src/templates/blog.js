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
    <div class="fs1 lh1-5 xx">
      <div class="p1 copy wrem40">
        ${raw(md(state.page().v('text') || ''))}
      </div>
    </div>
  `
}
