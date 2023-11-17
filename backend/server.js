const express = require('express'); 
const memoryRouter = require('./router/memoryRouter.js');
const bookRouter = require('./router/bookRouter.js');
const database = require('./utils/database.js')

const app = express();

const port = 3000;
const server = app.listen(port, () => {
  database.connect();
  console.log(`App running on port ${port}...`);
});

app.use('/memory', memoryRouter);
app.use('/book', bookRouter);

process.on('exit', () => {database.disconnect()})

