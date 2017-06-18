var x = require('xtend')
var clone = require('clone-deep')
var moment = require('moment')

var db = require('../db/user')

module.exports = user

function user (state, emitter) {
  state.user = getState()

  emitter.on('DOMContentLoaded', function () {
    db.get(function (data) {
      emitter.emit('user:load', data)
    }, function () {
      emitter.emit('user:loaded', data)
    })
  })

  emitter.on('user:loaded', function (data) {
    state.user.analytics.visits += 1
    state.user.analytics.lastvisit = moment().toISOString()
    emitter.emit('user:update')
  })

  emitter.on('user:analytics', function (data) {
    state.user.analytics = x(state.user.analytics, data)
    emitter.emit('user:update')
  })

  emitter.on('pushState', function (data) {
    if (
      process.env.NODE_ENV === 'production' &&
      window.ga &&
      typeof window.ga === 'function'
    ) {
      window.ga('set', 'page', window.location.pathname)
      window.ga('send', 'pageview')
    }
  })

  emitter.on('user:load', function (data) {
    state.user = x(state.user, data)
    emitter.emit('user:loaded', data)
  })

  emitter.on('user:update', function (data) {
    db.update(data, state.user)
    emitter.emit('app:render')
  })

  emitter.on('user:reset', function (data) {
    state.user = getState()
    emitter.emit('user:update')
  })
}

function getState () {
  return {
    credentials: {
      email: '',
      photoURL: '',
      uuid: ''
    },
    analytics: {
      authenticated: false,
      visits: 0,
      lastvisit: undefined
    },
    signedIn: false,
  }
}
