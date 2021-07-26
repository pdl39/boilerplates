const express = require('express');
const router = express.Router();

// set up routes
router.use('/dummyRoute', require('./routes/dummyRoute'));
// ...

// handle 404
router.use((req, res, next) => {
  const err = new Error('Page Not Found.');
  err.status = 404;
  next(err);
})

module.exports = router;
