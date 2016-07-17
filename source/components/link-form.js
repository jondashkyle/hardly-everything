const html = require('choo/html')

const submit = (state, event, send) => {
  if (state.panel.staging.id) {
    send('links:update', state.panel.staging)
  } else {
    send('links:add', state.panel.staging)
  }
  event.preventDefault()
}

module.exports = (state, prev, send) => {
  return html`
    <form
      autocomplete="off"
      onsubmit=${event => submit(state, event, send)}
    >
      <input
        name="title"
        placeholder="title"
        value="${state.panel.staging.title}"
        oninput=${e => send('panel:updateStaging', { title: e.target.value })}
        type="text"
      >
      <input
        name="tags"
        placeholder="tags"
        value="${state.panel.staging.tags}"
        oninput=${e => send('panel:updateStaging', { tags: e.target.value })}
        type="text"
      >
      <input
        name="url"
        placeholder="url"
        value="${state.panel.staging.url}"
        oninput=${e => send('panel:updateStaging', { url: e.target.value })}
        type="text"
      >
      <input type="submit" value="Submit">
      <input
        name="delete"
        value="Delete"
        onclick=${e => send('links:remove', { id: state.panel.staging.id })}
        type="button"
      >
    </form>
  `
}
