var optionsTypography = require('../plugins/options-typography')
var objectKeys = require('object-keys')
var deepEqual = require('deep-equal')

var designs = require('./designs')
var designsAll = objectKeys(designs)
var randomized = [ ]

module.exports = {
  isDesignDefault,
  getRandomDesign,
  getDesignDefaults
}

function isDesignDefault (state, opts) {
  var defaults = getDesignDefaults()
  var current = objectKeys(defaults).reduce(function (res, cur) {
    res[cur] = state.options.values[cur]
    return res
  }, { })
  return deepEqual(defaults, current)
}

function getDesignDefaults () {
  return {
    colorBg: { a: 1, r: 255, g: 255, b: 255 },
    colorText: { a:1, r: 0, g: 0, b: 0 },
    font: optionsTypography.system,
    uppercase: false,
    hyphenate: false,
    scale: 22,
    spacing: 10,
  }
}

function getRandomDesign () {
  // reset
  if (designsAll.length === 0) {
    designsAll = randomized
    randomized = [ ]
  }

  var randomKey = designsAll[Math.floor(Math.random() * designsAll.length)]
  designsAll.splice(designsAll.indexOf(randomKey), 1)
  randomized.push(randomKey)
  return designs[randomKey]
}
