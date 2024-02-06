const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: '3.134.64.181',
    user: 'root',
    password: 'Cr1stopherp3rez',
    database: 'bdd_ludotest'
})

module.exports = db;
