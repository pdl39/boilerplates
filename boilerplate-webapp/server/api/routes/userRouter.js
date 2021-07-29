const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

// GET /api/user
router.get('/', userController.verifyToken, userController.getUser);

// POST /api/user/login
router.post('/login', userController.login);

// POST /api/user/signup
router.post('/signup', userController.signup);

// POST /api/user/token
router.post('/token', userController.regenerateAccessToken);

// DELETE /api/user/logout
router.delete('/logout', userController.logout);

module.exports = router;
