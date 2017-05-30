var merry = require('merry')
var github = require('github-webhook-handler')
var { spawn } = require('child_process')
var credentials = require('./credentials')

var hook = github({
  path: '/v1/hardly-a-hook',
  secret: credentials.github.secret
}) 

var mw = merry.middleware

module.exports = v1

function v1 (app) {
  app.route('POST', '/v1/hardly-a-hook', handleHook) 
  app.route('get', '/v1/test', handleTest) 
}

function handleTest (req, res, ctx) {
  ctx.send(200, { message: 'it works!' })
}

function handleHook (req, res, ctx) {
  ctx.log.info('deploying')
  hook(req, res, function (err) {
    ctx.send(401, { error: err })
    ctx.log.warn('deployment failed')
  })

  hook.once('push', function (event) {
    ctx.send(200, { msg: 'deploying' })

    var deploy = spawn('sh', ['./deploy.sh'], {
      cwd: __dirname,
      env: process.env
    })

    deploy.stdout.on('data', function(data) {
      console.log(data.toString())
    })

    deploy.stdout.on('error', function(data) {
      ctx.log.warn('deployment failed')
    })

    deploy.on('close', function(code) {
      ctx.log.info('deployment successful')
    })
  })
}
