const http = require('choo/http')
const formatGoogleSheet = require('../helpers/googlesheets')

const loadSheetDefaults = {
  key: '1HnUc9P6I_ix9aOIuvMVW9UTaBksnmcWhiG5vXMuoye0',
  sheets: ['index', 'about']
}

/**
 * Load Sheet
 */
exports.loadSheet = (send, done, options = loadSheetDefaults) => {
  options.sheets.forEach((sheet, index) => {
    const baseUrl = `https://spreadsheets.google.com/feeds/list/${options.key}/${index + 1}/public/full?alt=json`

    http(baseUrl, { json: true }, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        send('api:error', {
          payload: {
            message: 'Didnt load correctly, sorry.'
          }
        }, done)
        return done(new Error({
          message: 'error accessing server',
          error: err
        }))
      } else {
        send('api:formatSheet', { payload: {
          name: sheet,
          data: body
        }}, done)
      }
    })
  })
}

/**
 * Format Sheet
 */
exports.formatSheet = function (action, state, send, done) {
  const source = action.payload.data
  const sheet = formatGoogleSheet(source)
  const payload = {
    name: action.payload.name,
    data: sheet
  }

  send('api:saveSheet', { payload: payload } , done)
}

/**
 * Log Sheet
 */
exports.logSheet = (action, state, send, done) => {
  console.log(state)
}

/**
 * Error
 */
exports.error = (action, state, send, done) => {
  console.log('ERRORRRR', action.paypload)
}
