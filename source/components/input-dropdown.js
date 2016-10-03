const h = require('choo/html')
const x = require('xtend')

const Dropdown = opts => {
  const o = x({
    namespace: 'dropdown',
    parent: 'container'
  }, opts)

  const route = [o.parent, o.namespace].join(':')

  const model = {
    state: {
      options: o.options,
      test: 'nope'
    },
    reducers: {
      [o.namespace + ':test']: (data, state) => ({
        [o.namespace]: x(state[o.namespace], {
          test: data.test
        })
      })
    }
  }

  const handle = {
    clickContainer: (event, send) => {
      send([route, 'test'].join(':'), {
        test: 'whaaatever'
      })
    }
  }

  const view = (state, prev, send) => {
    return h`
      <div onclick=${e => handle.clickContainer(e, send)}>
        oh hellooo<br>
        ${state.local.test}
      </div>
    `
  }

  return { model, view }
}

module.exports = Dropdown
