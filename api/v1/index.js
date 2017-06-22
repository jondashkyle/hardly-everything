var merry = require('merry')
var credentials = require('./credentials')

module.exports = v1

var handleHook =  require('./deploy')({
  secret: credentials.github.secret 
})

function v1 (app) {
  app.route('POST', '/v1/hardly-a-hook', handleHook) 
  app.route('get', '/v1/test', handleTest) 
}

function handleTest (req, res, ctx) {
  ctx.send(200, { message: 'it works!' })
}