var merry = require('merry')
var http = require('http')

var notFound = merry.notFound
var error = merry.error
var mw = merry.middleware

var v1 = require('./v1')

var env = merry.env({ PORT: 8081 })
var app = merry()

app.router([
  [ ...v1 ],
  [ '/', notFound() ],
  [ '/404', notFound() ]
])

var server = http.createServer(app.start())
server.listen(env.PORT)

function homePath (req, res, ctx, done) {
  done(null, 'hardly an api')
}
