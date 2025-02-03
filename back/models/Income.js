const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncomeSchema = new Schema({
    dniClient: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Income', IncomeSchema);