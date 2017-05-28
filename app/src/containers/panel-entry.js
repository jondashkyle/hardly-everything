var html = require('rooch/html')
var sf = require('sheetify')
var x = require('xtend')

var { intToRest } = require('../helpers/time')
var inputRange = require('../components/input-range')

module.exports = view

function handleSubmit (state, event, emit) {
  if (state.staging.entry.id) {
    emit('entries:update', state.staging.entry)
  } else {
    emit('entries:add', state.staging.entry)
  }

  event.preventDefault()
}

function reset (emit) {
  emit('ui:update', { stagingActive: false })
  emit('staging:reset')
}

function remove (id, emit) {
  reset(emit)
  emit('entries:remove', { id: id })
}

function view (state, emit) {
  return html`
    <form
      autocomplete="off"
      class="x xw bg-black sans bro"
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

  function getTime (value) {
    return intToRest({
      value: value
    })
  }
}

function handleContainerClick (event, emit) {
  if (event.target.hasAttribute('data-entry-panel')) {
    reset(emit)
  }
}