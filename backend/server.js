require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const readline = require('readline');

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
    // split input into two parts, letterID and numberID
    letterID = userInput[0].toUpperCase() + userInput[1].toUpperCase();
    numberID = userInput.substring(2)

    queryString = "";
    // switch statement to allow queries between multiple tables
    switch (letterID) {
        // Memory
        case "ME":
            queryString = "SELECT * FROM Memory WHERE memoryID = ?";
            break;
    }
    const queryResult = await connection.promise().query(queryString, [letterID + numberID]);
    if (queryResult[0]) {
        console.log(queryResult);
    } else {
        console.log("There is no match.");
    }
} 


