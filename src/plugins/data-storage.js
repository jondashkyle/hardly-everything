var db = require('../db')

module.exports = pluginData

function pluginData (state, emitter) {
  state.datastorage = getDefaultState()

  // load the archive if there is one
  if (state.datastorage.archiveUrl) setArchive()

  // events
  state.events.DATA_DAT_LOAD = 'data:dat:load'
  emitter.on(state.events.DATA_DAT_LOAD, handleDatLoad)

  async function handleDatLoad (data) {
    emitter.emit(state.events.UI_PANEL, { view: '' })
    var reset = await db.reset()
    if (reset !== false) {
      state.datastorage = getDefaultState()
      if (state.datastorage.archiveUrl) setArchive()
      emitter.emit(state.events.ENTRIES_LOAD)
      emitter.emit(state.events.OPTIONS_LOAD)
    }
  }

  async function setArchive () {
    try {
      var archive = await DatArchive.load(state.datastorage.archiveUrl)
      state.datastorage.archive = await archive.getInfo()
      emitter.emit(state.events.RENDER)
    } catch (err) { }
  }

  function getDefaultState() {
    return {
      isDat: (typeof DatArchive !== 'undefined'),
      archiveUrl: window.localStorage.archiveUrl,
      archive: { }
    }
  }
}