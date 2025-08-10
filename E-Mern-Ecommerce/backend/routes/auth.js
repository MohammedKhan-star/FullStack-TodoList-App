const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

// ✅ Define actual routes
router.post('/register', register);
router.post('/login', login);
router.get('/', (req, res) => {
    res.send('✅ Auth API working! Use POST /register or /login');
  });

module.exports = router;