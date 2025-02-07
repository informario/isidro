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

async function getIncomes(req, res){
    const from = req.query.from;
    const until = req.query.until;
    console.log(from, until)
    // Validar que las fechas estén presentes
    if (!from || !until) {
        return res.status(400).json({ error: 'Faltan parámetros en la consulta' });
    }
    try {
        // Convertir las fechas a objetos Date de MongoDB
        const startDate = new Date(from);
        const endDate = new Date(until);

        // Filtrar documentos dentro del rango de fechas
        const incomes = await Income.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        // Responder con los documentos encontrados
        res.json(incomes);
    } catch (error) {
        console.error('Error al obtener ingresos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

module.exports = {
    loadPettyCashExpense,
    loadIncome,
    getIncomes,
};