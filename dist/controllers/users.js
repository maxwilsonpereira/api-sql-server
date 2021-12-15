"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.postUser = exports.getUsers = void 0;
const connection_1 = require("./connection");
// GET ALL USERS ****************************************
const getUsers = async (req, res, next) => {
    const connection = new connection_1.Connection();
    const dbCon = connection.dbCon;
    connection.connect();
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
    const connection = new connection_1.Connection();
    const dbCon = connection.dbCon;
    connection.connect();
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
    const connection = new connection_1.Connection();
    const dbCon = connection.dbCon;
    connection.connect();
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
    const connection = new connection_1.Connection();
    const dbCon = connection.dbCon;
    connection.connect();
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
    const connection = new connection_1.Connection();
    const dbCon = connection.dbCon;
    connection.connect();
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
