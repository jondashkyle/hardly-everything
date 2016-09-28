const sf = require('sheetify')
const gr8 = require('gr8/dist')

const options = {
  fontSize: [0.8, 1, 1.2, 1.4, 1.6, 1.8, 2],
  padding: [0.25, 0.5, 1, 1.5, 2, 3]
}

sf('./reset.css', { global: true })
sf('./index.css', { global: true })

gr8(options).attach()