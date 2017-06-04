const h = require('choo/html')
const ov = require('object-values')
const md = require('marked')

const getContent = content => {
  const el = h`<div></div>`
  el.innerHTML = md(content)
  return el
}

const view = (state, prev, send) => {
  const page = state.pages.home

  return h`<div>
    yo
  </div>`
}

module.exports = view