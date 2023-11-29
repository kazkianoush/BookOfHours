const Book = require("../models/bookModel");


exports.getAllBooks = (async (req, res, next) => {
  try {
    let options = {}
    if (req.query.selectedColumns) {
      options.columns = req.query.selectedColumns
    } 
    if (req.query.groupBy) {
      options.group = req.query.groupBy
    } 

    const [allBooks] = await Book.getBooks(options);
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
    let options = {name: req.params.name}
    if (req.query.selectedColumns) {
      options.columns = req.query.selectedColumns
    } 
    if (req.query.groupBy) {
      options.group = req.query.groupBy
    } 
    const [book] = await Book.getBooks(options);
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
exports.getBookByID = (async (req, res, next) => {
  try {
    let options = {ID: req.params.id}
    if (req.query.selectedColumns) {
      options.columns = req.query.selectedColumns
    } 
    if (req.query.groupBy) {
      options.group = req.query.groupBy
    } 
    const [book] = await Book.getBooks(options);
    res.status(200).json(book);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});

// getBook based on memoryID (for searching up on foreign keys)
// localhost:3000/book/findByID/BK001
exports.getbookByMemory = (async (req, res, next) => {
  try {
    let options = {memoryID: req.params.memoryID}
    if (req.query.selectedColumns) {
      options.columns = req.query.selectedColumns
    } 
    if (req.query.groupBy) {
      options.group = req.query.groupBy
    } 
    const [book] = await Book.getBooks(options);
    res.status(200).json(book);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});

  
exports.createBook = async (req, res, next) => {
  try {
    const { bookID, bookName, language, aspectID, memoryID, elementOfTheSoulID, numenID } = req.body;

    // Validate the incoming data as needed

    // Create an object with the user input
    console.log(req.body)
    const newBook = {
      bookID,
      bookName,
      language,
      aspectID,
      memoryID,
      elementOfTheSoulID,
      numenID,
    };

    // Call the create method in the MemoryModel
    await Book.post(newBook);

    res.status(200).json({ message: 'Book created successfully' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    // Validate the incoming data as needed
    
    // Call the update method in the BookModel
    await Book.update(req.params.id, req.body);

    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)

    // Your logic to delete the book with the given ID from the database
    await Book.deleteBook(id);

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};