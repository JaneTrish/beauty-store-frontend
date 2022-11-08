const { Pool, Client } = require('pg');
const connectionString = //connectionString;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
