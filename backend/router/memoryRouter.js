const express = require('express');
const memoryController = require('../controllers/memoryController'); 

const router = express.Router();

router
  .route('/')
  .get(memoryController.getAllMemories) 
  .post(memoryController.createMemory); 

router
  .route('/:name')
  .get(memoryController.getMemoryByName) 
  // .patch(memoryController.updateMemory) 
  // .delete(memoryController.deleteMemory); 

router
  .route('/:id')
  .get(memoryController.getMemoryByID)
  
module.exports = router;