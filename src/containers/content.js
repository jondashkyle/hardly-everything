var html = require('choo/html')

var Panel = require('../containers/panel-container')
var loading = require('../components/loading')

module.exports = containerContent

function containerContent (state, emit, children) {
  var panelProps = {
    isHoverActive: true && !state.ui.mobile,
    view: state.ui.panel.view,
    navChildren: html`
      <a href="/" class="op33 psr db oph100 mx1 tc-black pea">
        <span class="mono mr0-5">←</span>Feed
      </a>
    `
  }

  if (!state.site.loaded) {
    emit(state.events.CONTENT_LOAD)
  }

  return [
    Panel(state, panelProps, emit),
    createNavigation(state, emit),
    createContent()
  ]

  function createContent () {
    return html`
      <div class="vhmn100 x xdc w100 pt3-6">
        ${state.site.loaded
          ? children
          : html`<div class="xx w100">${loading()}</div>`
        }
        ${createFooter(state, emit)}
      </div>
    `
  }
}

function createNavigation (state, emit) {
  var pages = state.page('/').pages().sortBy('name', 'asc').toArray()

  return html`
    <div class="fs1 line psf t0 l0 r0 x xjb z2 bgh-white">
      <div class="x">
        <div class="px1 fwb">
          <a href="/" class="tc-black">Hardly Everything</a>
        </div>
        ${pages.map(createLink)}
      </div>
    </div>
  `  

  function createLink (props) {
    var isActive = state.href.indexOf(props.url) >= 0
    return html`
      <div class="px1">
        <a
          href="${props.url}"
          class="tc-black ${isActive ? '' : 'op33 oph100'}"
        >${props.title}</a>
      </div>
    `
  }
}

function createFooter (state, emit) {
  return html`
    <div class="fs1 line x xjb px1 w100">
      <div>Hardly Everything</div>
      <div>2018</div>
    </div>
  `
}