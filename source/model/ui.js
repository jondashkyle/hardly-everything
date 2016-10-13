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
      preface: [
        'thanks for checking the beta,',
        'some things might be broken,',
        'what you should know is…'
      ],
      first: [
        'this is your feed,',
        'your feed contains links,',
        'the links are visible,'
      ],
      second: [
        'now you click a link,',
        'your link opens,',
        'it’s hidden from your feed,'
      ],
      fourth: [
        'time passes, and slowly your link reappears,',
        'you told it how long to dissapear for when adding it,'
      ],
      fifth: [
        'because you choose the cadence of your feed,',
        'loud things aren’t loud,',
        'and quiet things aren’t forgotten.'
      ]
    }
  }
}

exports.reducers = {
  intro: (data, state) => ({ intro: x(state.intro, data) }),
  update: (data, state) => x(state, data)
}

exports.namespace = namespace
