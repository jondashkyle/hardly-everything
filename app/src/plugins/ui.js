var x = require('xtend')
var moment = require('moment')

module.exports = Ui

function Ui (state, emitter) {
  state.ui = {
    date: moment().format('MMM Mo'),
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
    state.ui.intro = x(state.ui.intro, data)
    emitter.emit('render')
  })

  emitter.on('ui:update', function (data) {
    state.ui = x(state.ui, data)
    emitter.emit('render')
  })
}
