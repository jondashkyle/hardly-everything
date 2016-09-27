const x = require('xtend')

const intToRest = opts => {
  const options = x({
    min: 1,
    max: 100,
    value: 50,
    breakpoints: [{
      interval: 'minutes',
      result: {
        min: 1,
        max: 60
      },
      range: {
        min: 0,
        max: 0.2
      }
    }, {
      interval: 'hours',
      result: {
        min: 1,
        max: 24
      },
      range: {
        min: 0.2,
        max: 0.4
      }
    }, {
      interval: 'days',
      result: {
        min: 1,
        max: 30
      },
      range: {
        min: 0.4,
        max: 0.8
      }
    }, {
      interval: 'weeks',
      result: {
        min: 1,
        max: 10
      },
      range: {
        min: 0.8,
        max: 1
      }
    }, {
      interval: 'years',
      result: {
        min: 100,
        max: 100
      },
      range: {
        min: 0.9,
        max: 1
      }
    }]
  }, opts)

  const value = options.value / options.max

  const breakpoint = options.breakpoints
    .find(bp => {
      if (
        value >= bp.range.min &&
        value < bp.range.max
      ) {
        return true
      } else if (
        options.breakpoints.indexOf(bp) === 
        options.breakpoints.length - 1
      ) {
        return true
      } else {
        return false
      }
    })

  const scale = {
    input: (value - breakpoint.range.min)
      / (breakpoint.range.max - breakpoint.range.min),
    output: (breakpoint.result.max - breakpoint.result.min)
      + breakpoint.result.min
  }

  const result = {
    duration: Math.ceil(scale.input * scale.output),
    interval: breakpoint.interval
  }

  return {
    duration: result.duration < 1 ? 1 : result.duration,
    interval: result.interval
  }
}

module.exports = {
  intToRest
}
