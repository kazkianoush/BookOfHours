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
  // .delete(bookController.deleteBook); 

router
  .route('/findByID/:id')
  .get(bookController.getBookByID) 
  .patch(bookController.updateBook); 
router
  .route('/findByMemory/:memoryID')
  .get(bookController.getbookByMemory) 

module.exports = router;