var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var shouldSearchHide = state.ui.entriesViewAll && !state.ui.mobile && state.entries.amount

  return html`
    <div class="
      psf t0 l0 lh1 x z3 usn sans fs1
      ${state.ui.mobile ? 'r0 bg-white bb2b' : ''}
    ">
      <div class="px1 line fwb">
        <a href="/" class="tc-black">${state.ui.date}</a>
      </div>
      <div class="px1 line">
        <a
          href="${state.ui.entriesViewAll ? '/' : '/all'}"
          class="
            tc-black curp oph100 line pea
            ${state.entries.amount ? '' : 'dn'}
            ${state.ui.entriesViewAll ? 'op100' : 'op33'} 
          "
          onclick=${handleAllClick}
        >View all</a>
      </div>
      <div class="px1 line ${shouldSearchHide ? '' : 'dn'}">
        ${elSearch()} 
      </div>
    </div>
  `

  function handleAllClick () {
    emit('search:update', { value: '', render: false })
    emit('ui:update', { entriesViewAll: !state.ui.entriesViewAll })
  }

  function elSearch () {
    if (!state.features.search) {
      return ''
    }

    return html`
      <div class="pea dn" sm="db" style="padding-top: 0.75rem">
        ${navigationSearch({
          value: state.search.term,
          onFocus: function () {
            emit('search:update', {
              hidePanel: true
            })
          },
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
    `
  }
}

function navigationSearch (props = { }) {
  return html`
    <input
      type="text"
      placeholder="Search…"
      value="${props.value || ''}"
      class="db fs1 ff-sans tc-black"
      style="background: none"
      oninput=${handleInput}
      onfocus=${handleFocus}
    />
  `

  function handleInput (event) {
    if (props.onInput) {
      props.onInput({
        value: event.target.value
      })
    }
  }

  function handleFocus (event) {
    if (props.onFocus) {
      props.onFocus({
        value: event.target.value
      })
    }
  }
}
