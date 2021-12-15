"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.postUser = exports.getUsers = void 0;
// import bcrypt from 'bcryptjs'; // npm install --save bcryptjs
const dbCon_1 = __importStar(require("../dbCon"));
// GET ALL USERS ****************************************
const getUsers = async (req, res, next) => {
    console.log('OUTSIDE ERRORRRRR 1');
    dbCon_1.default.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.send({
                error: true,
                message: 'Oops! We had a problem! Please try again later.',
            });
            console.log('ERRORRRRR 1 - RECONNECTING!');
            dbCon_1.reconnect();
        }
    });
};
exports.getUsers = getUsers;
// CREATE USER ****************************************
const postUser = async (req, res, next) => {
    console.log('OUTSIDE ERRORRRRR 2');
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
            console.log('ERRORRRRR 2 - RECONNECTING!');
            dbCon_1.reconnect();
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
            dbCon_1.default.destroy();
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
            dbCon_1.default.destroy();
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
            dbCon_1.default.destroy();
        }
    });
};
exports.deleteAllUsers = deleteAllUsers;
