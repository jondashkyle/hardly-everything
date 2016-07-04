/**
 * Format Google Sheet
 */
module.exports = (data) => {
  const sheets = data.feed.entry

  /**
   * Clean Up Entry
   */
  const cleanUpEntry = (entry, index) => {
    Object.keys(entry).map(value => {
      if (isDefaultKey(value)) {
        return delete entry[value]
      } else {
        return cleanUpKey(entry, value)
      }
    })

    return entry
  }

  /**
   * Is Default Value
   */
  const isDefaultKey = (value) => (
    value === 'id' ||
    value === 'updated' ||
    value === 'category' ||
    value === 'link'
  )

  /**
   * Clean Up Key
   */
  const cleanUpKey = (entry, value) => {
    if (entry[value].$t) {
      const keys = entry[value].$t.split(/(, (?=[A-Za-z]+: ))/g)
      // console.log(keys)
      keys.map(key => {
        // Need a better way of split matching
        // As it includes the first comma before the tag
        const content = key.match(/([^,]*): (.*)/)
        if (content) {
          entry[content[1]] = content[2]
        } else if (key !== ', ') {
          entry[value] = key
        }
      })
    } else {
      return entry[value]
    }
  }

  /**
   * Initialize
   */
  sheets.map(cleanUpEntry)
  return sheets
}
