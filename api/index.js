var merry = require('merry')
var app = merry()

var db = require('./db')
var v1 = require('./v1')(app)

app.route('default', function (req, res, ctx) {
  ctx.log.info('Route doesnt exist')
  ctx.send(401, { message: 'coming soon' })
})

app.listen(8081)
