const CRON = require('node-cron')
const { processSchedule } = require('../modules/cron/controllers/cron.js')

module.exports = {
  start: function () {
    CRON.schedule('*/5 * * * *', function () {
      processSchedule()
    })
  }
}
