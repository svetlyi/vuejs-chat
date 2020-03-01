const express = require('express')
const router = express.Router()
const userRepository = require('../repository/user')

router.get('/login/check', function (req, res) {
  let token = userRepository.getUserByToken(req.headers.auth_token)
  if (token === null) {
    res.status(401).header('Content-Type', 'application/json').send({error: 'you are not logged in'})
  } else {
    res.header('Content-Type', 'application/json').send()
  }
})

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

router.get('/user/current', function (req, res) {
  res.status(200)
    .header('Content-Type', 'application/json')
    .send(
      userRepository.getUserByToken(req.headers.auth_token)
    )
})

router.get('/user/stats', function (req, res) {
  let ages = userRepository.findAll().map(user => user.age);
  let stats = {}
  for (let i = 0; i < ages.length; i++) {
    if (!stats[ages[i]]) {
      stats[ages[i]] = 1
    } else {
      stats[ages[i]]++
    }
  }
  res.status(200)
    .header('Content-Type', 'application/json')
    .send(stats)
})

router.put('/user', function (req, res) {
  let user = userRepository.getUserByToken(req.headers.auth_token);
  console.log(req.headers.auth_token, user.token)

  if (user.token !== req.headers.auth_token) {
    res
      .status(409)
      .header('Content-Type', 'application/json')
      .send(
        { error: 'user already exists' }
      )
  } else {
    if (undefined === req.body.age) {
      req.body.age = null
    }
    if ([undefined, null, ''].indexOf(req.body.password) === req.body.password) {
      req.body.password = user.password
    }
    userRepository.updateByToken(req.headers.auth_token, req.body.name, req.body.password, req.body.age)
    res.status(200).send()
  }
})

module.exports = router