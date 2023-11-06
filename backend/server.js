require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');

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

connection.connect(async (err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!');
    
    runScript();
});

const runScript = async () => {
    try {
        await connection.promise().query(queries);

        const queryResult = await connection.promise().query("SELECT * FROM Memory").then((r) => {
            return r;
        })
        console.log(queryResult);
    } catch (err) {
        console.log("Query error: " + err.message);
    } finally {
        connection.end();
    }
}
// connection.end();