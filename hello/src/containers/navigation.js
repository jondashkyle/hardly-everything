const h = require('choo/html')
const ov = require('object-values')

const checkActive = (page, slug) => {
  return page === slug ||
    !page && slug === '/'
}

const view = (state, prev, send) => {
  const elsNav = ov(state.pages)
    .filter(page => page.visible !== false)
    .map(page =>h`<div class="p1">
      <a
        href="${page.slug}"
        class="${checkActive(state.params.page, page.slug) ? 'active' : ''}"
      >${page.title}</a>
    </div>`)

  return h`<div class="x p1">
    <div class="p1 c4">
      <a href="http://hardlyeverything.com">${state.app.title}</a>
    </div>
    <div class="x c8">
      ${elsNav}
    </div>
  </div>`
}

module.exports = view