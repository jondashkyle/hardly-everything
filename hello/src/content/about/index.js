var fs = require('fs')
var yaml = require('js-yaml')
var content = fs.readFileSync(__dirname + '/content.md', 'utf8')
module.exports = yaml.safeLoad(content)
