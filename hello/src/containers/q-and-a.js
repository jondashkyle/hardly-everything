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
      <div class="c1 p1 fwb">
        Q
      </div>
      <div class="c7 p1" md="c11">
        ${entry.question}
      </div>
    </div>
    <div class="x xje">
      <div class="c1 p1 fwb" style="margin-right: auto">
        A
      </div> 
      <div class="c7 p1 xje" md="c12">
        ${getContent(entry.answer)}
      </div>
    </div>
  </div>
`

var view = (state, prev, send) => {
  var page = state.pages.about
  var elsContent = ov(page.content)
    .map(entry => elEntry(entry, send))

  return h`<div>
    <div class="x">
      <div class="c5 p1" md="c1">

      </div>
      <div class="c7 p1">
        Questions & answers w/ <a href="http://jon-kyle.com">Jon-Kyle</a>
      </div>
    </div>
    ${elsContent}
  </div>`
}

module.exports = view