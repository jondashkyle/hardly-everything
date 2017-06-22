var level = require('level')
var sublevel = require('level-sublevel')

var db = level('./db', {
  valueEncoding: 'json'
})
