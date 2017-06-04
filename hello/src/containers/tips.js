const h = require('choo/html')
const ov = require('object.values')
const md = require('marked')

const content = require('../content/tips')

const elEntry = entry => {
  const text = h`<p></p>`
  text.innerHTML = md(entry.text)

  return h`<div class="x xw p1">
    <div class="p1 c4" sm="c12">
      ${entry.title}
    </div>
    <div class="p1 c8" sm="c12">
      ${text}
    </div>
  </div>`
}

module.exports = (state, prev, send) => {
  const page = state.pages.tips
  const elsEntries = ov(page.content)
    .map(entry => elEntry(entry))

  return  h`
    <div>
      ${elsEntries} 
    </div>
  `
}