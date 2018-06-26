var html = require('choo/html')

module.exports = Entry

function Entry (state, data, emit) {
  return html`
    <div id="entry-${data.id}" class="component-entry c12 psr">
      <div class="ophc dib design-block-padding">
        <a
          href="${data.url}"
          target="${state.options.values.newTab ? '_blank' : '_self'}"
          class="tc-black"
          onclick=${handleClick}
        >${data.title}</a>
        <div
          class="usn psa l0 r0 x xjc fs1 fwn sans z2"
          style="top: calc(100% - 1.25rem)"
        >
          <div class="x op0 ophc33 oph100">
            <div
              class="curp tc-black p0-5 op50 oph100 ${state.ui.entriesViewAll ? 'dn' : 'db'}"
              onclick=${handleClick}
            ><div class="icon icon-eye"></div></div>
            <div
              class="curp tc-black p0-5 op50 oph100"
              onclick=${handleClickEdit}
            ><div class="icon icon-settings"></div></div>
            <div
              class="curp p0-5 op50 oph100"
              onclick=${handleClickDelete}
            ><div class="icon icon-trash"></div></div>
          </div>
      </div>
    </div>
  `

  function handleClick (event) {
    emit('entries:dismiss', { id: data.id })
  }

  function handleClickEdit (event) {
    var staging = state.entries.all[data.id]

    // toggle
    if (data.id === state.staging.entry.id) {
      emit('staging:reset')
      emit('ui:panel', { view: '' })
    } else {
      if (data.id !== undefined && staging !== undefined) {
        emit('staging:entry', staging)
        emit('ui:panel', { view: 'entry' })
      }
    }

    event.preventDefault()
  }

  function handleClickDelete () {
    emit('staging:reset')
    emit('entries:remove', { id: data.id })
  }
}
