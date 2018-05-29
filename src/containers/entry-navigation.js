var html = require('choo/html')

module.exports = view

function view (state, emit) {
  return html`
    <div class="psf t0 l0 px0-5 lh1 x z4 usn sans fs1">
      <div class="px0-5 line">
        ${state.ui.date}
      </div>
      <div class="px0-5 line">
        <div
          class="
            curp oph100 line pea
            ${state.entries.amount ? '' : 'dn'}
            ${state.ui.entriesViewAll ? 'op100' : 'op33'} 
          "
          sm="${view ? 'dn' : ''}"
          onclick=${function () {
            emit('search:update', { value: '', render: false })
            emit('ui:update', { entriesViewAll: !state.ui.entriesViewAll })
          }}
        >
          All
        </div>
      </div>
      <div class="px0-5 line ${state.entries.amount ? '' : 'dn'}">
        ${elSearch()} 
      </div>
    </div>
  `

  function elSearch () {
    if (!state.features.search) {
      return ''
    }

    return html`
      <div class="pea" sm="dn" style="padding-top: 0.75rem">
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