import mysql from 'mysql2'; // npm i mysql2

const dbCon = mysql.createConnection({
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
});
dbCon.connect(function (err) {
  if (err) {
    return console.error('*************** error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

export default dbCon;

export function reconnect() {
  console.log('RECONNECTING!');
  dbCon.destroy();
  dbCon.connect(function (err) {
    if (err) {
      return console.error('*************** error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });
}
