"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2")); // npm i mysql2
const dbCon = mysql2_1.default.createConnection({
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
});
console.log('database: ', process.env.database);
console.log('user: ', process.env.user);
console.log('password: ', process.env.password);
console.log('host: ', process.env.host);
dbCon.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});
exports.default = dbCon;
