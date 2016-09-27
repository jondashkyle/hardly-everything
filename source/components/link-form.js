const html = require('choo/html')
const sf = require('sheetify')

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
  const checkInterval = interval => {
    return state.panel.staging.interval === interval ? 'selected' : ''
  }

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
        <div class="x">
          <div>Timeout:</div>
          <input
            type="number"
            name="duration"
            min="1"
            max="60"
            oninput=${e => send('panel:updateStaging', { duration: e.target.value })}
            value=${state.panel.staging.duration}
          />
          <select
            oninput=${e => send('panel:updateStaging', { interval: e.target.value })}
          >
            <option value="minutes" ${checkInterval('minutes')}>Minutes</option>
            <option value="hours" ${checkInterval('hours')}>Hours</option>
            <option value="days" ${checkInterval('days')}>Days</option>
            <option value="weeks" ${checkInterval('weeks')}>Weeks</option>
            <option value="months" ${checkInterval('months')}>Months</option>
          </select>
        </div>
        <div class="c12 x">
          <div>
            Rest
          </div>
          <input type="range"/> 
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
          onclick=${e => send('links:remove', { id: state.panel.staging.id })}
          type="button"
        >
      </div>
    </form>
  `
}
