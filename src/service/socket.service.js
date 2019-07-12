"use strict";
exports.__esModule = true;
var user_service_1 = require("./user.service");
var fastify = require('fastify')({ logger: true });
var io = require('socket.io')(fastify.server);
var xhr = require('xmlhttprequest').XMLHttpRequest;
var jwt_decode = require('jwt-decode');
var SocketService = /** @class */ (function () {
    function SocketService() {
        this.userService = new user_service_1.UserService();
    }
    SocketService.prototype.start = function () {
        fastify.listen(3001, '::');
        io.on('connection', function (socket) {
            console.log('a user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
        io.on('connection', function (socket) {
            socket.on('chat message', function (msg) {
                if (socket.nickname === undefined) {
                    // socket.disconnect();
                }
                console.log('message: ' + msg);
            });
        });
        io.on('connection', function (socket) {
            socket.on('send-nickname', function (userToken) {
                var user = jwt_decode(userToken);
                socket.nickname = user.username;
                this.userService.users.push(socket.nickname);
                console.log(this.userService.users);
            });
        });
        io.on('connection', function (socket) {
            socket.on('chat message', function (msg) {
                if (socket.nickname) {
                    var currentDate = new Date();
                    io.emit('chat message', {
                        author: socket.nickname,
                        message: msg,
                        createdAt: currentDate,
                        updatedAt: currentDate
                    });
                    var body = { author: 'api/users/27', message: msg };
                    var http = new xhr();
                    http.open('POST', 'http://api.senapi.fr/api/chat_service_messages');
                    http.setRequestHeader('Content-Type', 'application/json');
                    http.send(JSON.stringify(body));
                }
            });
        });
    };
    return SocketService;
}());
exports.SocketService = SocketService;
