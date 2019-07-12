"use strict";
exports.__esModule = true;
var database_service_1 = require("./service/database.service");
var socket_service_1 = require("./service/socket.service");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        var dbService = new database_service_1.DatabaseService();
        var socketService = new socket_service_1.SocketService();
        dbService.connect();
        dbService.fetchUsers();
        socketService.start();
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
