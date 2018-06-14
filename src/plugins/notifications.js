var libDesign = require('../lib/design')

module.exports = pluginNotifications

function pluginNotifications (state, emitter) {
  state.notifications = {
    active: ''
  }

  state.events.NOTIFICATION = 'notification'
  state.events.NOTIFICATIONS = 'notifications'

  emitter.on(state.events.DOMCONTENTLOADED, handleLoad)

  function handleLoad () {
    setTimeout(function () {
      // design adjustments
      if (
        !state.user.notified['customizeDesign'] &&
        libDesign.isDesignDefault(state)
      ) {
        state.notifications.active = 'customizeDesign'
        emitter.emit('app:render')
        return
      }

      if (
        !state.user.notified['p2p'] &&
        typeof WebArchive === 'undefined'
      ) {
        state.notifications.active = 'p2p'
        emitter.emit('app:render')
      }
    }, 1000)
  }

  function handleNotification (data) {
    var data = data || { }
    var shouldRender = data.render !== false
    if (shouldRender) emitter.emit('app:render')
  }
}
