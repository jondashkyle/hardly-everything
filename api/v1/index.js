var merry = require('merry')
var http = require('http')

var notFound = merry.notFound
var error = merry.error

var env = merry.env({ PORT: 8081 })
var app = merry()

app.router([
  [ '/', homePath ],
  [ '/error', errorPath ],
  [ '/api', {
    put: apiPutPath,
    get: apiGetPath
  } ],
  [ '/404', notFound() ]
])

var server = http.createServer(app.start())
server.listen(env.PORT)

function homePath (req, res, ctx, done) {
  done(null, 'hello world')
}

function errorPath (req, res, ctx, done) {
  done(null, 'hello world')
}

function apiGetPath (req, res, ctx, done) {
  done(null, 'hello HTTP GET')
}

function apiPutPath (req, res, ctx, done) {
  done(null, 'hello HTTP PUT')
}
