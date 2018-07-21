module.exports = pluginData

function pluginData (state, emitter) {
  state.datastorage = {
    isDat: (typeof DatArchive !== 'undefined'),
    archiveUrl: window.localStorage.archiveUrl,
    archive: { }
  }

  state.events.DATA_DAT_LOAD = 'data:dat:load'

  emitter.on(state.events.DATA_DAT_LOAD, handleDatLoad)

  function handleDatLoad (data) {
    console.log('select dat archive')
  }
}
