const express = require('express');
const { login, signup , isauth} = require('../controllers/authController');
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.post('/auth/login', login);
router.post('/auth/signup', signup);
router.get('/auth/isauth', authenticateToken, isauth);

module.exports = router;