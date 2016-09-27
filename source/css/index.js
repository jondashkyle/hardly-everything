const sf = require('sheetify')
const gr8 = require('gr8/dist')

const options = {
  padding: [0.25, 0.5, 1, 1.5, 2, 3]
}

sf('./reset.css', { global: true })
sf('./index.css', { global: true })

gr8(options).attach()