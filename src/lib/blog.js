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
