const fs = require('fs')
const yaml = require('js-yaml')

const content = [
  fs.readFileSync(__dirname + '/01-jon-kyle.md', 'utf8')
]

const result = { }

content
  .reverse()
  .forEach(entry => {
    const formatted = yaml.safeLoad(entry)
    result[formatted.slug] = formatted
  })

module.exports = result
