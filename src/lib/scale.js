const x = require('xtend')

const linearConversion = opts => {
  const options = x({
    value: 30,
    in: {
      min: 0,
      max: 100
    },
    out: {
      min: 25,
      max: 75
    }
  }, opts)

  const input = ((options.value - options.in.min) / (options.in.max - options.in.min))
  const output = (options.out.max - options.out.min)
  const result = input * output + options.out.min

  return result
}

module.exports = {
  linearConversion
}