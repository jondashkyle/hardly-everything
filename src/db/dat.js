var xtend = require('xtend')

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
      var output = JSON.parse(state)
      if (typeof callback === 'function') callback(output)
      return output
    } catch (err) {
      if (typeof callback === 'function') callback({ })
    }
  } else {
    // skip if no archive selected
    if (typeof callback === 'function') callback({ })
  }
}

async function save (namespace, state, callback) {
  var output = { }

  // load
  if (!archive) {
    await load()
    output = await get(namespace)
  }

  // throttle saving
  clearTimeout(saveTimeouts[namespace])
  saveTimeouts[namespace] = setTimeout(async function () {
    // write state
    await archive.writeFile(
      namespace + '.json',
      JSON.stringify(xtend(output, state), { }, 2)
    )
    //callback
    if (typeof callback === 'function') callback()
  }, 500)
}
