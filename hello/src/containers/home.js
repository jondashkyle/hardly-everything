var h = require('choo/html')
var ov = require('object-values')
var md = require('nano-markdown')

var getContent = content => {
  var el = h`<div></div>`
  var text = md(content)
  el.innerHTML = text
  return el
}

var view = (state, prev, send) => {
  var page = state.pages.home
  return h`<div class="bg-black tc-white">yo</div>`
}

module.exports = view