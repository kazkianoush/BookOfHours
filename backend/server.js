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
    userInput =  await takeInput();
    await takeQuery(userInput);
    connection.end();
});


const runScript = async () => {
    try {
        await connection.promise().query(queries);
    } catch (err) {
        console.log("Query error: " + err.message);
    } 
}


const readline = require('readline');
const takeInput = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question('Enter ID for the query: ', (input) => {
      resolve(input);
      rl.close();
    });
  });
};


const takeQuery =  async (userInput) => {
    const queryResult = await connection.promise().query("SELECT * FROM Memory WHERE memoryID = ?", [userInput]);
    console.log(queryResult);
} 


