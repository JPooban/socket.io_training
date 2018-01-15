var express = require('express')
var fs = require('fs')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var ip = require("ip")

// var clients = [];
// var clientid =0;

app.use(express.static('static'))
app.get('/test', function (req, res) {
  res.send('Hello World!')
})

io.sockets.on('connection', function (sk) {
  //console.log(sk)

  sk.emit('broadcast', { msg: 'hello!' });
  
  sk.on('say', function (data) {
    console.log(data.msg)
  })

  sk.on('changeVDO', function (data) {
    console.log(data.msg)
    io.sockets.emit("changeVDO", data)
  })
})

server.listen(80, function () {
  console.log('Smart display start andd access on http: ' + ip.address() + ':80' )
})