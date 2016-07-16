const db = require('../db')
const xtend = require('xtend')
const uuid = require('node-uuid')

/**
 * Dummy
 */
const filler = [{
  id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
  title: 'But Does it Float',
  url: 'http://butdoesitfloat.com',
  tags: ['design', 'art', 'typography']
},
{
  id: '14fe935b-3103-45eb-acdc-5254c5537b67',
  title: 'Gadabout',
  url: 'http://gadaboutmag.com',
  tags: ['art', 'photography']
},
{
  id: 'c2b2db1a-641d-426a-9e08-895487f97e63',
  title: 'Haw-Lin',
  url: 'http://haw-lin.com',
  tags: ['blog', 'design', 'art',]
}]

/**
 * Formatters
 */
const formatTags = tag => tag.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/)

/**
 * Links
 */
module.exports = {
  namespace: 'links',
  state: {
    all: [ ],
    order: [
      '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      '14fe935b-3103-45eb-acdc-5254c5537b67',
      'c2b2db1a-641d-426a-9e08-895487f97e63'
    ]
  },
  subscriptions: [
    (send, done) => {
      db.get('links', data => {
        send('links:update', data, done)
        done()
      })
    }
  ],
  reducers: {
    edit: (data, state) => ({

    }),
    save: (data, state) => data
  },
  effects: {
    add: (data, state, send, done) => {
      const stateUpdate = xtend({ }, state, {
        all: state.all.concat({
          id: uuid.v4(),
          title: data.title,
          url: data.url,
          tags: formatTags(data.tags)
        })
      })
      send('links:update', stateUpdate, done)
    },
    update: (data, state, send, done) => {
      const stateUpdate = xtend({ }, state, data)
      db.save('links', stateUpdate)
      send('links:save', stateUpdate, done)
    }
  }
}
