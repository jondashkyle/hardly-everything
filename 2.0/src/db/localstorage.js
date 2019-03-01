var STORAGE_ID = 'asdf_'
var dat = require('./dat')

module.exports = { save, get }

function get (namespace, cb) {
  try {
    var result = JSON.parse(window.localStorage[STORAGE_ID + namespace])
    if (cb && typeof cb === 'function') cb(result)
  } catch (err) {
    if (cb && typeof cb === 'function') cb({ })
  }
}

function save (namespace, state, cb) {
  window.localStorage[STORAGE_ID + namespace] = JSON.stringify(state)
  if (cb && typeof cb === 'function') cb()
}
