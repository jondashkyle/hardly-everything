const db = require('../db')
const xtend = require('xtend')

/**
 * Panel
 */
module.exports = {
  namespace: 'panel',
  state: {
    templates: ['inline', 'grid', 'blocks'],
  }
}
