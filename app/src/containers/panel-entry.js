const html = require('rooch/html')
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
    height: 4.5rem;
    line-height: 4.5rem;
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
const handleSubmit = (state, event, emit) => {
  if (state.staging.entry.id) {
    emit('entries:update', state.staging.entry)
  } else {
    emit('entries:add', state.staging.entry)
  }

  event.preventDefault()
}

const handleLoad = (state, element, emit) => {
  // const title = element.querySelector('[name="title"]')
  // title.focus()
}

const reset = emit => {
  emit('ui:update', { stagingActive: false })
  emit('staging:reset')
}

const remove = (id, emit) => {
  reset(emit)
  emit('entries:remove', { id: id })
}

const form = (state, emit) => {
  const getTime = value => intToRest({
    value: value
  })

  return html`
    <form
      autocomplete="off"
      class="${style} x xw bg-black sans bro"
      onload=${element => handleLoad(state, element, emit)}
      onsubmit=${event => handleSubmit(state, event, emit)}
    >
      <div class="p1px">
        <input
          name="title"
          placeholder="Title"
          value="${state.staging.entry.title}"
          oninput=${e => emit('staging:entry', { title: e.target.value })}
          type="text"
          class="fs1 c12 sans bg-white tc-black px1 brit"
        />
      </div>
      <div class="p1px">
        <input
          name="url"
          placeholder="http://"
          value="${state.staging.entry.url}"
          oninput=${e => emit('staging:entry', { url: e.target.value })}
          type="text"
          class="fs1 c12 sans bg-white tc-black px1"
        />
      </div>
      <div class="c12 x" style="line-height: 3rem">
        <div class="c8 p1px">
          <div class="fs1 c12 bg-white tc-black">
            ${inputRange({
              name: 'Rest',
              value: state.staging.entry.timeRange,
              valueShow: false,
              handleInput: value => emit('staging:entry', x(getTime(value), {
                timeRange: value
              }))
            })}
          </div>
        </div>
        <div class="c2 p1px">
          <input
            value=${state.staging.entry.duration}
            oninput=${e => emit('staging:entry', {
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
            oninput=${e => emit('staging:entry', {
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
            class="fs1 c12 tc-black bg-white sans bribl"
            onclick=${e => remove(state.staging.entry.id, emit)}
            type="button"
          />
        </div>
        <div class="${!state.staging.entry.id ? 'x c4' : 'dn'} p1px">
          <input
            name="cancel"
            value="Cancel"
            tabindex="-1"
            class="fs1 c12 tc-black bg-white sans bribl"
            onclick=${e => reset(emit)}
            type="button"
          />
        </div>
        <div class="xa p1px">
          <input
            type="submit"
            value="Save"
            tabindex="-1"
            class="fs1 c12 bg-white tc-black sans bribr"
          />
        </div>
      </div>
    </form>
  `
}

const handleContainerClick = (event, emit) => {
  if (event.target.hasAttribute('data-entry-panel')) {
    reset(emit)
  }
}

module.exports = (state, emit) => {
  return html`
    <div
      data-entry-panel
      class="psf t0 l0 r0 b0 xjc xac z2 x"
      onclick=${event => handleContainerClick(event, emit)}>
      ${form(state, emit)}
    </div>
  `
}
