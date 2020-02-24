const express = require('express')
const router = express.Router()
const crypto = require("crypto");

let groups = [
  {
    id: crypto.randomBytes(16).toString("hex"),
    name: 'vue-courses'
  },
  {
    id: crypto.randomBytes(16).toString("hex"),
    name: 'some guys'
  },
];

router.get('/group', function (req, res) {
  res
    .header('Content-Type', 'application/json')
    .send(groups)
})

module.exports = router