const express = require('express');
const {loadPettyCashExpense} = require('../controllers/expensesController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/expenses/loadpettycashexpense', authenticateToken, loadPettyCashExpense);

module.exports = router;