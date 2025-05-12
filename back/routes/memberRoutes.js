const express = require('express');
const {enrollMember, getMember} = require('../controllers/memberController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/member/enroll', authenticateToken, enrollMember);
router.get('/member', authenticateToken, getMember);

module.exports = router;