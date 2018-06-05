var saveTimeouts = { }
var modalActive
var archive

module.exports = { get, save }

async function load () {
  // load from localstorage
  var archiveUrl = window.localStorage.archiveUrl
  if (modalActive) return // skip if already choosing
  if (!archiveUrl) {
    modalActive = true
    archive = await DatArchive.selectArchive({
      title: 'Select an archive to use as your user profile',
      buttonLabel: 'Select profile',
      filters: { isOwner: true }
    })
    window.localStorage.archiveUrl = archive.url
    modalActive = false
  } else {
    archive = await DatArchive.load(archiveUrl) 
  }
}

async function get (namespace, callback) {
  if (window.localStorage.archiveUrl) {
    // load
    if (!archive) await load()
    try {
      var state = await archive.readFile(namespace + '.json')
      callback(JSON.parse(state))
    } catch (err) {
      callback({ })
    }
  } else {
    // skip if no arhive selected
    callback({ })
  }
}

async function save (namespace, state, callback) {
  // load
  if (!archive) await load()

  // throttle saving
  clearTimeout(saveTimeouts[namespace])
  saveTimeouts[namespace] = setTimeout(async function () {
    // write state
    await archive.writeFile(
      namespace + '.json',
      JSON.stringify(state, { }, 2)
    )
    //callback
    if (typeof callback === 'function') callback()
  }, 500)
}
