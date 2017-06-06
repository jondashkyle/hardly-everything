var h = require('choo/html')
var ov = require('object-values')
var md = require('marked')

var getContent = content => {
  var el = h`<div></div>`
  el.innerHTML = md(content)
  return el
}

var view = (state, prev, send) => {
  var page = state.pages.about

  return h`
    <div class="bg-black tc-white p1">
      <div class="c8 co2" sm="c12 co0" md="c10 co1">
        ${getContent(page.content.text)}
      </div>
    </div>
  `
}

module.exports = view