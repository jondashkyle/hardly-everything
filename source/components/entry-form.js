const html = require('choo/html')
const sf = require('sheetify')
const x = require('xtend')

const { intToRest } = require('../helpers/time')
const inputRange = require('./input-range')

/**
 * Style
 */
const style = sf`
  :host {
    padding: 1px;
    width: 50%;
  }

  :host > div {
    padding: 1px;
    width: 100%;
  }

  input {
    font-size: 1rem;
    line-height: 3rem;
  }

  input[type="text"] {
    border: 0;
    outline: 0;
    margin: 0;
    padding: 0 1rem;
  }

  input[type="submit"] {
    border: 0;
  }

  input[type="button"] {
    border: 0;
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

  const getTime = value=> intToRest({
    value: value
  })

  return html`
    <form
      autocomplete="off"
      class="${style} x xw bg-black"
      onsubmit=${event => handleSubmit(state, event, send)}
    >
      <div>
        <input
          name="title"
          placeholder="Title"
          value="${state.panel.staging.title}"
          oninput=${e => send('panel:updateStaging', { title: e.target.value })}
          type="text"
          class="c12 sans bg-white"
        />
      </div>
      <div>
        <input
          name="url"
          placeholder="http://"
          value="${state.panel.staging.url}"
          oninput=${e => send('panel:updateStaging', { url: e.target.value })}
          type="text"
          class="c12 sans bg-white"
        />
      </div>
      <div style="line-height: 3rem">
        <div class="c12 bg-white">
          ${inputRange({
            name: 'Rest',
            value: state.panel.staging.timeRange,
            handleInput: value => send('panel:updateStaging', x(getTime(value), {
              timeRange: value
            })) 
          })}
        </div>
      </div>
      <div class="c12 x">
        <input
          type="submit"
          value="Save"
          class="xa bg-white tc-black"
        >
        <input
          name="delete"
          value="Delete"
          class="${state.panel.staging.id ? 'xa' : 'dn'} tc-black"
          onclick=${e => send('entries:remove', { id: state.panel.staging.id })}
          type="button"
        >
      </div>
    </form>
  `
}
