const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Cr1stopherp3rez',
    database: 'bdd_ludotest'
})

module.exports = db;
