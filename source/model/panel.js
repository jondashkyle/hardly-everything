const db = require('../db')
const xtend = require('xtend')

/**
 * Typography
 */
const typography = [
  { name: 'Cabin', weight: 400 },
  { name: 'Cormorant+Garamond', weight: 400 },
  { name: 'Inconsolata', weight: 400 },
  { name: 'Montserrat', weight: 400 },
  { name: 'Open+Sans', weight: [400, 600] },
  { name: 'Space+Mono', weight: 400 },
  { name: 'Work+Sans', weight: 400 },
]

/**
 * Options
 */
const options = [
  {
    name: 'Background',
    type: 'text',
    key: 'background'
  },
  {
    name: 'Link Background',
    type: 'text',
    key: 'backgroundLink'
  },
  {
    name: 'Link Color',
    type: 'text',
    key: 'colorLink'
  },
  {
    name: 'Font',
    type: 'text',
    key: 'font'
  },
  {
    name: 'Background',
    type: 'text',
    key: 'background'
  },
  {
    name: 'Design',
    type: 'text',
    key: 'template'
  }
]

/**
 * Panel
 */
module.exports = {
  namespace: 'panel',
  state: {
    templates: ['inline', 'grid', 'blocks'],
    options: options
  }
}
