"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.postUser = exports.getUsers = void 0;
// import bcrypt from 'bcryptjs'; // npm install --save bcryptjs
const dbCon_1 = __importDefault(require("../dbCon"));
// GET ALL USERS ****************************************
const getUsers = async (req, res, next) => {
    dbCon_1.default.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.send(result);
            console.log(result);
        }
        else {
            console.log(err);
            res.send({
                error: true,
                message: 'Oops! We had a problem! Please try again later.',
            });
        }
    });
};
exports.getUsers = getUsers;
// CREATE USER ****************************************
const postUser = async (req, res, next) => {
    console.log('SERVER ERROR postUser');
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const sex = req.body.sex;
    const password = req.body.password;
    // encrypting password with bcryptjs:
    // const hashedPass = await bcrypt.hash(req.body.password, 12);
    dbCon_1.default.query('INSERT INTO users (firstname, surname, birthday, email, sex, password) VALUES (?,?,?,?,?,?)', [firstname, surname, birthday, email, sex, password], (err, result) => {
        if (!err) {
            res.send({ message: 'User created!', id: result.insertId });
        }
        else {
            if (err.code === 'ER_DUP_ENTRY') {
                res.send({ error: true, message: 'Email already registered!' });
            }
            else {
                res.send({
                    error: true,
                    message: 'Oops! We had a problem! Please try again later.',
                });
            }
            console.log(err);
        }
    });
};
exports.postUser = postUser;
// UPDATE USER ****************************************
const updateUser = async (req, res, next) => {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const sex = req.body.sex;
    const password = req.body.password;
    dbCon_1.default.query('UPDATE users SET firstname = ?, surname = ?, birthday = ?, email = ?, sex = ?, password = ? WHERE id = ?', [firstname, surname, birthday, email, sex, password, id], (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            if (err.code === 'ER_DUP_ENTRY')
                res.send({ error: true, message: 'Email already registered!' });
            else
                res.send({
                    error: true,
                    message: 'Oops! We had a problem! Please try again later.',
                });
        }
    });
};
exports.updateUser = updateUser;
// DELETE  USER ****************************************
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    dbCon_1.default.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
        }
    });
};
exports.deleteUser = deleteUser;
// DELETE ALL USERS ****************************************
const deleteAllUsers = async (req, res, next) => {
    dbCon_1.default.query('DELETE FROM users', (err) => {
        if (!err) {
            res.send('All users deleted!');
        }
        else {
            console.log(err);
        }
    });
};
exports.deleteAllUsers = deleteAllUsers;
