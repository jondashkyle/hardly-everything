var dayjs = require('dayjs')
var xtend = require('xtend')

module.exports = pluginUi

var resizeFrame

function pluginUi (state, emitter) {
  state.ui = {
    date: dayjs().format('MMMM D'),
    loaded: false,
    stagingActive: false,
    introActive: false,
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

  state.events.UI_PANEL = 'ui:panel'
  state.events.UI_UPDATE = 'ui:update'
  state.events.UI_PAGINATE = 'ui:paginate'

  emitter.on(state.events.UI_UPDATE, function (data) {
    state.ui = xtend(state.ui, data)
    emitter.emit('app:render')
  })

  emitter.on(state.events.UI_PANEL, function (data) {
    var render = state.ui.panel.view !== data.view
    state.ui.panel = xtend(state.ui.panel, data)
    if (render) emitter.emit('app:render', state.events.UI_PANEL)
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
    window.addEventListener('resize', setMobile)
  })

  function setMobile () {
    clearTimeout(resizeFrame)
    resizeFrame = setTimeout(function () {
      state.ui.mobile = window.innerWidth <= 600
      emitter.emit('app:render')
    }, 100)
  }
}
