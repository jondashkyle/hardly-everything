var clone = require('clone-deep')
var xtend = require('xtend')

var db = require('../db/user')

module.exports = user

function user (state, emitter) {
  state.user = getState()

  state.events.USER_LOAD= 'user:load'
  state.events.USER_RESET = 'user:reset'
  state.events.USER_LOADED = 'user:loaded'
  state.events.USER_UPDATE = 'user:update'
  state.events.USER_FEATURE = 'user:feature'
  state.events.USER_NOTIFIED = 'user:notified'
  state.events.USER_ANALYTICS = 'user:analytics'

  emitter.on('DOMContentLoaded', function () {
    db.get(function (data) {
      emitter.emit(state.events.USER_LOAD, data)
    }, function () {
      emitter.emit(state.events.USER_LOADED, data)
    })
  })

  emitter.on(state.events.USER_LOADED, function (data) {
    state.user.analytics.visits += 1
    state.user.analytics.lastvisit = new Date().toISOString()
    emitter.emit('user:update')
  })

  emitter.on(state.events.USER_ANALYTICS, function (data) {
    state.user.analytics = xtend(state.user.analytics, data)
    emitter.emit('user:update')
  })

  emitter.on('pushState', function (data) {
    // if (
    //   process.env.NODE_ENV === 'production' &&
    //   window.ga &&
    //   typeof window.ga === 'function'
    // ) {
    //   window.ga('set', 'page', window.location.pathname)
    //   window.ga('send', 'pageview')
    // }
  })

  emitter.on(state.events.USER_LOAD, function (data) {
    state.user = xtend(state.user, data)
    emitter.emit(state.events.USER_LOADED, data)
  })

  emitter.on(state.events.USER_UPDATE, function (data) {
    db.update(data, state.user)
    emitter.emit('app:render')
  })

  // user prefs for features
  emitter.on(state.events.USER_FEATURE, function (data) {
    if (typeof data === 'object') {
      state.user.features = xtend(state.user.features, data)
    }

    if (data.render !== false) {
      emitter.emit('app:render')
    }
  })

  // notified
  emitter.on(state.events.USER_NOTIFIED, function (data) {
    var data = data || { }
    if (!data.id) return
    state.notifications.active = '' // whoops
    state.user.notified[data.id] = true 
    emitter.emit(state.events.USER_UPDATE)
  })

  emitter.on(state.events.USER_RESET, function (data) {
    state.user = getState()
    emitter.emit(state.events.USER_UPDATE)
  })
}

function getState () {
  return {
    credentials: {
      email: '',
      photoURL: '',
      uuid: ''
    },
    features: {
      search: true
    },
    analytics: {
      authenticated: false,
      visits: 0,
      lastvisit: undefined
    },
    notified: { },
    signedIn: false
  }
}
