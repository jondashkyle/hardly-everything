module.exports = Preact

function Preact (state, emitter) {
  require('rooch/component').prototype.emit = function (eventName, data) {
    emitter.emit(eventName, data)
  }
}
