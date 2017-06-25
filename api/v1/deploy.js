var assert = require('assert')
var github = require('github-webhook-handler')
var { spawn } = require('child_process')

module.exports = handleHook

function handleHook (opts) {
  assert(opts.secret, 'Please pass secret')

  var hook = github({
    path: '/v1/hardly-a-hook',
    secret: opts.secret
  })

  return function (req, res, ctx) {
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

      deploy.stdout.on('error', function(data) {
        ctx.log.warn('deployment failed')
      })

      deploy.on('close', function(code) {
        ctx.log.info('deployment successful')
      })
    })
  }
}
