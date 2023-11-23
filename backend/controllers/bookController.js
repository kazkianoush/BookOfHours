const Book = require("../models/bookModel");
 

exports.getAllBooks = (async (req, res, next) => {
  try {
    const [allBooks] = await Book.getAllBooks();
    res.status(200).json(allBooks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});
  
exports.getBook = (async (req, res, next) => {
  try {
    const [book] = await Book.getBook(req.params.name);
    res.status(200).json(book);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});
  
exports.createBook = (async (req, res, next) => {
  try {
    const body = await request.body({ type: 'json' });
    const requestBody = await body.value;
    console.log(requestBody.task);
    let newTodo = {
        task: requestBody.task
    };
    console.log(newTodo);
    await Book.create(newTodo);
    response.status = 200;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});