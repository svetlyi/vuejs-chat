const express = require('express')
const router = express.Router()
const userRepository = require('../repository/user')

router.post('/login', function (req, res) {
  let token = userRepository.login(req.body.name, req.body.password)
  if (token === null) {
    res.status(401).header('Content-Type', 'application/json').send({error: 'no such user'})
  } else {
    res
      .header('Content-Type', 'application/json')
      .send(
        { token: token }
      )
  }
})

router.post('/logout', function (req, res) {
  if (userRepository.logout(req.body.name, req.body.password)) {
    res.status(404).header('Content-Type', 'application/json').send({error: 'user not found'})
  } else {
    res.status(200).send()
  }
})

router.post('/register', function (req, res, next) {
  if (userRepository.nameExists(req.body.name)) {
    res
      .status(409)
      .header('Content-Type', 'application/json')
      .send(
        { error: 'user already exists' }
      )
  } else {
    userRepository.register(req.body.name, req.body.password)
    req.url = '/login'
    return router.handle(req, res, next)
  }
})

router.get('/user', function (req, res) {
  res.status(200)
    .header('Content-Type', 'application/json')
    .send(
      userRepository.getAll()
        .map(user => {return {name: user.name}})
    )
})

module.exports = router