var STORAGE_ID = 'asdf_'

/**
 * Get
 */
exports.get = (namespace, cb) => {
  try {
    var result = JSON.parse(window.localStorage[STORAGE_ID + namespace])
    if (cb && typeof cb === 'function') {
      cb(result)
    }
  } catch (err) {
    if (cb && typeof cb === 'function') {
      cb({ })
    }
  }
}

/**
 * Save
 */
exports.save = (namespace, state, cb = () => { }) => {
  window.localStorage[STORAGE_ID + namespace] = JSON.stringify(state)
  cb()
}