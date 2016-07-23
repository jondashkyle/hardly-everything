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
    name: 'Block Border',
    type: 'text',
    key: 'blockBorder'
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
    type: 'radio',
    options: ['list', 'grid', 'blocks'],
    key: 'template'
  },
  {
    name: 'Scale',
    type: 'range',
    key: 'scale',
    min: 5,
    max: 100
  },
  {
    name: 'Padding',
    type: 'range',
    key: 'blockPadding',
    min: 5,
    max: 50
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
    active: true,
    editId: '',
    staging: staging,
    open: false,
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
