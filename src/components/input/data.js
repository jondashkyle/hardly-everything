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

  update (props) {
    return true
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    var isDat = this.state.datastorage.isDat

    return html`
      <div class="x psr bg-black line w100">
        <div class="x xx wsnw xjb bg-white ${isDat ? 'curp' : ''} w100" onclick=${this.handleClick}>
          <div class="pl1">Data storage</div>
          <div class="px0-5 ffmono">→</div>
          <div class="toe wsnw oh xx pr1">${this.getStorageName()}</div>
          <a href="/data" class="tc-black px1 op33 oph100">View</a>
        </div>
      </div>
    `
  }

  getStorageName () {
    var archiveTitle = this.state.datastorage.archive.title

    // is dat
    if (this.state.datastorage.isDat) {
      // archive loaded
      if (archiveTitle) return archiveTitle
      else return 'Select an archive'
    } else {
      return 'Local browser'
    }
  }

  handleClick (event) {
    if (this.state.datastorage.isDat) {
      this.emit(this.state.events.DATA_DAT_LOAD)
    } else {
      // if not dat, go to data management
      // this.emit(this.state.events.PUSHSTATE, '/data')
    }
  }
}
