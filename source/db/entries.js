const a = require('axios')
const l = require('./local')
const fb = require('firebase')

const namespace = 'entries'

const add = (data, state) => {
  l.save(namespace, state)
}

const update = (data, state) => {
  l.save(namespace, state)
}

const remove = (data, state) => {
  l.save(namespace, state)
}

const dismiss = (data, state) => {
  l.save(namespace, state)
}

const get = (cb) => l.get(namespace, cb)

module.exports = {
  add,
  update,
  remove,
  dismiss,
  get
}
