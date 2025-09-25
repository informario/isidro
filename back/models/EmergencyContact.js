const mongoose = require('mongoose');
const { Schema } = mongoose;

const emergencyContactSchema = new Schema({
    nombre: { type: String, required: true },
    parentesco: { type: String, required: false },
    telefono: { type: String, required: true }
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);