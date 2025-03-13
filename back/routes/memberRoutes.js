const express = require('express');
const {enrollMember} = require('../controllers/memberController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/member/enroll', authenticateToken, enrollMember);

module.exports = router;