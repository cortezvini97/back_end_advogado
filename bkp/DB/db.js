const mysql = require('mysql');
const config = require('../../config');

const {HOST, DB, USER, PASSWORD} = config;

var conection = mysql.createConnection({
    user:USER,
    password:PASSWORD,
    database:DB,
    host:HOST,
    port:3306
});


exports.conection = conection;