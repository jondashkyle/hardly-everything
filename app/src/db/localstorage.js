const a = require('axios')
const STORAGE_ID = 'asdf_'

/**
 * Get
 */
exports.get = (namespace, cb) => {
  try {
    var result = JSON.parse(window.localStorage[STORAGE_ID + namespace])
    cb ? cb(result) : ''
  } catch (err) {
    cb({ }) 
  }
}

/**
 * Save
 */
exports.save = (namespace, state, cb = () => { }) => {
  window.localStorage[STORAGE_ID + namespace] = JSON.stringify(state)
  cb()
}