import { RequestHandler } from 'express';
import mysql from 'mysql2'; // npm i mysql2
// import bcrypt from 'bcryptjs'; // npm install --save bcryptjs
import { ConnectionDB } from '../dbCon';
import { user } from '../models/user';

// GET ALL USERS ****************************************
export const getUsers: RequestHandler = async (req, res, next) => {
  // const dbCon = mysql.createConnection({
  //   database: process.env.database,
  //   user: process.env.user,
  //   password: process.env.password,
  //   host: process.env.host,
  // });
  // dbCon.connect(function (err) {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log('Connected to the MySQL server.');
  // });

  const dbConClass = new ConnectionDB();
  const dbCon = dbConClass.dbCon;
  dbConClass.connect();
  console.log('**********AAAAAAAAAAAAAAAAAAAA ');
  dbCon.query('SELECT * FROM users', (err: any, result: user[]) => {
    if (!err) {
      res.send(result);
      dbCon.destroy();
    } else {
      console.log(err);
      res.send({
        error: true,
        message: 'Oops! We had a problem! Please try again later.',
      });
      dbCon.destroy();
    }
  });
};

// CREATE USER ****************************************
export const postUser: RequestHandler = async (req, res, next) => {
  const dbCon = mysql.createConnection({
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
  });
  dbCon.connect(function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the MySQL server.');
  });

  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const birthday = req.body.birthday;
  const email = req.body.email;
  const sex = req.body.sex;
  const password = req.body.password;
  // encrypting password with bcryptjs:
  // const hashedPass = await bcrypt.hash(req.body.password, 12);
  dbCon.query(
    'INSERT INTO users (firstname, surname, birthday, email, sex, password) VALUES (?,?,?,?,?,?)',
    [firstname, surname, birthday, email, sex, password],
    (err, result: any) => {
      if (!err) {
        res.send({ message: 'User created!', id: result.insertId });
        dbCon.destroy();
      } else {
        if (err.code === 'ER_DUP_ENTRY') {
          res.send({ error: true, message: 'Email already registered!' });
          dbCon.destroy();
        } else {
          console.log(err);
          res.send({
            error: true,
            message: 'Oops! We had a problem! Please try again later.',
          });
          dbCon.destroy();
        }
      }
    }
  );
};

// UPDATE USER ****************************************
export const updateUser: RequestHandler = async (req, res, next) => {
  const dbCon = mysql.createConnection({
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
  });
  dbCon.connect(function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the MySQL server.');
  });

  const id = req.body.id;
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const birthday = req.body.birthday;
  const email = req.body.email;
  const sex = req.body.sex;
  const password = req.body.password;
  dbCon.query(
    'UPDATE users SET firstname = ?, surname = ?, birthday = ?, email = ?, sex = ?, password = ? WHERE id = ?',
    [firstname, surname, birthday, email, sex, password, id],
    (err, result) => {
      if (!err) {
        res.send(result);
        dbCon.destroy();
      } else {
        if (err.code === 'ER_DUP_ENTRY') {
          res.send({ error: true, message: 'Email already registered!' });
          dbCon.destroy();
        } else {
          res.send({
            error: true,
            message: 'Oops! We had a problem! Please try again later.',
          });
          dbCon.destroy();
        }
      }
    }
  );
};

// DELETE  USER ****************************************
export const deleteUser: RequestHandler = async (req, res, next) => {
  const dbCon = mysql.createConnection({
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
  });
  dbCon.connect(function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the MySQL server.');
  });

  const id = req.params.id;
  dbCon.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
    if (!err) {
      res.send(result);
      dbCon.destroy();
    } else {
      console.log(err);
      dbCon.destroy();
    }
  });
};

// DELETE ALL USERS ****************************************
export const deleteAllUsers: RequestHandler = async (req, res, next) => {
  const dbCon = mysql.createConnection({
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
  });
  dbCon.connect(function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the MySQL server.');
  });

  dbCon.query('DELETE FROM users', (err) => {
    if (!err) {
      res.send('All users deleted!');
      dbCon.destroy();
    } else {
      console.log(err);
      dbCon.destroy();
    }
  });
};
