const fb = require('firebase')
const ls = require('./localstorage')

const auth = fb.auth()
const namespace = 'user'

const success = data => {
  return Promise.resolve()
}

const error = err => {
  throw new Error(namespace, err)
}

const create = (email, password) => auth
  .createUserWithEmailAndPassword(email, password)

const signIn = (email, password) => auth
  .signInWithEmailAndPassword(email, password)
  .then(success, error)

const signOut = () => auth
  .signOut()
  .then(success, error)

const get = (cb, fb) => {
  ls.get(namespace, cb, fb)
}

const save = (data, state) => {
  ls.save(namespace, state)
}

const analytics = (data, state) => {
  ls.save(namespace, state)
}

const onStateChange = cb => auth.onAuthStateChanged(cb)
const currentUser = () => auth.currentUser

module.exports = {
  get,
  save,
  analytics,
  create,
  signIn,
  signOut,
  currentUser,
  onStateChange
}
