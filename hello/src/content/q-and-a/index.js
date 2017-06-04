const fs = require('fs')
const yaml = require('js-yaml')
const content = fs.readFileSync(__dirname + '/content.md', 'utf8')
module.exports = yaml.safeLoad(content)
