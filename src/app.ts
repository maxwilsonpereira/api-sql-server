// MySQL Workbench to check the schema and the tables
// SQL: https://www.w3schools.com/sql/

import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet'; // middleware that adds security headers

import cors from 'cors';

import users from './routes/users';

const app = express();
app.use(helmet());
app.use(cors());
app.use(json());

// testing on the browser http://localhost:3001/
// app.get('/', (req, res) => {
//   res.send('Server is running on port 3001');
// });

app.use('/', users);

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on port 3001');
});
