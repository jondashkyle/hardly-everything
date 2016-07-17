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
 * Staging
 */
const staging = {
  title: '',
  tags: '',
  url: ''
}

/**
 * Panel
 */
module.exports = {
  namespace: 'panel',
  state: {
    active: false,
    editId: '',
    staging: staging,
    open: true,
    options: options,
    templates: ['inline', 'grid', 'blocks']
  },
  reducers: {
    active: (data, state) => ({
      active: data.active,
      editId: '',
      open: false,
      staging: staging
    }),
    updateStaging: (data, state) => ({
      staging: xtend(state.staging, data)
    }),
    edit: (data, state) => ({
      open: true,
      staging: data.staging
    }),
    open: (data, state) => ({
      open: data.open,
      staging: staging
    })
  }
}
