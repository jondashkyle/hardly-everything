const x = require('xtend')
const clone = require('clone-deep')

module.exports = Ui

function Ui (state, emitter) {
  state.ui = {
    loaded: false,
    panelActive: false,
    stagingActive: false,
    entriesViewAll: false,
    intro: {
      position: 0,
      password: 'yucca',
      value: '',
    }
  }

  emitter.on('ui:intro', function (data) {
    state.ui.intro = x(state.intro, data)
  })

  emitter.on('ui:update', function (data) {
    state.ui = x(state, data)
  })
}
