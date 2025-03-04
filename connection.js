const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "5562",
    host: "localhost",
    port: 5432,
    database: "Api",
    ssl: false
});

module.exports = pool;
