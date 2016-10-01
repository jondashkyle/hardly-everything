const h = require('choo/html')
const x = require('xtend')

const Dropdown = opts => {
  const o = xtend({
    namespace: 'dropdown'
  }, opts)

  const state = {
    active: false
  }

  const view = () => {

  }

  return { state, view }
}

module.exports = Dropdown