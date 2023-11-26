const express = require('express');
const bookController = require('../controllers/bookController'); 

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks) 
  .post(bookController.createBook); 

router
  .route('/findByName/:name')
  .get(bookController.getBookName) 
  // .patch(bookController.updateBook) 
  // .delete(bookController.deleteBook); 

router
  .route('/findByID/:id')
  .get(bookController.getBookID) 

module.exports = router;