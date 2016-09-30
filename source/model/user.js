const x = require('xtend')
const db = require('../db/user')
const namespace = 'user'

exports.state = {
  credentials: {
    email: '',
    photoURL: '',
    uuid: ''
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
    db.onStateChange(user => {
      if (user) {
        send(namespace + ':credentials', {
          email: user.email,
          photoURL: user.photoURL,
          uuid: user.uuid
        }, done)
      } else {
        send(namespace + ':reset', { })
        done()
      }
    })
  }
]

exports.reducers = {
  credentials: (data, state) => ({
    signedIn: true,
    credentials: data
  }),
  reset: (data, state) => ({
    signedIn: false,
    credentials: exports.state.credentials
  })
}

exports.effects = {
  login: (data, state, send, done) => {

  },
  logout: (data, state, send, done) => {

  }
}

exports.namespace = namespace
