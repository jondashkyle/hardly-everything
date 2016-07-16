const STORAGE_ID = 'asdf_'

/**
 * Get All
 */
exports.get = (storeName, cb) => {
  try {
    cb(JSON.parse(window.localStorage[STORAGE_ID + storeName]))
  } catch (e) {
    cb([])
  }
}

/**
 * Save All
 */
exports.save = (storeName, state, cb = () => { }) => {
  window.localStorage[STORAGE_ID +storeName] = JSON.stringify(state)
  cb()
}
