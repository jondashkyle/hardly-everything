const a = require('axios')
const STORAGE_ID = 'asdf_'

/**
 * Get
 */
exports.get = (namespace, cb, fb) => {
  try {
    cb
      ? cb(JSON.parse(window.localStorage[STORAGE_ID + namespace]))
      : ''
  } catch (err) {
    fb
      ? fb()
      : ''
  }
}

/**
 * Save
 */
exports.save = (namespace, state, cb = () => { }) => {
  window.localStorage[STORAGE_ID + namespace] = JSON.stringify(state)
  cb()
}