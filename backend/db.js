const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "wertz123",
  host: "localhost",
  port: 5432,
  database: "esnproto",
});

module.exports = pool;
