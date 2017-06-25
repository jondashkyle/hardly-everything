var level = require('level')
var sublevel = require('level-sublevel')
var levelPromise = require('level-promise')
var assert = require('nanoassert')

var db = level('../.db')
var dbTest = levelPromise(sublevel(db, {
  valueEncoding: 'json'
}))

module.exports = {
  db: db,
  add: add,
  show: show
}

function add (data, cb) {
  assert(data.name, 'Name is not defined')
  assert(data.id, 'ID is not defined')
  return dbTest.put(`person!${data.id}!`, data)
}

function show () {
  var key = 'person'
  var result = { }

  return new Promise (function (resolve, reject) {
    dbTest
      .createValueStream({
        gte: key,
        lte: key + '\xff'
      })
      .on('data', function (data) {
        if (data.id) {
          result[data.id] = data
        }
      })
      .once('error', function (err) {
        reject(err)
      })
      .once('end', function () {
        resolve(result)
      })
  })
}