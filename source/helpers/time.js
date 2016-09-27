const x = require('xtend')

const intToRest = opts => {
  const options = x({
    min: 0,
    max: 100,
    value: 50,
    breakpoints: [{
      interval: 'minutes'
      range: {
        min: 0,
        max: 7
      },
      min: 0,
      max: 20,
      value: 20
    }]
  }, opts)

  return {
    duration: 5,
    interval: 'minutes'
  }
}

module.exports = {
  intToRest
}
