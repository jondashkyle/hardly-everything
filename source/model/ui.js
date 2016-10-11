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
        'your links are visible'
      ],
      second: [
        'you click a link, and it opens',
        'it’s also hidden from your list',
      ],
      third: [
        'you’ve clicked all your links',
        'now nothing is visible'
      ],
      fourth: [
        'time passes, and slowly your links reappear',
        'you told them how long to dissapear for when you added them',
        'some are more important than others so they appear more often'
      ],
      fifth: [
        'because you set the cadence',
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
