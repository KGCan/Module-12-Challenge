const mysql = require ("mysql");

const connection = mysql.newConnection({
    host: "localhost",
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