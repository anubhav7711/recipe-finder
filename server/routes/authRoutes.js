const express = require('express');
const router = express.Router();

const {
  registerUser, // For user registration
  loginUser,    // For user login
  getMe,        // To get user details
} = require('../models/authControllers'); // Correct path and destructuring

const { protect } = require('../middleware/authMiddleware'); // Ensure this path is correct

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
