var html = require('choo/html')
var ov = require('object-values')

var panelEntry = require('../containers/panel-entry')
var panelOptions = require('../containers/panel-options')

var hideFrame

module.exports = view

function view (state, props, emit) {
  props = props || { }

  var views = {
    entry: {
      title: state.staging.entry.id
        ? 'Edit'
        : html`<span><span class="new-entry"></span>Follow</span>`,
      path: 'entry',
      view: () => panelEntry(state, emit)
    },
    options: {
      title: 'Options',
      path: 'options',
      view: () => panelOptions(state, emit)
    }
  }

  var view = views[props.view]
  var content = (
    view && view.view &&
    typeof view.view === 'function'
  ) ? html`
      <div
        class="panel psr c12 sans fs1 pen pb1"
        style="top: 4.5rem"
        onmouseenter=${handleContainerEnter}
      >
        <div class="pea psr ${state.ui.mobile ? 'w100 oh' : ''}">
          <div class="pen z2 ${state.ui.mobile ? '' : 'psa t0 l0 r0 b0 bro b2b'}"></div>
          <div
            class="bb1b"
            sm="p1px bb0"
            style="${state.ui.mobile ? 'margin: 0 -1px' : ''}"
          >
            ${view.view()}
          </div>
        </div>
      </div>
      `
    : ''

  return html`
    <div
      class="${view && !state.ui.mobile ? 'psf t0 r0 z3 px1' : ''}"
      onclick=${handleContainerClick}
      data-panel
    >
      <div
        class="${state.ui.mobile ? '' : 'wrem40'}"
        onmouseleave=${handlePanelLeave}
      >
        <div
          class="psf t0 r0 z4 ${state.ui.mobile ? 'bg-white bb2b' : ''}"
        >${navigation()}</div>
        ${content}
      </div>
    </div>
  `

  function wrapper (content) {

  }

  function navigation () {
    return html`
      <div
        class="x line c12 tc-black fs1 pen usn"
      >
        ${props.navChildren}
        ${ov(views)
          .filter(view => view.active !== false)
          .map(navigationLink)
        }
      </div>
    `
  }

  function navigationLink (view) {
    var active = view.path === props.view
    var href = active && state.href !== ''
      ? '/'
      : '/panel/' + view.path

    return html` 
      <a
        href="${href}"
        onclick=${hide}
        onmouseenter=${handleLinkEnter}
        class="
          ${active ? 'op100 arrow-bottom' : 'op33'}
          psr db oph100 mr1 tc-black pea
        "
      >${view.title}</a>
    `

    function handleLinkEnter () {
      clearTimeout(hideFrame)
      if (
        props.isHoverActive &&
        view.path !== props.view
      ) {
        emit('ui:panel', { view: view.path })
      }
    }
  }

  function handleContainerEnter () {
    clearTimeout(hideFrame)
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
      clearTimeout(hideFrame)
      hideFrame = setTimeout(() => hide(), 750)
    }
  }

  function hide () {
    emit('staging:reset')
    emit('ui:panel', { view: '' })
  }
}
