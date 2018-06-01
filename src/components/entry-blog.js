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
  return html`
    <div class="lh1-5 b2b bro">
      <div class="p2 copy">
        <h2><a href="${props.authorUrl}" target="_blank">${props.author}</a>, what is a site you visit…</h2>
        <p>
          <span class="fc-black-light">once every day</span><br/>
          <a href="${props.links.day.url}" target="_blank">${props.links.day.url}</a>
        </p>
        <p>
          <span class="fc-black-light">once every week</span><br/>
          <a href="${props.links.week.url}" target="_blank">${props.links.week.url}</a>
        </p>
        <p>
          <span class="fc-black-light">once every month</span><br/>
          <a href="${props.links.month.url}" target="_blank">${props.links.month.url}</a>
        </p>
        <p>
          <span class="fc-black-light">once every year</span><br/>
          <a href="${props.links.year.url}" target="_blank">${props.links.year.url}</a>
        </p>
        <p>
          <span class="fc-black-light">once every century</span><br/>
          <a href="${props.links.century.url}" target="_blank">${props.links.century.url}</a>
        </p>
      </div>
      ${createFooter(props)}
    </div>
  `
}

function createDefault (props) {
  return html`
    <div class="lh1-5 b2b bro">
      <div class="copy p2">
        <h2>${props.title}</h2>
        ${format(props.text)}
      </div>
      ${createFooter(props)}
    </div>
  `
}

function createFooter (props) {
  return html`
    <div class="fc-black-light p1 bt2-lighter">
      Published <span class="mono">${props.date}</span>, <a href="${props.url}">Permalink</a>
    </div>
  `
}