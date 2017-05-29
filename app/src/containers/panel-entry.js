var html = require('rooch/html')
var sf = require('sheetify')
var x = require('xtend')

var { intToRest } = require('../helpers/time')
var inputRange = require('../components/input-range')

module.exports = view

function view (state, emit) {
  return html`
    <form
      autocomplete="off"
      class="x xw bg-black bro p1px"
      onsubmit=${handleSubmit}
    >
      <div class="c12 p1px">
        <input
          name="title"
          placeholder="Title"
          value="${state.staging.entry.title}"
          oninput=${e => emit('staging:entry', { title: e.target.value })}
          type="text"
          class="fs1 c12 sans bg-white tc-black px1 brit"
        />
      </div>
      <div class="c12 p1px">
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
        <div class="xx p1px">
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
            onclick=${e => remove(state.staging.entry.id)}
            type="button"
          />
        </div>
        <div class="xa p1px">
          <input
            type="submit"
            value="${!state.staging.entry.id ? 'Add' : 'Save'}"
            tabindex="-1"
            class="fs1 c12 bg-white tc-black sans fwb ${state.staging.entry.id ? 'bribr' : 'brib'}"
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

  function handleSubmit (event) {
    if (state.staging.entry.id) {
      emit('entries:update', state.staging.entry)
    } else {
      emit('entries:add', state.staging.entry)
    }

    event.preventDefault()
  }

  function reset () {
    emit('staging:reset')
    emit('pushState', '/')
  }

  function remove (id) {
    reset()
    emit('entries:remove', { id: id })
  }
}