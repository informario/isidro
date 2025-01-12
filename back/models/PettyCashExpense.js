const mongoose = require('mongoose');
const { Schema } = mongoose;

const PettyCashExpenseSchema = new Schema({
    amount: { type: String, required: true },
    description: { type: String, required: true },
    username: { type: String, required: true },
});

module.exports = mongoose.model('PettyCashExpense', PettyCashExpenseSchema);