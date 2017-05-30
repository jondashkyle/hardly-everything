var html = require('rooch/html')
var ov = require('object-values')

var panelEntry = require('../containers/panel-entry')
var panelOptions = require('../containers/panel-options')

module.exports = view

function view (state, emit) {
  var views = {
    options: {
      title: 'Options', 
      path: 'options',
      view: () => panelOptions(state, emit)
    },
    entry: {
      title: 'Entry',
      path: 'entry',
      view: () => panelEntry(state, emit)
    },
    sync: {
      title: 'Sync',
      path: 'sync',
      active: false,
      view: () => html`<div class="bro bg-black tc-white px1 line">Coming soon</div>`
    }
  }

  var view = views[state.params.view]
  var content = view && view.view && typeof view.view === 'function'
    ? view.view()
    : ''


  return html`
    <div
      class="psf t0 l0 ${view ? 'r0 b0' : ''} px1 z3"
      onclick=${handleContainerClick}
      data-panel
    >
      <div class="wrem40 p1px sans fs1 pen" sm="c12">
        ${navigation()} 
        <div class="pea">${content}</div>
      </div>
    </div>
  `

  function navigation () {
    return html`
      <div class="x line c12 tc-black fs1 pen">
        ${ov(views)
          .filter(view => view.active !== false)
          .map(navigationLink)
        }
      </div>
    `
  }

  function navigationLink (view) {
    var active = view.path === state.params.view
    return html` 
      <a
        href="${active ? '/' : '/panel/' + view.path}"
        class="
          ${active ? 'op100 arrow-bottom' : 'op33'}
          psr db oph100 mr1 tc-black pea
        "
      >
        ${view.title}
      </a>
    `
  }

  function handleContainerClick (event) {
    if (event.target.hasAttribute('data-panel')) {
      emit('pushState', '/')
      emit('staging:reset')
    }
  }
}
