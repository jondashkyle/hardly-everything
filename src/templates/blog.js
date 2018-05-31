var raw = require('choo/html/raw')
var md = require('nano-markdown')
var html = require('choo/html')

var containerContent = require('../containers/content')

module.exports = view

function view (state, emit) {
  return containerContent(state, emit, content(state, emit))
}

function content (state, emit) {
  var entries = state.page()
    .children()
    .visible()
    .sortBy('date', 'asc')
    .toArray()

  return html`
    <div class="fs1 lh1-5 xx">
      <div class="p1 copy wrem40">
        ${entries.map(createEntry)}
      </div>
    </div>
  `
}

function createEntry (props) {
  return html`
    <div>
      <h2>${props.title}</h2>
      ${raw(md(props.text || ''))}
    </div>
  `
}