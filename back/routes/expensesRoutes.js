const express = require('express');
const {loadPettyCashExpense, loadIncome} = require('../controllers/expensesController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/expenses/loadpettycashexpense', authenticateToken, loadPettyCashExpense);
router.post('/expenses/loadincome', authenticateToken, loadIncome);

module.exports = router;