const html = require('choo/html')
const effects = require('./effects')

/**
 * Model
 */
exports.model = {
  namespace: 'api',
  state: {
    index: [ ],
    about: [ ]
  },
  reducers: {
    saveSheet: (action, state) => ({ [action.payload.name]: action.payload.data })
  },
  subscriptions: {
    init: (send, done) => effects.loadSheet(send, done)
  },
  effects: effects
}

/**
 * Button
 */
exports.buttonView = (state, prev, send, option = {
  option: false
}) => (html`
  <h3
    class="m0"
    onclick=${(e) => send('api:logSheet')}
  >API call ${state.input.title}</h3>
`)
