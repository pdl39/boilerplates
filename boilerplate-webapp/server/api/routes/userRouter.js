const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');
const { throwErr } = require('../../utils');

router.post('/login', async (req, res, next) => {
  try {
    res.send({
      token: await User.authenticate(req.body)
    })
  }
  catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({
      token: await user.generateToken()
    });
  }
  catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throwErr(401, `username ${user.username} already exists.`);
    }
    else {
      next(err);
    }
  }
})
