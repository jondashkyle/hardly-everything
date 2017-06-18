var html = require('rooch/html')
var ov = require('object-values')

var panelEntry = require('../containers/panel-entry')
var panelOptions = require('../containers/panel-options')

module.exports = view

function view (state, props, emit) {
  props = props || { }
  
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

  var view = views[props.view]
  var content = view && view.view && typeof view.view === 'function'
    ? html`
      <div
        class="panel psr c12 sans fs1 pen pb1"
        sm="c12 pt1 mtpx2"
        style="top: 4.5rem"
      >
        <div class="pea psr">
          <div class="psa t0 l0 r0 b0 bro b2b pen z2"></div>
          <div class="p1px">${view.view()}</div>
        </div>
      </div>
      `
    : ''


  return html`
    <div
      class="${view && !state.ui.mobile ? 'psf t0 l0 r0 b0 z3' : ''} px1"
      onclick=${handleContainerClick}
      data-panel
    >
      <div
        class="wrem40"
        sm="c12"
        onmouseleave=${handlePanelLeave}
      >
        <div
          class="psf t0 l0 px1 z3 ${state.ui.mobile ? 'bg-white bb2b' : ''}"
          sm="r0"
        >
          ${navigation()} 
        </div>
        ${content}
      </div>
    </div>
  `

  function wrapper (content) {

  }

  function navigation () {
    return html`
      <div class="x line c12 tc-black fs1 pen usn">
        ${ov(views)
          .filter(view => view.active !== false)
          .map(navigationLink)
        }
        <div class="mr1"></div> 
        <div
          class="
            mr1 curp oph100 line pea
            ${state.entries.amount ? '' : 'dn'}
            ${state.ui.entriesViewAll ? 'op100' : 'op33'} 
          "
          sm="${view ? 'dn' : ''}"
          onclick=${e => emit('ui:update', {
            entriesViewAll: !state.ui.entriesViewAll
          })}>
          All
        </div>
        <div class="pea">
          ${navigationSearch({
            onInput: function (data) {
              emit('search:update', {
                all: true,
                value: data.value,
                hidePanel: true,
                render: true
              })
            }
          })}
        </div>
      </div>
    `
  }

  function navigationLink (view) {
    var active = view.path === props.view

    if (props.isHoverActive) {
      return html` 
        <div
          onmouseenter=${handleLinkEnter}
          class="
            ${active ? 'op100 arrow-bottom' : 'op33'}
            curd psr db oph100 mr1 tc-black pea
          "
        >
          ${view.title}
        </div>
      `
    } else {
      return html` 
        <a
          href="${active ? '/' : '/panel/' + view.path}"
          onmouseenter=${handleLinkEnter}
          class="
            ${active ? 'op100 arrow-bottom' : 'op33'}
            psr db oph100 mr1 tc-black pea
          "
        >
          ${view.title}
        </a>
      `
    }

    function handleLinkEnter () {
      if (
        props.isHoverActive &&
        view.path !== props.view
      ) {
        emit('ui:panel', { view: view.path })
      }
    }
  }

  function handleContainerClick (event) {
    if (event.target.hasAttribute('data-panel')) {
      emit('staging:reset')
      if (props.isHoverActive) {
        emit('ui:panel', { view: '' })
      } else {
        emit('pushState', '/')
      }
    }
  }

  function handlePanelLeave (event) {
    if (props.isHoverActive && props.view) {
      emit('staging:reset')
      emit('ui:panel', { view: '' })
    }
  }

}

function navigationSearch (props = { }) {
  return html`
    <input
      type="text"
      placeholder="Search…"
      class="fs1 ff-sans tc-black"
      style="background: none"
      oninput=${handleInput}
    />
  `

  function handleInput () {
    if (props.onInput) {
      props.onInput({
        value: event.target.value
      })
    }
  }
}