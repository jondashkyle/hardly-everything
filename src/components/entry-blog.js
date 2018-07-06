var Monoimage = require('monoimage')
var objectKeys = require('object-keys')
var html = require('choo/html')
var format = require('../components/format')

module.exports = entryBlog

function entryBlog (state, emit, props) {
  switch (props.category) {
    case 'list':
      return createList(state, emit, props)
    default:
      return createDefault(props)
  }
}

function createList (state, emit, props) {
  props.image = false // temp disable
  var links = (typeof props.links === 'object') ? props.links : { }

  return html`
    <div class="px0-5 w100 lh1-5">
      <div class="px0-5 pt3 fs2 lh1-5 tac serif">
        <a href="${props.authorUrl}" class="tc-black a" target="_blank">${props.author}</a>, what is a link you want to remember once every…
      </div>
      <div class="x xw c12 pt2" md="c10 co1 pt3">
        ${objectKeys(links).map(createThumb)}
      </div>
    </div>
  `

  function createThumb (key) {
    var thumb = props.links[key]
    var image = '/content' + props.files[thumb.img]
    var url = thumb.url.replace(/(^\w+:|^)\/\//, '')

    return html`
      <div class="c6 p0-5" sm="c3">
        <div class="ttc pb1 lh1 tac">${key}</div>
        <a href="${thumb.url}" target="_blank" class="db bb0">
          <div class="brot px1 py0-5 bg-black">
            <div class="tc-white oh wsnw fs0-7 tac">${thumb.title}</div>
          </div>
          <div class="brob b2b ofc list-thumb">
            ${state.cache(Monoimage, image).render({
              sizes: { 100: image },
              dimensions: { ratio: 75 }
            })}
          </div>
        </a>
      </div>
    `
  }
}

function createDefault (props) {
  return html`
    <div class="px1 w100 x xw xjc">
      <div class="w100 lh1-5 serif fs3 pb3">
        ${props.title}
      </div>
      <div class="w100 wmxrem60">
        <div class="lh1-5 copy">
          ${format(props.text)}
        </div>
      </div>
    </div>
  `
}
