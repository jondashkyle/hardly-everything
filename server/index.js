var express = require('express')
var compression = require('compression')
var serveStatic = require('serve-static')
 
var app = express()
var server = serveStatic('../app/dist', {
  'index': ['index.html', 'index.htm']
})
 
app.use(compression())
app.use(server)
app.listen(3000)
