var html = require('choo/html')

var containerContent = require('../containers/content')
var entryBlog = require('../components/entry-blog')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  return containerContent(state, emit, content(state, emit))
}

function content (state, emit) {
  var entries = state.page()
    .children()
    .visible()
    .sortBy('date', 'desc')
    .toArray()

  return html`
    <div class="fs1 lh1-5 xx x xdc xjc xac py3">
      ${entries.map(entryBlog)}
    </div>
  `
}

