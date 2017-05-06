const a = require('axios')
const STORAGE_ID = 'asdf_'

/**
 * Get
 */
exports.get = (namespace, cb) => {
  try {
    cb
      ? cb(JSON.parse(window.localStorage[STORAGE_ID + namespace]))
      : ''
  } catch (err) {
    
  }
}

/**
 * Save
 */
exports.save = (namespace, state, cb = () => { }) => {
  window.localStorage[STORAGE_ID + namespace] = JSON.stringify(state)
  cb()
}