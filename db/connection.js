const mysql = require ("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    // MySQL info
    user: "root",
    password: "BootcampMySQL88!",
    // database
    database: "employees",
});

// connect to the server and database
connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;