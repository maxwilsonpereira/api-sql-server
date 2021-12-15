"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconnect = void 0;
const mysql2_1 = __importDefault(require("mysql2")); // npm i mysql2
const dbCon = mysql2_1.default.createConnection({
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
exports.default = dbCon;
function reconnect(dbConProps) {
    console.log('RECONNECTING LOST CONNECTION!');
    dbConProps.destroy();
    setTimeout(() => {
        dbConProps.connect(function (err) {
            if (err) {
                return console.error('*************** error: ' + err.message);
            }
            console.log('Connected to the MySQL server.');
        });
    }, 1000);
}
exports.reconnect = reconnect;
