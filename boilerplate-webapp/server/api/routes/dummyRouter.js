const express = require('express');
const router = express.Router();
const { Dummy } = require('../../db/models');


// match GET requests to /api/dummy
router.get('/', async (req, res, next) => {
  try {
    const dummies = await Dummy.findAll();
    res.json(dummies);
  }
  catch (err) {
    next(err);
  }
});

// match POST request to /api/dummy
router.post('/', async (req, res, next) => {
  try {
    const [dummy, isCreated] = await Dummy.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name,
        dummyType: req.body.dummyType
          ? req.body.dummyType
          : Dummy.tableAttributes.dummyType.defaultValue
      }
    });
    if (!isCreated) {
      throwError(409, `Dummy with name '${req.body.name}' already exists. Dummy's name must be unique.`);
    }
    res.status(201).json(dummy);
  }
  catch (err) {
    next(err);
  }
});

// match GET request to /api/dummy/:dummyId
router.get('/:dummyId', async (req, res, next) => {
  try {
    const dummyId = req.params.dummyId;
    const dummy = await Dummy.findByPk(dummyId);
    res.status(200).json(dummy);
  }
  catch (err) {
    next(err);
  }
});


module.exports = router;
