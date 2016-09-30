const h = require('choo/html')
const sf = require('sheetify')
const x = require('xtend')

const { intToRest } = require('../helpers/time')
const inputRange = require('../components/input-range')

/**
 * Style
 */
const style = sf`
  :host {
    padding: 1px;
    width: 50%;
  }

  :host > div {
    width: 100%;
  }

  input {
    font-size: 1rem;
    height: 3rem;
    line-height: 3rem;
    outline: 0;
  }

  input[type="text"] {
    border: 0;
    outline: 0;
    margin: 0;
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
const handleSubmit = (state, prev, send, event) => {
  console.log(state.staging.id)
  if (state.staging.id) {
    send('entries:update', state.staging.entry)
  } else {
    send('entries:add', state.staging.entry)
  }
  event.preventDefault()
}

const handleLoad = (state, prev, send, element) => {
  const title = element.querySelector('[name="title"]')
  title.focus()
}

const reset = send => {
  send('ui:update', { stagingActive: false })
  send('staging:reset')
}

const remove = (id, send) => {
  reset(send)
  send('entries:remove', { id: id })
}

const form = (state, prev, send) => {
  const getTime = value => intToRest({
    value: value
  })

  return h`
    <form
      autocomplete="off"
      class="${style} x xw bg-black bro"
      onload=${element => handleLoad(state, prev, send, element)}
      onsubmit=${event => handleSubmit(state, prev, send, event)}
    >
      <div class="p1px">
        <input
          name="title"
          placeholder="Title"
          value="${state.staging.entry.title}"
          oninput=${e => send('staging:entry', { title: e.target.value })}
          type="text"
          class="c12 sans bg-white px1 brit"
        />
      </div>
      <div class="p1px">
        <input
          name="url"
          placeholder="http://"
          value="${state.staging.entry.url}"
          oninput=${e => send('staging:entry', { url: e.target.value })}
          type="text"
          class="c12 sans bg-white px1"
        />
      </div>
      <div class="c12 x" style="line-height: 3rem">
        <div class="c8 p1px">
          <div class="c12 bg-white">
            ${inputRange({
              name: 'Rest',
              value: state.staging.entry.timeRange,
              valueShow: false,
              handleInput: value => send('staging:entry', x(getTime(value), {
                timeRange: value
              }))
            })}
          </div>
        </div>
        <div class="c2 p1px">
          <input
            value=${state.staging.entry.duration}
            oninput=${e => send('staging:entry', {
              timeRange: 0,
              duration: parseInt(e.target.value || 0)
            })}
            type="text"
            class="p0 c12 tac fs1 mono bg-white tc-black"
          />
        </div>
        <div class="c2 p1px">
          <input
            value=${state.staging.entry.interval}
            oninput=${e => send('staging:entry', {
              timeRange: 0,
              interval: e.target.value
            })}
            type="text"
            class="p0 c12 tac fs1 sans bg-white tc-black"
          />
        </div>
      </div>
      <div class="c12 x">
        <div class="${state.staging.entry.id ? 'x c4' : 'dn'} p1px">
          <input
            name="delete"
            value="Delete"
            tabindex="-1"
            class="c12 tc-black bg-white sans bribl"
            onclick=${e => remove(state.staging.entry.id, send)}
            type="button"
          />
        </div>
        <div class="${!state.staging.entry.id ? 'x c4' : 'dn'} p1px">
          <input
            name="cancel"
            value="Cancel"
            tabindex="-1"
            class="c12 tc-black bg-white sans bribl"
            onclick=${e => reset(send)}
            type="button"
          />
        </div>
        <div class="xa p1px">
          <input
            type="submit"
            value="Save"
            tabindex="-1"
            class="c12 bg-white tc-black sans bribr"
          />
        </div>
        
      </div>
    </form>
  `
}

const handleContainerClick = (event, send) => {
  if (event.target.hasAttribute('data-entry-panel')) {
    reset(send)
  }
}

module.exports = (state, prev, send) => {
  return h`
    <div
      data-entry-panel
      class="psf t0 l0 r0 b0 xjc xac z2 x"
      onclick=${event => handleContainerClick(event, send)}>
      ${form(state, prev, send)}
    </div>
  `
}
