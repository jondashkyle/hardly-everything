var merry = require('merry')
var github = require('github-webhook-middleware')

var mw = merry.middleware

module.exports = [
  [ '/v1/error', errorPath ],
  [ '/v1/api', {
    put: apiPutPath,
    get: apiGetPath
  } ]
]


function errorPath (req, res, ctx, done) {
  done(null, 'hello world')
}

function apiGetPath (req, res, ctx, done) {
  done(null, 'hello HTTP GET')
}

function apiPutPath (req, res, ctx, done) {
  done(null, 'hello HTTP PUT')
}
