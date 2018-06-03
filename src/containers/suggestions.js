var html = require('choo/html')
var libBlog = require('../lib/blog')

module.exports = containerSuggestions

function containerSuggestions (state, emit) {
  return html`
    <div class="p1">
      ${libBlog
        .getRandomSuggestions(state)
        .map(createSuggestion)
      }
    </div>
  `

  function createSuggestion (props) {
    return html`
      <div class="p0-5 tac ophc">
        <div class="fs3 serif p0-5 lh1-2">
          <a href="${props.url}" class="tc-black" target="_blank">${props.title}</a>
        </div>
        <div class="x xjc op33 ophc100">
          <div class="p0-5 copy">
            <span>Contributed by <a href="${props.authorUrl}" class="tc-black" target="_blank">${props.author}</a></span>
          </div>
          <div class="p0-5 copy">
            <span><span class="a curp" onclick=${handleClick}>Add</a></span>
          </div>
        </div>
      </div>
    `

    function handleClick () {
      emit('ui:panel', { view: 'entry' })
      emit('staging:entry', {
        title: props.title,
        url: props.url,
        tags: [ ]
      })
    }
  }
}
