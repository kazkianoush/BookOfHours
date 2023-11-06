require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection(`mysql://${process.env.usern}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`);

connection.connect((err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!');
});
   
connection.end();