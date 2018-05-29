var html = require('choo/html')
var ov = require('object-values')
var xd = require('xtend')

var input = require('./input')
var ui = require('./interface')

module.exports = Sandbox

function Sandbox (state, emit) {
  var components = [ ...input, ...ui ]
    .map(function (component) {
      return component({ }, log)
    })

  var navigationComponents = ov(components)
    .map(function (component) {
      var active = state.params.component === component.key
      return html`
        <a
          href="/sandbox/${component.key}"
          class="
            db line px1 tc-black bb1-lighter
            ${active ? 'fwb' : ''}
          "
        >${component.name}</a>
      `
    })

  return html`
    <div class="x vhmn100 c12 fs1 lh1-5 p1">
      ${sidebar()}
      ${content()}
    </div>
  `

  function sidebar (props = { }) {
    return html`
      <div class="c3 p1">
        <div class="b1b">
          ${navigationComponents}
        </div>
      </div>
    `
  }

  function content (props = { }) {
    var examples = components
      .filter(function (_component) {
        return _component.key === state.params.component
      })

    if (examples.length <= 0) {
      return wrapper(html`
        <div class="p1">Components not found</div>
      `)
    }

    return wrapper(
      examples.map(function (component) {
        if (!isComponentValid(component)) {
          return html`
            <div class="p1">Component can not mount</div>
          `
        }
        return component.variations
          .map(function (variation) {
            return example(
              variation,
              h(component.template, variation.props)
            )
          })
      })
    )
  }

  function log (data) {
    console.log('sandbox', data)
  }
}

function wrapper (children) {
  return html`
    <div class="c9">
      ${children}
    </div>
  `
}

function example (props, children) {
  return html`
    <div class="p1">
      <div class="b1b">
        <div class="px1 line bb1-lighter">
          <pre class="m0"><code>${JSON.stringify(props.props)}</code></pre>
        </div>
        ${children}
      </div>
    </div>
  `
}

function isComponentValid (props) {
  return props &&
    props.template &&
    props.variations
}
