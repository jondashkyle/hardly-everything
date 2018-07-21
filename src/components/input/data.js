var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Data extends Component {
  constructor (id, state, emit) {
    super(id, state, emit)

    this.state = state
    this.emit = emit
    this.local = { }

    this.handleClick = this.handleClick.bind(this)
  }

  load () {

  }

  update (props) {
    return true
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div class="psr bg-black line">
        <div class="x xjb bg-white px1 curp" onclick=${this.handleClick}>
          <div>Data storage</div>
          <div class="fwb">${this.getStorageName()}</div>
        </div>
      </div>
    `
  }

  getStorageName () {
    var archiveUrl = this.state.datastorage.archiveUrl
    var archiveName = this.state.datastorage.archive.name

    // is dat
    if (this.state.datastorage.isDat) {
      // archive loaded
      if (archiveUrl) return archiveName
      else return 'Select an Archive'
    } else {
      return 'Local browser'
    }

    // no archive
  }

  handleClick (event) {
    if (this.state.datastorage.isDat) {
      console.log('dat')
    } else {
      // if not dat, go to data management
      this.emit(this.state.events.PUSHSTATE, '/data')
    }
  }
}
