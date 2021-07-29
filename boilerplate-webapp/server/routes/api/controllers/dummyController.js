const { Dummy } = require('../../../db/models');
const { throwErr } = require('../../../utils');

exports.getDummiesList = async (req, res, next) => {
  try {
    const dummies = await Dummy.findAll();
    res.json(dummies);
  }
  catch (err) {
    next(err);
  }
};

exports.createDummy = async (req, res, next) => {
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
      throwErr(409, `Dummy with name '${req.body.name}' already exists. Dummy's name must be unique.`);
    }
    res.status(201).json(dummy);
  }
  catch (err) {
    next(err);
  }
};

exports.getDummy = async (req, res, next) => {
  try {
    const dummyId = req.params.dummyId;
    const dummy = await Dummy.findByPk(dummyId);
    res.status(200).json(dummy);
  }
  catch (err) {
    next(err);
  }
};
