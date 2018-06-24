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
    <div class="fs1 lh1-5 xx x xdc xjc xac">
      ${createEntries()}
    </div>
  `

  function createEntries () {
    return entries.map(function (props) {
      return html`
        <div class="w100 bb1-lighter py1">
          ${entryBlog(props)}
          ${createFooter(props)}
        </div>
      `
    })
  }
}

function createFooter (props) {
  return html`
    <div class="mono fc-black-light tar pt3 pr1">
      Published <span class="mono">${props.date}</span>, <a href="${props.url}" class="a">Permalink</a>
    </div>
  `
}