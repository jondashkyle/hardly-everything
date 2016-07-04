const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')

/**
 * Components
 */
const css = require('./css')
const api = require('./api')

/**
 * App
 */
const app = choo()

/**
 * Models
 */
app.model(api.model)

app.model({
  namespace: 'input',
  state: {
    title: localStorage.input
  },
  reducers: {
    update: (action, state) => ({ title: action.payload })
  },
  effects: {
    save: (action, state, send, done) => {
      send('input:update', action, done)
      localStorage.input = action.payload
    },
    print: (action, state, send, done) => console.log(action.payload)
  }
})

const mainView = (state, prev, send) => (
  html`
    <div>
      <div class="p2">
        <h2 class="m0">${state.input.title}</h2>
        <label>Set the title</label>
        <input
          type="text"
          placeholder=${state.input.title}
          oninput=${(e) => send('input:save', {
            payload: e.target.value
          })}
        ><br>
        <a href="/about">About</a><br>
        <a href="/about/yooo">yooo</a>
      </div>
      <div class="p2">
        ${api.buttonView(state, prev, send)}
      </div>
      <h3 class="p2 m0">Index</h3>
      ${contentBlock(state, prev, send, { page: 'index' })}
      <h3 class="p2 m0">About</h3>
      ${contentBlock(state, prev, send, { page: 'about' })}
    </div>
  `
)

const contentBlock = (state, prev, send, options = {
  page: 'index'
}) => {
  const page = state.api[options.page]
  if (page.length === 0) {
    return html`<div class="p2">loading...</div>`
  } else {
    return html`
      <div class="p1">
        ${page.map(self => html`
          <div class="p1">
          ${self.title}<br>
          ${self.content}
          </div>
        `)}
      </div>
    `
  }
}

const aboutStyles = sf`
  :host {
    background: red;
  }
`

const aboutView = (state, prev, send) => {
  return html`
    <hh-about
      onload=${() => console.log('loaded!')}
      onunload=${() => console.log('unloaded!')}
    >
      <div class=${aboutStyles}>
        <div onclick=${(e) => console.log('clicky')}>hey whats good</div>
        <a href="/">Index</a>
        <h2>${state.params.note}</h2>
        <a href="/about/yooo">yooo</a>
        <a href="/about/whatttt">whatttt</a>
      </div>
    </hh-about>
  `
}

app.router((route) => [
  route('/', mainView),
  route('/about', aboutView, [
    route(':note', aboutView)
  ])
])

const tree = app.start()
document.body.appendChild(tree)
