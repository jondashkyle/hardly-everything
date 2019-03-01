var html = require('choo/html')

var Content = require('../containers/content')
var Blog = require('../containers/blog')

module.exports = view

function view (state, emit) {
  return Content(state, emit, content(state, emit))
}

function content (state, emit) {
  var entries = state.page()
    .children()
    .visible()
    .sortBy('date', 'desc')
    .toArray()

  return state.cache(Blog, 'blog').render({
    entries: entries
  })
}
