
module.exports = [
  search
]

function search (state, emit) {
  return {
    key: 'search',
    name: 'Search',
    template: require('../components/search'),
    variations: [{
      name: 'Default',
      props: {
        value: true,
        onChange: function(data) {
          emit({
            component: 'Search',
            data: data
          })
        }
      }
    }]
  }
}
