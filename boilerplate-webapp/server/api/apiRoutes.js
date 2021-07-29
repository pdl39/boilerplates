const express = require('express');
const router = express.Router();
const { returnErr } = require('../utils');

// set up routes
router.use('/dummy', require('./routes/dummyRouter'));
router.use('/user', require('./routes/userRouter'));
// ...

// handle 404
router.use((req, res, next) => {
  next(returnErr(404, 'Page Not Found.'));
});

module.exports = router;
