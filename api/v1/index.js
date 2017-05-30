var merry = require('merry')
var github = require('github-webhook-handler')
var credentials = require('./credentials')

var hook = github({
  path: '/v1/hardly-a-hook',
  secret: credentials.github.secret
}) 

var mw = merry.middleware

module.exports = v1

function v1 (app) {
  app.route('POST', '/v1/hardly-a-hook', handleHook) 
}

function handleHook (req, res, ctx) {
  hook(req, res, function (err) {
    ctx.send(401, { error: err })
  })
}

hook.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})