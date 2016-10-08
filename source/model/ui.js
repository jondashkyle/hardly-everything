const x = require('xtend')
const clone = require('clone-deep')

const namespace = 'ui'

exports.state = {
  panelActive: false,
  stagingActive: false,
  entriesViewAll: false,
  intro: {
    position: 0,
    password: 'yucca',
    value: '',
    messages: {
      first: [
        'this is your list.',
        'your list contains links.',
        'your links are visible.'
      ],
      second: [
        'you click a link, and it opens.',
        'it also dissapears from your list.',
        'your  link is now hidden.'
      ],
      third: [
        'you’ve clicked all your links.',
        'now none are visible.'
      ],
      fourth: [
        'time passes.',
        'slowly your links re-appear.',
        'you told them to how long to dissapear for when you added them.',
        'some are more important than others so they appear more often.',
        'others, maybe not.'
      ],
      fifth: [
        'your links are a feed.',
        'because you define the cadence,',
        'loud things can’t be loud,',
        'and quiet things don’t get forgotten.'
      ],
      sixth: [
        'this is a beta, so things will break.',
        'your data is saved locally for now.',
        'it will be lost if you reset your browser.'
      ]
    }
  }
}

exports.reducers = {
  intro: (data, state) => ({ intro: x(state.intro, data) }),
  update: (data, state) => x(state, data)
}

exports.namespace = namespace
