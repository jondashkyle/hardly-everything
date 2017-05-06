const fb = require('firebase')
const ls = require('./localstorage')

const namespace = 'options'

const update = (data, state) => {
  ls.save(namespace, state)
}

const get = (cb, fb) => {
  ls.get(namespace, cb, fb)
}

module.exports = {
  get,
  update
}
