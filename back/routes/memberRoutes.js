const express = require('express');
const {enrollMember, updateMember, getMember, getMemberByDNI} = require('../controllers/memberController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/member/enroll', authenticateToken, enrollMember);
router.post('/member/update', authenticateToken, updateMember);
router.get('/member', authenticateToken, getMember);
router.get('/member/dni', authenticateToken, getMemberByDNI);


module.exports = router;