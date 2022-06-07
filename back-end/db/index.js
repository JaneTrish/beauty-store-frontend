const { Pool, Client } = require('pg');
const connectionString =
  'postgres://daersurxxnmcex:e0da560f0026e165dc1c47afb019575a2194adf0e6d58c29d367b4e7b577d649@ec2-3-231-254-204.compute-1.amazonaws.com:5432/d4i8p44fnsafk';
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
