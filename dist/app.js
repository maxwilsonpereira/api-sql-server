"use strict";
// MySQL Workbench to check the schema and the tables
// SQL: https://www.w3schools.com/sql/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const helmet_1 = __importDefault(require("helmet")); // middleware that adds security headers
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.json());
// testing on the browser http://localhost:3001/
// app.get('/', (req, res) => {
//   res.send('Server is running on port 3001');
// });
app.use('/', users_1.default);
app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on port 3001');
});
