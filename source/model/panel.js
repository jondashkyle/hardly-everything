const xtend = require('xtend')

const namespace = 'panel'

const typography = [
  { name: 'system', weight: [200, 400, 600] },
  { name: 'Cabin', weight: 400 },
  { name: 'Cormorant+Garamond', weight: 400 },
  { name: 'Inconsolata', weight: 400 },
  { name: 'Montserrat', weight: 400 },
  { name: 'Open+Sans', weight: [400, 600] },
  { name: 'Space+Mono', weight: 400 },
  { name: 'Work+Sans', weight: 400 }
]

const options = {
  font: {
    name: 'Font',
    type: 'text',
    key: 'font'
  },
    scale: {
    name: 'Scale',
    type: 'range',
    min: 5,
    max: 72,
    key: 'scale'
  },
  spacing: {
    name: 'Spacing',
    type: 'range',
    min: 0,
    max: 25,
    key: 'spacing'
  }
}

const staging = {
  title: '',
  tags: '',
  duration: 7,
  interval: 'days',
  visited: 0,
  timeRange: 50,
  url: ''
}

const state = {
  active: false,
  editId: '',
  staging: staging,
  open: false,
  options: options
}

const reducers = {
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

module.exports = {
  namespace,
  state,
  reducers
}
