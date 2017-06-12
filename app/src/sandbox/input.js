
module.exports = [
  checkbox,
  range,
  text
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

function range (state, emit) {
  return {
    key: 'range',
    name: 'Range',
    template: require('../components/input/range'),
    variations: [{
      name: 'Default',
      props: {
        key: 'one',
        name: 'Test',
        value: 50,
        onInput: function(data) {
          emit({
            component: 'Range',
            data: data
          })
        }
      }
    }, {
      name: 'Value',
      props: {
        key: 'one',
        name: 'Test',
        showValue: true,
        value: 10
      }
    }]
  }
}

function text (state, emit) {
  return {
    key: 'text',
    name: 'Text',
    template: require('../components/input/text'),
    variations: [{
      name: 'Default',
      props: {
        key: 'one',
        name: 'Test',
        onInput: function(data) {
          emit({
            component: 'Text',
            data: data
          })
        }
      }
    }, {
      name: 'Value',
      props: {
        key: 'one',
        name: 'Test',
        value: 'This one has a value'
      }
    }, {
      name: 'Autofocus',
      props: {
        key: 'one',
        name: 'Autofocus example',
        autofocus: true
      }
    }]
  }
}
