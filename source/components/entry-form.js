const html = require('choo/html')
const sf = require('sheetify')
const x = require('xtend')

const { intToRest } = require('../helpers/time')

/**
 * Style
 */
const style = sf`
  :host {
    background: #000;
    padding: 2px;
    width: 50%;
  }

  input {
    font-size: 2rem;
  }

  input[type="text"] {
    border: 0;
    outline: 0;
    margin: 0;
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
const handleSubmit = (state, event, send) => {
  if (state.panel.staging.id) {
    send('entries:update', state.panel.staging)
  } else {
    send('entries:add', state.panel.staging)
  }
  event.preventDefault()
}

/**
 * View
 */
module.exports = (state, prev, send) => {
  const checkInterval = interval => {
    return state.panel.staging.interval === interval ? 'selected' : ''
  }

  const getTime = e => intToRest({
    value: parseInt(e.target.value)
  })

  return html`
    <form
      autocomplete="off"
      class="${style} x xw"
      onsubmit=${event => handleSubmit(state, event, send)}
    >
      <input
        name="title"
        placeholder="Title"
        value="${state.panel.staging.title}"
        oninput=${e => send('panel:updateStaging', { title: e.target.value })}
        type="text"
        class="c12 sans"
      >
      <input
        name="url"
        placeholder="http://"
        value="${state.panel.staging.url}"
        oninput=${e => send('panel:updateStaging', { url: e.target.value })}
        type="text"
        class="c12 sans"
      >
      <div class="c12 bg-white">
        <div class="c12 x">
          <div>
            Rest
          </div>
          <div>
            ${state.panel.staging.duration}
            ${state.panel.staging.interval}
          </div>
        </div>
        <div class="c12">
          <input
            class="c12"
            type="range"
            min="0"
            max="100"
            value=${state.panel.staging.timeRange}
            oninput=${e => send('panel:updateStaging', x(getTime(e), {
              timeRange: parseInt(e.target.value)
            }))}
          /> 
        </div>
      </div>
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
          onclick=${e => send('entries:remove', { id: state.panel.staging.id })}
          type="button"
        >
      </div>
    </form>
  `
}
