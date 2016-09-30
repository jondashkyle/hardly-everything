const a = require('axios')
const ls = require('./localstorage')
const fb = require('firebase')

const namespace = 'entries'

const add = (data, state) => {
  ls.save(namespace, state)
}

const update = (data, state) => {
  ls.save(namespace, state)
}

const remove = (data, state) => {
  ls.save(namespace, state)
}

const dismiss = (data, state) => {
  ls.save(namespace, state)
}

const get = (cb) => {
  ls.get(namespace, cb)
}

module.exports = {
  add,
  update,
  remove,
  dismiss,
  get
}
