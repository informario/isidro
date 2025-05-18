const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
    //metadatos

    timestamp: { type: Date, required: true },
    timestamp_modificacion: { type: Date, required: true },
    numero_solicitud: { type: Number, required: true },
    operador: { type: String, required: true },
    uuid: {type: String, required: true },
    
    //datos del socio
    dni: { type: String, required: true },
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    nacionalidad: { type: String, required: true },
    sexo: { type: String, required: true },
    calle: { type: String, required: true },
    numero: { type: Number, required: true },
    piso: { type: Number, required: false },
    departamento: { type: String, required: false },
    partido: { type: String, required: true },
    localidad: { type: String, required: true },
    telefono_fijo: { type: String, required: false },
    telefono_celular: { type: String, required: true },
    email: { type: String, required: false },
    centro: { type: String, required: true },
    observaciones: { type: String, required: false },
    estatus: { type: String, required: false },
    tiene_domicilio_en_san_isidro: { type: Boolean, required: true },
    causa_no_domicilio_san_isidro: { type: String, required: false },
    suspendido_hasta: { type: Date, required: true },

    //datos contacto de emergencia
    nombre_contacto_emergencia: { type: String, required: true },
    parentesco_contacto_emergencia: { type: String, required: true },
    telefono_fijo_contacto_emergencia: { type: String, required: false },
    telefono_celular_contacto_emergencia: { type: String, required: true },

    //datos medicos
    dosis_covid: { type: Number, required: false },
    obra_social: { type: String, required: false },
    tipo_covertura_medica: { type: String, required: false },
    marcapasos: { type: Boolean, required: false },
    infarto: { type: Boolean, required: false },
    anticoagulantes: { type: Boolean, required: false },
    enfermedades: { type: String, required: false },
    discapacidades: { type: String, required: false },
    tiene_cud: { type: Boolean, required: false },
    requiere_acompañante: { type: Boolean, required: false },
    acude_tratamiento_ambulatorio: { type: Boolean, required: false },

    //datos varios
    centro_educativo: { type: String, required: false },
    refuerzo_alimentario: { type: Boolean, required: false },
    comedor_comunitario: { type: String, required: false },
    tiene_trabajo: { type: Boolean, required: false },
    condicion_trabajo: { type: String, required: false },
    actividad_principal: { type: String, required: false },
    ingreso_mensual: { type: Number, required: false },
    cobra_jubilacion: { type: Boolean, required: false },
    cobra_pension: { type: Boolean, required: false },
    tipo_pensión: { type: String, required: false },
    paga_alquiler: { type: Boolean, required: false },
    monto_alquiler: { type: Number, required: false },
    situación_calle: { type: Boolean, required: false },
    fecha_inicio_situacion_calle: { type: Date, required: true },
    
    tipo_habitat: { type: String, required: false },
    tiene_certificado_renabap: { type: Boolean, required: false },
    certificado_renabap: { type: Number, required: false },
    tipo_vivienda: { type: String, required: false },
    regimen_tenencia: { type: String, required: false },
    tiene_baño: { type: Boolean, required: false },
    vivienda_se_inunda: { type: Boolean, required: false },
    acceso_agua: { type: Boolean, required: false },
    acceso_electricidad: { type: Boolean, required: false },
    acceso_cloacas: { type: Boolean, required: false },
    acceso_gas: { type: Boolean, required: false },
    familiar_acude_actividades_municipales: { type: Boolean, required: false },
    otro_servicio: { type: String, required: false },


});

module.exports = mongoose.model('Member', MemberSchema);