const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
    username: { type: String, required: true },
    dni: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    emergencyPhone: { type: String, required: true },
    uuid: {type: String, required: true }
});

module.exports = mongoose.model('Member', MemberSchema);