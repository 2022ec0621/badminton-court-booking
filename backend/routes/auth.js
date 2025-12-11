const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public
router.post('/register', authController.register);
router.post('/login', authController.login);

// Authenticated
router.get('/me', auth, authController.me);

module.exports = router;
