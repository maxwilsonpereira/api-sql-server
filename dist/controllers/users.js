"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.postUser = exports.getUsers = void 0;
const mysql2_1 = __importDefault(require("mysql2")); // npm i mysql2
// import bcrypt from 'bcryptjs'; // npm install --save bcryptjs
const dbCon_1 = require("../dbCon");
// GET ALL USERS ****************************************
const getUsers = async (req, res, next) => {
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
    const dbConClass = new dbCon_1.ConnectionDB();
    const dbCon = dbConClass.dbCon;
    dbConClass.connect();
    console.log('**********AAAAAAAAAAAAAAAAAAAA ');
    dbCon.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.send(result);
            dbCon.destroy();
        }
        else {
            console.log(err);
            res.send({
                error: true,
                message: 'Oops! We had a problem! Please try again later.',
            });
            dbCon.destroy();
        }
    });
};
exports.getUsers = getUsers;
// CREATE USER ****************************************
const postUser = async (req, res, next) => {
    const dbCon = mysql2_1.default.createConnection({
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
    dbCon.query('INSERT INTO users (firstname, surname, birthday, email, sex, password) VALUES (?,?,?,?,?,?)', [firstname, surname, birthday, email, sex, password], (err, result) => {
        if (!err) {
            res.send({ message: 'User created!', id: result.insertId });
            dbCon.destroy();
        }
        else {
            if (err.code === 'ER_DUP_ENTRY') {
                res.send({ error: true, message: 'Email already registered!' });
                dbCon.destroy();
            }
            else {
                console.log(err);
                res.send({
                    error: true,
                    message: 'Oops! We had a problem! Please try again later.',
                });
                dbCon.destroy();
            }
        }
    });
};
exports.postUser = postUser;
// UPDATE USER ****************************************
const updateUser = async (req, res, next) => {
    const dbCon = mysql2_1.default.createConnection({
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
    dbCon.query('UPDATE users SET firstname = ?, surname = ?, birthday = ?, email = ?, sex = ?, password = ? WHERE id = ?', [firstname, surname, birthday, email, sex, password, id], (err, result) => {
        if (!err) {
            res.send(result);
            dbCon.destroy();
        }
        else {
            if (err.code === 'ER_DUP_ENTRY') {
                res.send({ error: true, message: 'Email already registered!' });
                dbCon.destroy();
            }
            else {
                res.send({
                    error: true,
                    message: 'Oops! We had a problem! Please try again later.',
                });
                dbCon.destroy();
            }
        }
    });
};
exports.updateUser = updateUser;
// DELETE  USER ****************************************
const deleteUser = async (req, res, next) => {
    const dbCon = mysql2_1.default.createConnection({
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
        }
        else {
            console.log(err);
            dbCon.destroy();
        }
    });
};
exports.deleteUser = deleteUser;
// DELETE ALL USERS ****************************************
const deleteAllUsers = async (req, res, next) => {
    const dbCon = mysql2_1.default.createConnection({
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
        }
        else {
            console.log(err);
            dbCon.destroy();
        }
    });
};
exports.deleteAllUsers = deleteAllUsers;
