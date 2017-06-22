var merry = require('merry')
var credentials = require('./credentials')

var handleHook = require('./deploy')({
  secret: credentials.github.secret 
})

module.exports = v1

function v1 (app) {
  app.route('POST', '/v1/hardly-a-hook', handleHook) 
  app.route('GET', '/v1/test', handleTest) 
  
  return this
}

function handleTest (req, res, ctx) {
  ctx.send(200, { message: 'it works!' })
}
