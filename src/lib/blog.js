var objectKeys = require('object-keys')
var xtend = require('xtend')

module.exports = {
  getSuggestions,
  getRandomSuggestions
}

function getRandomSuggestions (state) {
  var entries = getSuggestions(state)
  return entries
}

function getSuggestions (state) {
  return state.page('/blog')
    .pages()
    .visible()
    .sortBy('date', 'desc')
    .toArray()
    .filter(function (page) {
      return page.category === 'list'
    })
    .reduce(function (res, cur) {
      objectKeys(cur.links)
        .forEach(function (key) {
          return res.push(xtend(
            cur.links[key], {
              author: cur.author,
              authorUrl: cur.authorUrl,
              interval: key
            }
          ))
      })
      return res
    }, [ ])
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}