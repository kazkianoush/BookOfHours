const fs = require('fs');
const mysql = require('mysql2');
const queries = fs.readFileSync("./CPSC304Script.sql", {encoding: 'utf8'}).toString();
const connection = mysql.createConnection(
    {
        host: process.env.host,
        user: process.env.usern,
        password: process.env.password,
        port : process.env.port,
        database: process.env.database,
        multipleStatements: true
    }
);

const connect = () => connection.connect(async (err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!');
    runScript();
    connection.end();
});

const runScript = async () => {
    try {
        await connection.promise().query(queries);
    } catch (err) {
        console.log("Query error: " + err.message);
    } 
}

exports.connect = connect