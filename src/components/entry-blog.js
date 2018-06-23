var objectKeys = require('object-keys')
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
  var links = (typeof props.links === 'object') ? props.links : { }

  return html`
    <div class="px0-5 w100">
      <div class="lh1-5 copy">
        <h2 class="px0-5"><a href="${props.authorUrl}" target="_blank">${props.author}</a>, what is a site that you visit once every…</h2>
        <div class="x xw c12" md="c10 co1 pt3">
          ${objectKeys(links).map(createThumb)}
        </div>
        <div class="px0-5 pt3-5">
          ${createFooter(props)}
        </div>
      </div>
    </div>
  `

  function createThumb (key) {
    var thumb = props.links[key]
    var image = '/content' + props.files[thumb.img]
    var url = thumb.url.replace(/(^\w+:|^)\/\//, '')

    return html`
      <div class="c6 p0-5" sm="c3">
        <div class="ttc pb1 lh1">${key}</div>
        <a href="${thumb.url}" target="_blank" class="db bb0">
          <div class="psr" style="padding-bottom: 75%">
            <img src="${image}" class="bro w100 db h100 psa t0 l0 ofc">
          </div>
          <div class="pt1 pr1 wbba mono">${url}</div>
        </a>
      </div>
    `
  }
}

function createDefault (props) {
  return html`
    <div class="px1 w100 x xw xjc">
      <div class="w100 lh1-5 copy pb3">
        <h2>${props.title}</h2>
      </div>
      <div class="w100 wmxrem60">
        <div class="lh1-5 copy">
          ${format(props.text)}
        </div>
      </div>
      <div class="w100 copy pt3">
        ${createFooter(props)}
      </div>
    </div>
  `
}

function createFooter (props) {
  return html`
    <div class="mono fc-black-light tar">
      Published <span class="mono">${props.date}</span>, <a href="${props.url}">Permalink</a>
    </div>
  `
}