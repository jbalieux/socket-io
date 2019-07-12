const mysql = require('mysql');

export class DatabaseService {
  con: any;
  listUsers: Array<any> = [];

  connect() {
    this.con = mysql.createConnection({
      host: 'vps663399.ovh.net',
      port: '3307',
      user: 'root',
      password: 'KQqm318bWltNGWB5',
      database: 'sf4'
    });
  }

  fetchUsers() {
    const sql = 'select username from user';
    this.con.connect(function(err) {
      if (err) throw err;
      this.con.query(sql, function(err, result, fields) {
        if (err) throw err;
        result.forEach(el => {
          this.listUsers.push(el.username);
        });
      });
    });
  }
}
