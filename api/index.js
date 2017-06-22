var merry = require('merry')
var db = require('./db')
var app = merry()

// v1
var v1 = require('./v1')
v1(app)

app.route('default', function (req, res, ctx) {
  ctx.log.info('Route doesnt exist')
  ctx.send(401, { message: 'coming soon' })
})

app.listen(8081)
