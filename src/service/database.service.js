"use strict";
exports.__esModule = true;
var mysql = require('mysql');
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
        this.listUsers = [];
    }
    DatabaseService.prototype.connect = function () {
        this.con = mysql.createConnection({
            host: 'vps663399.ovh.net',
            port: '3307',
            user: 'root',
            password: 'KQqm318bWltNGWB5',
            database: 'sf4'
        });
    };
    DatabaseService.prototype.fetchUsers = function () {
        var sql = 'select username from user';
        this.con.connect(function (err) {
            if (err)
                throw err;
            this.con.query(sql, function (err, result, fields) {
                var _this = this;
                if (err)
                    throw err;
                result.forEach(function (el) {
                    _this.listUsers.push(el.username);
                });
            });
        });
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
