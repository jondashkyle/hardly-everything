var html = require('choo/html')
var format = require('../components/format')

module.exports = entryBlog

function entryBlog (props) {
  switch (props.category) {
    case 'list':
      return createList(props)
    default:
      return createDefault(props)
  }
}

function createList (props) {
  props.image = false // temp disable
  // var image = '/content/' + props.files['desktop.png']

  return html`
    <div class="lh1-5 py1-5">
      <div class="copy">
        ${props.image
          ? html`<img src="${image}" class="db w100">`
          : ''
        }
        <h2><a href="${props.authorUrl}" target="_blank">${props.author}</a>, what is a site that you visit once every…</h2>
        <div class="x xw">
          <div class="c3 mb1">Day?</div>
          <div class="c9 mb1">
            <a href="${props.links.day.url}" target="_blank">${props.links.day.url}</a>
          </div>
          <div class="c3 mb1">Week?</div>
          <div class="c9 mb1">
            <a href="${props.links.week.url}" target="_blank">${props.links.week.url}</a>
          </div>
          <div class="c3 mb1">Month?</div>
          <div class="c9 mb1">
            <a href="${props.links.month.url}" target="_blank">${props.links.month.url}</a>
          </div>
          <div class="c3">Year?</div>
          <div class="c9">
            <a href="${props.links.year.url}" target="_blank">${props.links.year.url}</a>
          </div>
        </div>
      </div>
      ${createFooter(props)}
    </div>
  `
}

function createDefault (props) {
  return html`
    <div class="lh1-5 py1-5">
      <div class="copy">
        <h2>${props.title}</h2>
        ${format(props.text)}
      </div>
      ${createFooter(props)}
    </div>
  `
}

function createFooter (props) {
  return html`
    <div class="mt1 line bt1-lighter mono fc-black-light">
      Published <span class="mono">${props.date}</span>, <a href="${props.url}">Permalink</a>
    </div>
  `
}