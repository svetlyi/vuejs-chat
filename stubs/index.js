const userRepository = require('./user/repository/user')
const userRoutes = require('./user/routes/user')
const groupRoutes = require('./group/routes/group')
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ioHandler = require('./sockets')(io)

app.use(express.static("dist"));
app.use(express.json())

app.use(function (req, res, next) {
  if (
    ['/api/login', '/api/register'].indexOf(req.originalUrl) !== -1
    || req.originalUrl.indexOf('/api') !== 0
  ) {
    next()
    return
  }
  if (req.headers.auth_token && userRepository.isAuthenticated(req.headers.auth_token)) {
    next()
    return
  }

  res.status(401).header('Content-Type', 'application/json').send({error: 'you\'re not authorized'})
})

app.use('/api', userRoutes)
app.use('/api', groupRoutes)

app.get('/app/*', function (req, res) {
  let reqPath = path.join(__dirname, "./");
  res.sendFile(
    path.resolve(reqPath, "index.html")
  );
})

http.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;