// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const io = require('socket.io')(fastify.server);
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "vps663399.ovh.net",
  port: "3307",
  user: "root",
  password: "KQqm318bWltNGWB5",
  database: "sf4"
});

let test = [];
let users = [];
const sql = "select username from user"
con.connect(function (err) {
  if (err) throw err;
  con.query(sql, function (err, result, fields) {
  if (err) throw err;
  result.forEach(el => {
  console.log(el.username);
  });
   
  });
});

fastify.listen(3001, '::');

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
  });
  socket.on('send-nickname', function(nickname) {
    socket.nickname = nickname;
    users.push(socket.nickname);
    console.log(users);
  });
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', socket.nickname + ': ' + msg);
  });
});
