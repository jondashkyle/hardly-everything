const x = require('xtend')
const db = require('../db/user')
const namespace = 'user'

exports.state = {
  credentials: {
    email: '',
    photoURL: '',
    uuid: ''
  },
  analytics: {
    authenticated: true,
    visits: 0
  },
  loaded: false,
  signedIn: false
}

exports.subscriptions = [
  (send, done) => {
    db.get(data => {
      send(namespace + ':init', data, done)
    }, () => {
      send(namespace + ':loaded', true, done)
    })

    // db.onStateChange(user => {
    //   if (user) {
    //     send(namespace + ':credentials', {
    //       email: user.email,
    //       photoURL: user.photoURL,
    //       uuid: user.uuid
    //     }, done)
    //     send(namespace + ':loaded', true, done)
    //   } else {
    //     send(namespace + ':credentials', { }, done)
    //   }
    // })
  }
]

exports.reducers = {
  credentials: (data, state) => ({ credentials: data }),
  update: (data, state) => (data),
  loaded: (data, state) => ({ loaded: data })
}

exports.effects = {
  analytics: (data, state, send, done) => {
    const newState = { analytics: x(state.analytics, data) }
    send(namespace + ':update', newState, done)
    db.analytics(data, newState)
  },
  reset: (data, state, send, done) => {
    send(namespace + ':update', { }, done)
    db.save({ }, exports.state)
  },
  init: (data, state, send, done) => {
    const newState = x(state, data)
    send(namespace + ':update', newState, done)
    send(namespace + ':loaded', true, done)
    send(namespace + ':analytics', {
      visits: newState.analytics.visits + 1
    }, done)
  }
}

exports.namespace = namespace
