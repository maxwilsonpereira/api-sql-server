"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm i mysql2
const mysql2_1 = __importDefault(require("mysql2"));
const dbCon = mysql2_1.default.createConnection({
    // const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'max.123',
    database: 'mysqlcrud',
});
dbCon.connect(function (err) {
    if (err)
        throw err;
});
module.exports = dbCon;
