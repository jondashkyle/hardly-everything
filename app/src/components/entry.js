var html = require('rooch/html')

module.exports = Entry

function Entry (state, data, emit) {
  return html`
    <div class="component-entry c12">
      <div class="ophc dib psr design-block-margin">
        <a
          href="${data.url}"
          class="tc-black"
          onclick=${handleClick}
        >${data.title}</a>
        <div class="psa l0 r0 x xjc op0 ophc100 fs1 fwn sans" style="top: 100%">
          <div class="x">
            <div
              class="curp p0-5 op25 oph100 ${state.ui.entriesViewAll ? 'dn' : 'db'}"
              onclick=${handleClick}
            >
              Hide
            </div>
            <a
              href="/panel/entry/${data.id}"
              class="tc-black p0-5 op25 oph100"
              onclick=${handleClickEdit}
            >
              Edit
            </a>
            <div
              class="dn curp p0-5 op25 oph100"
              onclick=${handleClickDelete}
            >
              Delete
            </div>
          </div>
      </div>
    </div>
  `

  function handleClick (event) {
    emit('entries:dismiss', { id: data.id })
  }

  function handleClickEdit () {
    var staging = state.entries.all[data.id]
    
    if (data.id !== undefined && staging !== undefined) {
      emit('staging:entry', staging)
    }

    event.preventDefault()
  }

  function handleClickDelete () {
    emit('staging:reset')
    emit('entries:remove', { id: data.id })
  }
}
