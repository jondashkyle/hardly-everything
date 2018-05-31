var attachFastClick = require('fastclick')
var dayjs = require('dayjs')
var xtend = require('xtend')

module.exports = pluginUi

var resizeFrame

function pluginUi (state, emitter) {
  state.ui = {
    date: dayjs().format('MMM D'),
    loaded: false,
    stagingActive: false,
    entriesViewAll: false,
    mobile: false,
    pagination: {
      page: 1,
      limit: 15
    },
    panel: {
      active: false,
      view: ''
    }
  }

  state.events.UI_PAGINATE = 'ui:paginate'

  emitter.on('ui:update', function (data) {
    state.ui = xtend(state.ui, data)
    emitter.emit('app:render')
  })

  emitter.on('ui:panel', function (data) {
    var render = state.ui.panel.view !== data.view
    state.ui.panel = xtend(state.ui.panel, data)
    if (render) emitter.emit('app:render', 'ui:panel')
  })

  emitter.on(state.events.UI_PAGINATE, function (data) {
    data = data || { }
    var shouldRender = data.render !== false
    delete data.render
    state.ui.pagination = xtend(state.ui.pagination, data)
    if (shouldRender) emitter.emit('app:render')
  })

  emitter.on('DOMContentLoaded', function () {
    setMobile()
    attachFastClick(document.body)
    window.addEventListener('resize', setMobile)
  })

  function setMobile () {
    clearTimeout(resizeFrame)
    resizeFrame = setTimeout(function () {
      if (state.href === '/intro') return
      state.ui.mobile = window.innerWidth <= 600
      emitter.emit('app:render')
    }, 100)
  }
}
