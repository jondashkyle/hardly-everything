module.exports = pages

function pages (state, emitter) {
  state.pages = {
    about: {
      title: 'About',
      slug: '/',
      content: require('../content/q-and-a')
    },
    tips: {
      title: 'Tips',
      slug: 'tips',
      content: require('../content/tips')
    }
  }
}
