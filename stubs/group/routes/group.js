const express = require('express')
const router = express.Router()

let groups = [
  {
    id: 0,
    name: 'vue-courses'
  },
  {
    id: 1,
    name: 'some guys'
  },
];

router.get('/group', function (req, res) {
  res
    .header('Content-Type', 'application/json')
    .send(groups)
})

module.exports = router