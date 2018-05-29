var dayjs = require('dayjs')

module.exports = {
  getDismissedDate,
}


function getDismissedDate (entry) {
  return dayjs(entry.dateDismissed)
    .add(entry.duration, entry.interval)
    .startOf('day')
    .toDate()
}