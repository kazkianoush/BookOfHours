const Book = require("../models/bookModel");


exports.getAllBooks = (async (req, res, next) => {
  try {
    let allBooks = []
    if (req.query.selectedColumns) {
      [allBooks] = await Book.getAllBooksProjection(req.query.selectedColumns);
    } else {
      [allBooks] = await Book.getAllBooks();
    }
    res.status(200).json(allBooks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});

// getBook based on name with selectedColumns (projection) would look like this
// localhost:3000/book/findByName/De Horis Book 2?selectedColumns=bookName,bookID,language
// Needs to have 4 attributes minimum for the project
exports.getBookName = (async (req, res, next) => {
  try {
    let book = []
    if (req.query.selectedColumns) {
      [book] = await Book.getBookProjection(req.params.name, req.query.selectedColumns);
    } else {
      [book] = await Book.getBookByName(req.params.name);
    }
    res.status(200).json(book);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});

// getBook based on ID (for searching up on foreign keys)
// localhost:3000/book/findByID/BK001
// Needs to have 4 attributes minimum for the project
exports.getBookID = (async (req, res, next) => {
  try {
    const [book] = await Book.getBookByID(req.params.id);
    res.status(200).json(book);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});
  
exports.createBook = (async (req, res, next) => {
  try {
    let newBook = {
      bookName: req.body.bookName,
      language: req.body.language,
      memoryID: req.body.memoryID, 
    };
    const [bookExists] = await Book.getBook(newBook.bookName)
    if (!bookExists.length) {
      await Book.post(newBook);
      res.status(201).json(bookExists);
    } else {
      res.status(409);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});