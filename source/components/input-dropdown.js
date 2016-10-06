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
    clickCurrent: (event, state, send) => {
      send([route, 'update'].join(':'), {
        active: !state.local.active
      })
    },
    clickOption: (event, state, send) => {
      send([route, 'update'].join(':'), {
        active: false
      })
      send('options:values', {
        key: 'font',
        value: state
      })
    }
  }

  const elContainer = (state, send, content) => h`
    <div class="
      bg-white tc-black input-dropdown-options
      ${state.local.active ? 'db' : 'dn'}
    ">
      ${content}
    </div>
  `

  const elOption = (state, send) => h`
    <div
      class="px1 curp"
      onclick=${e => handle.clickOption(e, state, send)}
    >${state.name}</div> 
  `

  const view = (state, prev, send) => {
    const options = ov(state.options)

    const elOptions = elContainer(
      state,
      send,
      options.map(option => elOption(option, send))
    )

    const elCurrent = h`
      <div
        class="psr c12 curp x xje"
        onclick=${e => handle.clickCurrent(event, state, send)}
      >
        <label class="psa t0 l0 px1">
          Font
        </label>
        <div class="px1">
          ${state.current.name}
        </div>
      </div>
    `

    return h`
      <div class="usn c12 psr">
        ${elCurrent}
        ${elOptions}
      </div>
    `
  }

  return { model, view }
}

module.exports = Dropdown
