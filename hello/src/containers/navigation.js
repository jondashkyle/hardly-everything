const h = require('choo/html')
const ov = require('object-values')

const checkActive = (page, slug) => {
  return page === slug || !page && slug === '/'
}

const view = (state, emit) => {
  const elsNav = ov(state.pages)
    .filter(page => page.visible !== false)
    .map(page => h`
      <div class="ml1">
        <a
          href="${page.slug}"
          class="${checkActive(state.params.page, page.slug) ? 'op100' : 'op33'} oph100"
        >${page.title}</a>
      </div>
    `)

  return h`
    <div class="x c12 xjb px1 line usn">
      <div class="">
        <a href="http://hardlyeverything.com">${state.app.title}</a>
      </div>
      <div class="x">
        ${elsNav}
      </div>
    </div>
  `
}

module.exports = view