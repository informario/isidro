const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    uuid: { type: String, required: true, unique: true },
    timestamp: { type: Date, required: true },
    datos_personales: { type: Schema.Types.ObjectId, ref: 'PersonalData' },
    contacto_emergencia: { type: Schema.Types.ObjectId, ref: 'EmergencyContact' },
    datos_medicos: { type: Schema.Types.ObjectId, ref: 'MedicalData' }
});

module.exports = mongoose.model('Member', memberSchema);