module.exports = load()

function load () {
  return (typeof DatArchive !== 'undefined')
    ? require('./dat')
    : require('./localstorage')
}
