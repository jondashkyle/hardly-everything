var h = require('choo/html')
var ov = require('object-values')
var md = require('marked')

var getContent = content => {
  var el = h`<div></div>`
  el.innerHTML = md(content)
  return el
}

var elEntry = (entry, send) => h`
  <div>
    <div class="x">
      <div class="c8 p1 pt1-75 fwb" md="c11">
        ${entry.question}
      </div>
    </div>
    <div class="x xje">
      <div class="c8 p1 pt1-75 xje copy" md="c12">
        ${getContent(entry.answer)}
      </div>
    </div>
  </div>
`

var view = (state, prev, send) => {
  var page = state.pages.about
  var elsContent = ov(page.content)
    .map(entry => elEntry(entry, send))

  return h`
    <div>
      ${elsContent}
    </div>
  `
}

module.exports = view