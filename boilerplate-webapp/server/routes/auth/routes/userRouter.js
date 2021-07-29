const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

// GET /auth/user
router.get('/', userController.verifyToken, userController.getUser);

// POST /auth/user/login
router.post('/login', userController.login);

// POST /auth/user/signup
router.post('/signup', userController.signup);

// POST /auth/user/token
router.post('/token', userController.regenerateAccessToken);

// DELETE /auth/user/logout
router.delete('/logout', userController.logout);

module.exports = router;
