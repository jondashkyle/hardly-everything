const a = require('axios')
const STORAGE_ID = 'asdf_'

/**
 * Get
 */
exports.get = (namespace, cb) => {
  try {
    cb(JSON.parse(window.localStorage[STORAGE_ID + namespace]))
  } catch (e) {
    
  }
}

/**
 * Save
 */
exports.save = (namespace, state, cb = () => { }) => {
  window.localStorage[STORAGE_ID + namespace] = JSON.stringify(state)
  cb()
}