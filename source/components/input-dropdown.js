const h = require('choo/html')
const x = require('xtend')
const ov = require('object.values')

const Dropdown = opts => {
  const o = x({
    namespace: 'dropdown',
    parent: 'container'
  }, opts)

  const route = [o.parent, o.namespace].join(':')

  const model = {
    state: {
      active: false
    },
    reducers: {
      [o.namespace + ':update']: (data, state) => ({
        [o.namespace]: x(state[o.namespace], data)
      })
    }
  }

  const handle = {
    clickCurrent: (event, send) => {
      send([route, 'update'].join(':'), {
        active: true
      })
    },
    clickOption: (event, state, send) => {
      send([route, 'update'].join(':'), {
        active: false
      })
      send('options:design', {
        key: 'font',
        value: state.name
      })
    }
  }

  const containerEl = (state, send, content) => h`
    <div
      class="psa l0 r0 t0 bg-black ofa"
      style="max-height: 50vh"
    >
      ${content}
    </div>
  `

  const optionEl = (state, send) => h`
    <div
      class="px1 curp"
      onclick=${e => handle.clickOption(e, state, send)}
    >${state.name}</div> 
  `

  const view = (state, prev, send) => {
    const options = ov(state.options)

    const optionsEl = containerEl(
      state,
      send,
      options.map(option => optionEl(option, send))
    )

    const currentEl = h`
      <div
        class="psr c12 curp x xje"
        onclick=${e => handle.clickCurrent(event, send)}
      >
        <label class="psa t0 l0 px1">
          Font
        </label>
        <div class="px1">
          ${state.current.value}
        </div>
      </div>
    `

    return h`
      <div>
        ${currentEl}
        ${state.local.active ? optionsEl : ''}
      </div>
    `
  }

  return { model, view }
}

module.exports = Dropdown
