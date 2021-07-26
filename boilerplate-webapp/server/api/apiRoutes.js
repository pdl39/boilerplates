const express = require('express');
const router = express.Router();


router.use('/dummyRoute', require('./routes/dummyRoute'));
// ...

module.exports = router;
