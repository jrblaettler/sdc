const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to database');
});

module.exports = {
  query: (text, params, cb) => pool.query(text, params, cb),
};
