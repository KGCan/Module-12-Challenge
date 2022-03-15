const mysql = require ("mysql");
var connection = mysql.newConnection({
    // connection info
    host: "localhost",
    port: 3306,

    // MySQL info
    user: "root",
    password: "BootcampMySQL88!",

    // database
    database: "employee_db",
});

// connect to the server and database

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;