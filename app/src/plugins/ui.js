var xtend = require('xtend')
var moment = require('moment')
var attachFastClick = require('fastclick')

module.exports = Ui

var resizeFrame

function Ui (state, emitter) {
  state.ui = {
    date: moment().format("MMM Do"),
    loaded: false,
    stagingActive: false,
    entriesViewAll: false,
    mobile: false,
    panel: {
      active: false,
      view: ''
    }
  }

  emitter.on('ui:update', function (data) {
    state.ui = xtend(state.ui, data)
    emitter.emit('render')
  })

  emitter.on('DOMContentLoaded', function () {
    setMobile()
    attachFastClick(document.body)
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
