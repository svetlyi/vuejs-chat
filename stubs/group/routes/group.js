const express = require('express')
const router = express.Router()

router.get('/group', function (req, res) {
  res
    .header('Content-Type', 'application/json')
    .send(
      [
        {
          id: 0,
          name: 'vue-courses'
        },
        {
          id: 1,
          name: 'some guys'
        },
      ]
    )
})

module.exports = router