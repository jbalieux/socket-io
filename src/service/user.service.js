"use strict";
exports.__esModule = true;
var jwt_decode = require('jwt-decode');
var UserService = /** @class */ (function () {
    function UserService() {
        this.users = [];
        //   decodeUser(userToken: string) {
        //     const user = jwt_decode(userToken);
        //     socket.nickname = user.username;
        //     users.push(socket.nickname);
        //     console.log(users);
        //   }
    }
    return UserService;
}());
exports.UserService = UserService;
