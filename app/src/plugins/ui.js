var x = require('xtend')
var moment = require('moment')

module.exports = Ui

var resizeFrame

function Ui (state, emitter) {
  state.ui = {
    date: moment().format("MMM Do"),
    loaded: false,
    panelActive: false,
    stagingActive: false,
    entriesViewAll: false,
    mobile: false,
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

  emitter.on('DOMContentLoaded', function () {
    setMobile()
    window.addEventListener('resize', setMobile)
  })

  function setMobile () {
    clearTimeout(resizeFrame)
    resizeFrame = setTimeout(function () {
      state.ui.mobile = window.innerWidth <= 500
      emitter.emit('render')
    }, 100)
  }
}
