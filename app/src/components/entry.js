var html = require('rooch/html')

module.exports = Entry

function Entry (state, data, emit) {
  return html`
    <div class="component-entry c12">
      <div class="dib psr design-block-padding">
        <a
          href="${data.url}"
          class="tc-black"
          onclick=${handleClick}
        >${data.title}</a>
        <span
          class="psa t0 r0 curp oph100"
          style="font-size: 11px"
          onclick=${handleClickEdit}
        >EDIT</span>
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
      emit('ui:update', { stagingActive: true })
    }

    event.preventDefault()
  }
}
