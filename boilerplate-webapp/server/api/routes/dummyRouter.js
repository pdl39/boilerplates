const express = require('express');
const router = express.Router();
const { dummyController } = require('../controllers');


// match GET requests to /api/dummy
router.get('/', dummyController.getDummiesList);

// match POST request to /api/dummy
router.post('/', dummyController.createDummy);

// match GET request to /api/dummy/:dummyId
router.get('/:dummyId', dummyController.getDummy);


module.exports = router;
