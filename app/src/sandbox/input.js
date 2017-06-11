
module.exports = [
  checkbox
]

function checkbox (state, emit) {
  return {
    key: 'checkbox',
    name: 'Checkbox',
    template: require('../components/input/checkbox'),
    variations: [{
      name: 'Default',
      props: {
        key: 'one',
        name: 'Test',
        value: true,
        onChange: function(data) {
          emit({
            component: 'Checkbox',
            data: data
          })
        }
      }
    }, {
      name: 'Inactive',
      props: {
        key: 'two',
        value: false
      }
    }, {
      name: 'Custom icon',
      props: {
        key: 'three',
        name: 'Custom icon',
        icon: '🙃',
        value: true
      }
    }]
  }
}