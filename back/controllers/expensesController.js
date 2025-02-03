const PettyCashExpense = require('../models/PettyCashExpense');
const Income = require('../models/Income');

// Cargar un nuevo gasto
async function loadPettyCashExpense(req, res) {
    console.log(req.body)
    const amount = req.body.amount;
    const description = req.body.description;
    console.log(amount, description)
    const expense = new PettyCashExpense({
        amount,
        description,
        username:req.user.username,
    });

    try {
        await expense.save();
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al guardar el gasto:', error);
        res.sendStatus(500);
    }
}

async function loadIncome(req, res) {
    console.log(req.body)
    const dniClient = req.body.dniClient;
    const amount = req.body.amount;
    const date = new Date();
    const income = new Income({
        dniClient,
        amount,
        date
    });
    try {
        await income.save();
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al guardar el income:', error);
        res.sendStatus(500);
    }
}

module.exports = {
    loadPettyCashExpense,
    loadIncome,
};