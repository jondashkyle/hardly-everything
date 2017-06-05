var h = require('choo/html')
var ov = require('object-values')
var md = require('marked')

var content = require('../content/log')

module.exports = view

function formatContent (content) {
  var el = h`<div></div>`
  el.innerHTML = md(content)
  return el
}

function elList (entry, send){
  return h`
    <div class="p1 x xw" sm="p0">
      <div class="c4 p1" sm="c11">
        <div class="fwb">
          <a href=${entry.url}>${entry.title}</a>
        </div>
        <div>
          ${formatDate(entry.date)}
        </div>
      </div>
      <div class="c8 x xw" sm="c12">
        <div class="p1 ${entry.text ? '' : 'dn'}">
          ${entry.text}
        </div>
        <div class="c4 p1" sm="c2">
          Day
        </div>
        <div class="c8 p1" sm="c10">
          <div>
            <a href="http://${entry.day.url}">${entry.day.url}</a>
          </div>
          <div>
            ${entry.day.text}
          </div>
        </div>
        <div class="c4 p1" sm="c2">
          Week
        </div>
        <div class="c8 p1" sm="c10">
          <div>
            <a href="http://${entry.week.url}">${entry.week.url}</a>
          </div>
          <div>
            ${entry.week.text}
          </div>
        </div>
        <div class="c4 p1" sm="c2">
          Month
        </div>
        <div class="c8 p1" sm="c10">
          <div>
            <a href="http://${entry.month.url}">${entry.month.url}</a>
          </div>
          <div>
            ${entry.month.text}
          </div>
        </div>
        <div class="c4 p1" sm="c2">
          Century
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
    </div>
  `
}

function elEntry  (entry, send) {
  return h`
    <div class="p1 x xw">
      <div class="p1 c4" sm="c12">
        <div class="fwb">
          ${entry.title}
        </div>
        <div>
          ${formatDate(entry.date)}
        </div>
      </div>
      <div class="p1 c8" sm="c12">
        ${formatContent(entry.text)}
      </div>
    </div>
  `
}

function view (state, prev, send) {
  return ov(content)
    .map(function (entry) {
      return h`
        <div class="mb4">
          ${entry.type === 'list'
            ? elList(entry, send)
            : elEntry(entry, send)
          }
        </div>
      `
    })
}

function formatDate (date) {
  var monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()

  return `${monthNames[monthIndex]} ${day}, ${year}`
}
