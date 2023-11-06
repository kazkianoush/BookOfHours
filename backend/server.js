require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');

const queries = fs.readFileSync("./CPSC304Script.sql", {encoding: 'utf8'}).toString();


const connection = mysql.createConnection(`mysql://${process.env.usern}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`, {multipleStatements: true});

connection.connect(async (err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!');
    
    runScript();
});

const runScript = async () => {
    const queryResult = await connection.promise().query(queries).then((err, result) => {
        if (err) {
            console.log("Query error: " + err.message);
            return;
        }
        console.log(result);
    })
}
// connection.end();