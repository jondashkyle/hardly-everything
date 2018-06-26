var raw = require('choo/html/raw')
var md = require('marked')

module.exports = format

function format (str) {
  return raw(md(str || ''))
}
