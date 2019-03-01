var optionsTypography = require('../plugins/options-typography')
var objectKeys = require('object-keys')
var deepEqual = require('deep-equal')

var designs = require('./designs')
var designsAll = objectKeys(designs)
var randomized = [ ]

module.exports = {
  isDesignDefault,
  getRandomDesign,
  getDesignDefaults,
  getCssDefaults
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
    invert: false,
    colorBg: { a: 1, r: 255, g: 255, b: 255 },
    colorText: { a: 1, r: 0, g: 0, b: 0 },
    font: optionsTypography.system,
    uppercase: false,
    hyphenate: false,
    scale: 40,
    spacing: 36
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

function getCssDefaults () {
return `
.design-container {
  color: var(--foreground);
  font-family: var(--font-family);
  font-weight: var(--font-weight);
  font-style: var(--font-style);
  font-size: var(--font-size);
  text-transform: var(--font-uppercase);
  hyphens: var(--font-hyphenate);
  line-height: 1.2;

  --gutter:
    calc(var(--spacing) * 0.8)
    var(--spacing);
}
`
}