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
        ? 'Edit link'
        : html`<span><span class="new-entry"></span>New link</span>`,
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
  var content = view && view.view && typeof view.view === 'function'
    ? html`
      <div
        class="panel psr c12 sans fs1 pen pb1"
        sm="c12 pt1 mtpx2"
        style="top: 4.5rem"
        onmouseenter=${handleContainerEnter}
      >
        <div class="pea psr ${state.ui.mobile ? 'w100 oh' : ''}">
          <div class="pen z2 ${state.ui.mobile ? '' : 'psa t0 l0 r0 b0 bro b2b'}"></div>
          <div class="p1px" style="${state.ui.mobile ? 'margin: 0 -2px' : ''}">${view.view()}</div>
        </div>
      </div>
      `
    : ''

  return html`
    <div
      class="${view && !state.ui.mobile ? 'psf t0 r0 b0 z3 px1' : ''}"
      onclick=${handleContainerClick}
      data-panel
    >
      <div
        class="${state.ui.mobile ? '' : 'wrem40'}"
        sm="c12"
        onmouseleave=${handlePanelLeave}
      >
        <div
          class="psf t0 r0 z4 ${state.ui.mobile ? 'bg-white bb2b' : ''}"
          sm="r0"
        >${navigation()}</div>
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
            curd psr db oph100 mx1 tc-black pea
          "
        >${view.title}</div>
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
        >${view.title}</a>
      `
    }

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
