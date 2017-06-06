var h = require('choo/html')
var ov = require('object-values')
var md = require('marked')

var content = require('../content/tips')

var elEntry = entry => {
  var text = h`<p></p>`
  text.innerHTML = md(entry.text)

  return h`
    <div class="x xw copy" sm="p0">
      <div class="p1 pb2 c4 fwb" md="c12">
        ${entry.title}
      </div>
      <div class="p1 c8" md="c12">
        ${text}
      </div>
    </div>
  `
}

module.exports = (state, prev, send) => {
  var page = state.pages.faq
  var elsEntries = ov(page.content)
    .map(entry => elEntry(entry))

  return h`
    <div>
      ${elsEntries} 
    </div>
  `
}