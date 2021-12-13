"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2")); // npm i mysql2
const dbCon = mysql2_1.default.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});
console.log('host: ', process.env.host);
console.log('user: ', process.env.user);
console.log('password: ', process.env.password);
console.log('database: ', process.env.database);
dbCon.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});
exports.default = dbCon;
