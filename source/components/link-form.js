const html = require('choo/html')
const sf = require('sheetify')

/**
 * Style
 */
const style = sf`
  :host {
    background: rgba(127, 127, 127, 0.2);
    padding: 2px;
    width: 50%;
  }

  input {
    font-size: 2rem;
  }

  input[type="text"] {
    border: 0;
    outline: 0;
    margin: 0 0 2px 0;
    padding: 0.5rem 1rem;
  }

  input[type="submit"] {
    background: #000;
    border: 0;
    color: #fff;
  }

  input[type="button"] {
    background: #808080;
    border: 0;
    color: #fff;
  }
`

/**
 * Submit
 */
const submit = (state, event, send) => {
  if (state.panel.staging.id) {
    send('links:update', state.panel.staging)
  } else {
    send('links:add', state.panel.staging)
  }
  event.preventDefault()
}

/**
 * View
 */
module.exports = (state, prev, send) => {
  return html`
    <form
      autocomplete="off"
      class="${style} x xw"
      onsubmit=${event => submit(state, event, send)}
    >
      <input
        name="title"
        placeholder="Title"
        value="${state.panel.staging.title}"
        oninput=${e => send('panel:updateStaging', { title: e.target.value })}
        type="text"
        class="c12"
      >
      <input
        name="url"
        placeholder="URL"
        value="${state.panel.staging.url}"
        oninput=${e => send('panel:updateStaging', { url: e.target.value })}
        type="text"
        class="c12"
      >
      <input
        name="tags"
        placeholder="just, some, tags"
        value="${state.panel.staging.tags}"
        oninput=${e => send('panel:updateStaging', { tags: e.target.value })}
        type="text"
        class="c12"
      >
      <div class="c12 x">
        <input
          type="submit"
          value="Save"
          class="xa"
        >
        <input
          name="delete"
          value="Delete"
          class="${state.panel.staging.id ? 'xa' : 'dn'}"
          onclick=${e => send('links:remove', { id: state.panel.staging.id })}
          type="button"
        >
      </div>
    </form>
  `
}
