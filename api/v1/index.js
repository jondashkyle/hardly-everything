var merry = require('merry')
var github = require('github-webhook-handler')
var { execFile } = require('child_process')
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
  ctx.log.info('deploying')
  hook(req, res, function (err) {
    ctx.send(401, { error: err })
    ctx.log.warn('deployment failed')
  })

  hook.once('push', function (event) {
    ctx.send(200, { msg: 'deploying' })
    execFile('sh', ['deploy.sh'], function (error, stdout, stderr) {
      if (error) {
        ctx.log.warn('deployment failed')
      } else {
        ctx.log.log('deployment complete')
      }
    })
  })
}
