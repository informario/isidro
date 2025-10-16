const express = require('express');
const {enrollMember, updateMember, getAllMembers, getMemberByDNI, memberMedicalData} = require('../controllers/memberController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/member/enroll', authenticateToken, enrollMember);
router.post('/member/update', authenticateToken, updateMember);
router.get('/member/dni', authenticateToken, getMemberByDNI);
router.get('/member/all', authenticateToken, getAllMembers);
router.get('/datos', memberMedicalData);


module.exports = router;