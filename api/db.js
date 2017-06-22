var level = require('level')
var sublevel = require('level-sublevel')

var db = require('../.db', {
  valueEncoding: 'json'
})

module.exports = db
