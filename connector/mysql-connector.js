const util = require('util');
const mysql = require('mysql');
require('util.promisify').shim();

const pool = mysql.createPool({
    host: process.env.auroraEndpoint,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db
});

pool.query = util.promisify(pool.query);

module.exports = pool;