const express = require('express');
const {loadPettyCashExpense, loadIncome, getIncomes} = require('../controllers/expensesController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/expenses/pettycashexpense', authenticateToken, loadPettyCashExpense);
router.post('/expenses/income', authenticateToken, loadIncome);
router.get('/expenses/income', authenticateToken, getIncomes);

module.exports = router;