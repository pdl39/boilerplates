const express = require('express');
const router = express.Router();


// match GET requests to /api/dummyRoute
router.get('/', async (req, res, next) => {
  try {

  }
  catch (err) {
    next(err);
  }
});

// match POST request to /api/dummyRoute
router.post('/', async (req, res, next) => {
  try {

  }
  catch (err) {
    next(err);
  }
});

// match GET request to /api/dummyRoute/:dummyId
router.get('/:dummyId', async (req, res, next) => {
  try {
    const dummyId = req.params.dummyId;
  }
  catch (err) {
    next(err);
  }
});

// match POST request to /api/dummyRoute/:dummyId
router.post('/:dummyId', async (req, res, next) => {
  try {
    const dummyId = req.params.dummyId;
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
