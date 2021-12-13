import { RequestHandler } from 'express';
// import bcrypt from 'bcryptjs'; // npm install --save bcryptjs
import dbCon from '../dbCon';
import { user } from '../models/user';

// GET ALL USERS ****************************************
export const getUsers: RequestHandler = async (req, res, next) => {
  dbCon.query('SELECT * FROM users', (err: any, result: user[]) => {
    if (!err) {
      res.send(result);
      console.log(result);
    } else {
      res.send({
        error: true,
        message: 'Oops! We had a problem! Please try again later.',
      });
    }
  });
};

// CREATE USER ****************************************
export const postUser: RequestHandler = async (req, res, next) => {
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
      } else {
        if (err.code === 'ER_DUP_ENTRY')
          res.send({ error: true, message: 'Email already registered!' });
        else
          res.send({
            error: true,
            message: 'Oops! We had a problem! Please try again later.',
          });
      }
    }
  );
};

// UPDATE USER ****************************************
export const updateUser: RequestHandler = async (req, res, next) => {
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
      } else {
        if (err.code === 'ER_DUP_ENTRY')
          res.send({ error: true, message: 'Email already registered!' });
        else
          res.send({
            error: true,
            message: 'Oops! We had a problem! Please try again later.',
          });
      }
    }
  );
};

// DELETE  USER ****************************************
export const deleteUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  dbCon.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
};

// DELETE ALL USERS ****************************************
export const deleteAllUsers: RequestHandler = async (req, res, next) => {
  dbCon.query('DELETE FROM users', (err) => {
    if (!err) {
      res.send('All users deleted!');
    } else {
      console.log(err);
    }
  });
};
