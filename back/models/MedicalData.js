const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicalDataSchema = new Schema({
    dosis_covid: { type: Number, required: false },
    obra_social: { type: String, required: false },
    tipo_covertura_medica: { type: String, required: false },
    condiciones: {
        marcapasos: { type: Boolean, required: false },
        infarto: { type: Boolean, required: false },
        anticoagulantes: { type: Boolean, required: false }
    },
    enfermedades: { type: String, required: false },
    discapacidades: { type: String, required: false },
    grupo_sanguineo: { type: String, required: false },
});

module.exports = mongoose.model('MedicalData', medicalDataSchema);