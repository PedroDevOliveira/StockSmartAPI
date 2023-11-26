require('dotenv').config();

let database = process.env.DB_DATABASE ?? 'postgres'
const env = process.env.NODE_ENV;

const dialect = env === 'test' ? 'sqlite' : 'postgres';
const logging = env === 'development' ? (msg) => {
  console.log(msg);
} : false;

module.exports = {
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? '1234',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  database,
  dialect,
  storage: "./__tests__/database.sqlite",
  logging
};