const fs = require('fs')

const pages = {
  // home: {
  //   title: 'index',
  //   slug: '/',
  //   content: require('../content/home')
  // },
  about: {
    title: 'about',
    slug: '/',
    content: require('../content/q-and-a')
  },
  // log: {
  //   title: 'log',
  //   slug: 'log',
  //   content: require('../content/log')
  // },
  tips: {
    title: 'tips',
    slug: 'tips',
    content: require('../content/tips')
  }
}

exports.state = { pages }
