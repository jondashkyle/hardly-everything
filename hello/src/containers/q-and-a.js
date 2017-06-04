const h = require('choo/html')
const ov = require('object-values')
const md = require('marked')

const getContent = content => {
  const el = h`<div></div>`
  el.innerHTML = md(content)
  return el
}

const elEntry = (entry, send) => h`
  <div class="p1">
    <div class="x">
      <div class="c1 p1 fwb">
        Q
      </div>
      <div class="c8 p1" sm="c11">
        ${entry.question}
      </div>
    </div>
    <div class="x xje">
      <div class="c1 p1 fwb" style="margin-right: auto">
        A
      </div> 
      <div class="c8 p1 xje" sm="c12">
        ${getContent(entry.answer)}
      </div>
    </div>
  </div>
`

const view = (state, prev, send) => {
  const page = state.pages.about
  const elsContent = ov(page.content)
    .map(entry => elEntry(entry, send))

  return h`<div>
    <div class="x p1">
      <div class="c4 p1" sm="c1">

      </div>
      <div class="c8 p1">
        questions & answers w/ <a href="http://jon-kyle.com">jon-kyle</a>
      </div>
    </div>
    ${elsContent}
  </div>`
}

module.exports = view