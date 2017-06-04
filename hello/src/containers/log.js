const h = require('choo/html')
const ov = require('object-values')
const md = require('marked')

const content = require('../content/log')

const formatContent = content => {
  const el = h`<div></div>`
  el.innerHTML = md(content)
  return el
}

const elList = (entry, send) => h`
  <div class="p1 x xw">
    <div class="c4 p1" sm="c11">
      <a href=${entry.url}>${entry.title}</a>
    </div>
    <div class="c8 p1" sm="c12">
      ${entry.text}
    </div>
    <div class="c2" sm="dn"></div>
    <div class="c2 p1" sm="c2">
      day
    </div>
    <div class="c7 p1" sm="c10">
      <div>
        <a href="http://${entry.day.url}">${entry.day.url}</a>
      </div>
      <div>
        ${entry.day.text}
      </div>
    </div>
    <div class="c2" sm="dn"></div>
    <div class="c2 p1" sm="c2">
      week
    </div>
    <div class="c8 p1" sm="c10">
      <div>
        <a href="http://${entry.week.url}">${entry.week.url}</a>
      </div>
      <div>
        ${entry.week.text}
      </div>
    </div>
    <div class="c2" sm="dn"></div>
    <div class="c2 p1" sm="c2">
      month
    </div>
    <div class="c8 p1" sm="c10">
      <div>
        <a href="http://${entry.month.url}">${entry.month.url}</a>
      </div>
      <div>
        ${entry.month.text}
      </div>
    </div>
    <div class="c2" sm="dn"></div>
    <div class="c2 p1" sm="c2">
      century
    </div>
    <div class="c8 p1" sm="c10">
      <div>
        <a href="http://${entry.century.url}">${entry.century.url}</a>
      </div>
      <div>
        ${entry.century.text}
      </div>
    </div>
  </div>
`

const elEntry = (entry, send) => h`
  <div class="p1 x xw">
    <div class="p1 c3" sm="c12">
      ${entry.title}
    </div>
    <div class="p1 c9" sm="c12">
      ${formatContent(entry.text)}
    </div>
  </div>
`

const view = (state, prev, send) => {
  return elsContent = ov(content)
    .map(entry => {
      return entry.type === 'list'
        ? elList(entry, send)
        : elEntry(entry, send)
    })
}

module.exports = view