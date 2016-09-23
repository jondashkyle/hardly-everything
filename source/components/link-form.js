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
  const checkInterval = interval =>
    state.panel.staging.interval === interval ? 'selected' : ''

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
        class="c12"
      >
      <input
        name="url"
        placeholder="http://"
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
      <div class="c12">
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
           <div class="x">
            <input
              id="repeat"
              type="checkbox"
              ${state.panel.staging.repeat ? 'checked' : ''}
              onclick=${e => {
                console.log(state.panel.staging.repeat, e.target.checked)
                send('panel:updateStaging', { repeat: e.target.checked })
              }}
            />
            <label for="repeat">Repeat</label>
          </div>
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
