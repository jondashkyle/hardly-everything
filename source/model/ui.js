const x = require('xtend')
const clone = require('clone-deep')

const namespace = 'ui'

exports.state = {
  loaded: false,
  panelActive: false,
  stagingActive: false,
  entriesViewAll: false,
  intro: {
    position: 0,
    password: 'yucca',
    value: '',
    messages: {
      first: [
        'this is your feed',
        'your feed contains links',
        'the links are visible'
      ],
      second: [
        'now you click a link',
        'your link opens',
        'it’s hidden from your feed',
      ],
      third: [
        'now you’ve clicked all your links',
        'nothing is visible in your feed'
      ],
      fourth: [
        'time passes, and slowly your links reappear',
        'you told them how long to dissapear for when you added them'
      ],
      fifth: [
        'because you choose the cadence of your feed',
        'loud things aren’t loud',
        'and quiet things aren’t forgotten'
      ]
    }
  }
}

exports.reducers = {
  intro: (data, state) => ({ intro: x(state.intro, data) }),
  update: (data, state) => x(state, data)
}

exports.namespace = namespace
