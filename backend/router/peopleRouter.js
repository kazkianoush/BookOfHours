const express = require('express');
const peopleController = require('../controllers/peopleController'); 

const router = express.Router();

router
  .route('/')
  .get(peopleController.getAllPeople) 
  .post(peopleController.createPerson); 

router
  .route('/visitors')
  .get(peopleController.getAllVisitors);

router
  .route('/findByName/:name')
  .get(peopleController.getPersonByName);

router
  .route('/findByID/:id')
  .get(peopleController.getPersonByID)
  
module.exports = router;