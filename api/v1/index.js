var merry = require('merry')
var credentials = require('./credentials')
var db = require('../db')

var hook = require('./deploy')({
  secret: credentials.github.secret 
})

module.exports = v1

function v1 (app) {
  app.route('POST', '/v1/hardly-a-hook', hook) 
  app.route('GET', '/v1/test', test) 
  app.route('GET', '/v1/add', add) 
  app.route('GET', '/v1/show', show) 

  return this
}

function test (req, res, ctx) {
  ctx.log.info('test')
  ctx.send(200, { message: 'it works!' })
}

async function add (req, res, ctx) {
  try {
    var data = {
      id: Math.random() * 1000,
      name: 'What'
    }

    await db.add(data)

    ctx.send(200, {
      message: 'success',
      value: data
    })
  } catch (err) {
    ctx.send(400, {
      message: 'Must have an id'
    })
    ctx.log.error(err)
  }
}

async function show (req, res, ctx) {
  try {
    var data = await db.show()
    ctx.send(200, { value: data })
  } catch (err) {
    ctx.log.error(err)
  }
}
