const x = require('xtend')
const clone = require('clone-deep')

const db = require('../db/user')
const namespace = 'user'

exports.state = {
  credentials: {
    email: '',
    photoURL: '',
    uuid: ''
  },
  analytics: {
    authenticated: false,
    visits: 0
  },
  signedIn: false
}

exports.subscriptions = [
  (send, done) => {
    // FOR TESTING USER ACCOUNTS
    // db.create('jkmohr@gmail.com', 'testing')
    // db.signIn('jkmohr@gmail.com', 'testing')
  },
  (send, done) => {
    db.get(data => {
      send(namespace + ':init', data, done)
    })

    db.onStateChange(user => {
      if (user) {
        send(namespace + ':credentials', {
          email: user.email,
          photoURL: user.photoURL,
          uuid: user.uuid
        }, done)
      } else {
        send(namespace + ':credentials', { }, done)
      }
    })
  }
]

exports.reducers = {
  credentials: (data, state) => ({ credentials: data }),
  update: (data, state) => (data)
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
    send(namespace + ':analytics', {
      visits: newState.analytics.visits + 1
    }, done)
  }
}

exports.namespace = namespace
