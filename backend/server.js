const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');

const memoryRouter = require('./router/memoryRouter.js');
const bookRouter = require('./router/bookRouter.js');
const database = require('./utils/database.js')

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost',
  credentials: true,
}));
const port = 3000;
const server = app.listen(port, () => {
  database.connect();
  console.log(`App running on port ${port}...`);
});

app.use('/memory', memoryRouter);
app.use('/book', bookRouter);

process.on('exit', () => {database.disconnect()})

