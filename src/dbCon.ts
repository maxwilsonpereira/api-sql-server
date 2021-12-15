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

export function reconnect(dbConProps: any) {
  console.log('RECONNECTING LOST CONNECTION!');
  dbConProps.destroy();
  setTimeout(() => {
    dbConProps.connect(function (err: any) {
      if (err) {
        return console.error('*************** error: ' + err.message);
      }
      console.log('Connected to the MySQL server.');
    });
  }, 1000);
}
