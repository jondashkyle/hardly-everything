var fs = require('fs')
var yaml = require('js-yaml')

var content = [
  fs.readFileSync(__dirname + '/17-06-05-update.md', 'utf8'),
  fs.readFileSync(__dirname + '/16-10-12-release.md', 'utf8')
  // fs.readFileSync(__dirname + '/17-06-01-jon-kyle.md', 'utf8')
]

var result = { }

content
  .forEach(entry => {
    var formatted = yaml.safeLoad(entry)
    result[formatted.slug] = formatted
  })

module.exports = result
