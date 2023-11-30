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
  .route('/visitors/findByName/:name')
  .get(peopleController.getVisitorByName);

router
  .route('/findByName/:name')
  .get(peopleController.getPersonByName);

router
  .route('/findByID/:id')
  .get(peopleController.getPersonByID);

router
  .route('/visitors/findByLanguage/:languageName')
  .get(peopleController.getVisitorByLanguage);
  
module.exports = router;