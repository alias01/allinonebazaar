const { Pool } = require("pg");
require("dotenv").config(); // used to access .env variables

// create a new connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 100,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.connect((err, client, release) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
    release();
  }
});

module.exports = pool;
