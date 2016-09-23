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
    name: 'Color',
    type: 'text',
    key: 'colorLink'
  },
  {
    name: 'Font',
    type: 'text',
    key: 'font'
  },
  {
    name: 'Scale',
    type: 'range',
    key: 'scale',
    min: 5,
    max: 50
  },
  {
    name: 'Padding',
    type: 'range',
    key: 'blockPadding',
    min: 0,
    max: 25
  }
]

/**
 * Staging
 */
const staging = {
  title: '',
  tags: '',
  duration: 1,
  interval: 'weeks',
  repeat: true,
  visited: 0,
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
    open: false,
    options: options,
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
