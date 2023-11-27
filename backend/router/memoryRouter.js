const express = require('express');
const memoryController = require('../controllers/memoryController'); 

const router = express.Router();

router
  .route('/')
  .get(memoryController.getAllMemories) 
  .post(memoryController.createMemory); 

router
  .route('/:name')
  .get(memoryController.getMemory) 
  // .delete(memoryController.deleteMemory); 
router
  .route('/:id')
  .patch(memoryController.updateMemory)

module.exports = router