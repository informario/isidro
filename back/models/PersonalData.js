const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalDataSchema = new Schema({
    dni: { type: Number, required: true },
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    nacionalidad: { type: String, required: true },
    sexo: { type: String, required: true },
    direccion: {
        calle: { type: String, required: true },
        numero: { type: Number, required: true },
        piso: { type: Number, required: false },
        departamento: { type: String, required: false },
        partido: { type: String, required: true },
        localidad: { type: String, required: true }
    },
    contacto: {
        telefono: { type: String, required: true },
        email: { type: String, required: false }
    },
    observaciones: { type: String, required: false },
    tiene_domicilio_en_san_isidro: { type: Boolean, required: true },
    causa_no_domicilio_san_isidro: { type: String, required: false },
});


module.exports = mongoose.model('PersonalData', personalDataSchema);