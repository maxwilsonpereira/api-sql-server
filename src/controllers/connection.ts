import mysql from 'mysql2'; // npm i mysql2

export class Connection {
  dbCon: mysql.Connection;
  constructor() {
    this.dbCon = mysql.createConnection({
      database: process.env.database,
      user: process.env.user,
      password: process.env.password,
      host: process.env.host,
    });
  }
  connect(): void {
    this.dbCon.connect(function (err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      console.log('Connected to the MySQL server.');
    });
  }
  destroy(): void {
    this.dbCon.destroy();
  }
}
