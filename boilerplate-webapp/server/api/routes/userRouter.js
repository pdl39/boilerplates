const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

// GET /api/user
router.get('/', userController.verifyToken, userController.getUser);

// POST /api/user/login
router.post('/login', userController.login);

// POST /api/user/signup
router.post('/signup', userController.signup);

module.exports = router;
