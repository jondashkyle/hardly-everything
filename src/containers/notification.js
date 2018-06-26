var html = require('choo/html')

var notifications = require('./notifications')

module.exports = componentNotification

function componentNotification (state, emit) {
  var notification = notifications[state.notifications.active]
  if (notification) return notification(state, emit)
}
