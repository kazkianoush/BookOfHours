require('dotenv').config();
require('./router.js')
require('./database.js').connect();

const readline = require('readline');

app.get("/", (req, res) => {
    res.send({ message: "Hello, nodemon!" });
});
  
app.post("/api/hello", auth, (req, res) => {
  res.status(200).send("Hello");
});

// Register the application main router
app.use("/api", router);

//     queryString = "";
//     // switch statement to allow queries between multiple tables
//     switch (letterID) {
//         // Memory
//         case "ME":
//             queryString = "SELECT * FROM Memory WHERE memoryID = ?";
//             break;
//     }
//     const queryResult = await connection.promise().query(queryString, [letterID + numberID]);

